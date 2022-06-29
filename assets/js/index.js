const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const apiUser = "https://shoppy-coppy-db.herokuapp.com/user";
const apiProduct = "https://shoppy-coppy-db.herokuapp.com/products";
const apiTopSearch = "https://shoppy-coppy-db.herokuapp.com/topSearch";
function start() {
    handlerUser()
    sliderShow()
    handlerNoti()
    handlerCarousel()
    getProduct()
    getTopSearch()
    handlerClickChangePage()

}
start()
// ****************************** Check User ******************************
function handlerUser() {
    // lay data
    fetch(apiUser).then(function (response) {
        return response.json();
    }).then(function (users) {
        handlerCheckLogin(users)

    })
    // check code xem đã tồn tại hay chưa và kiểm tra, lấy ra thông tin người dùng
    function handlerCheckLogin(users) {
        let code = localStorage.getItem('codeUser');

        // let code = "";
        if (code === '') {
            console.log('chua dang nhap');
        } else {
            let data = {
                username: '',
                avatar: ''
            }
            users.forEach(user => {
                if (code === user.code) {
                    data.username = user.userName;
                    data.avatar = user.avatar;
                }
            });
            console.log('check code thanh cong');
            checkStatus(data);
        }
    }
}
// ****************************** Show Element Login ******************************
function login() {
    // xu ly giao dien
    const eLogin = $$('.element-login');
    // console.log(eLogin);
    eLogin.forEach(e => {
        e.classList.toggle('hide-element')
    })
    // xu ly nut logout
    const btnLogout = $('.btn-logout')
    btnLogout.addEventListener('click', () => {
        localStorage.setItem('codeUser', "");
        login()
        console.log("dang xuat thanh cong");
    })
}
// ****************************** Show Infor User ******************************
function inforUser(data) {

    const useravatar = $('.useravatar');
    const username = $('.username');
    username.innerText = data.username
    useravatar.src = data.avatar
}
// ****************************** check status ******************************
function checkStatus(data) {
    let status = localStorage.getItem('statusUser');
    // console.log(typeof Number(status));
    if (Number(status) === 1) {
        console.log('status : ' + status);
        console.log('hiển thị giao diện admin');
        login();
        inforUser(data);
    }
    if (Number(status) > 1 && !(status == '')) {
        // console.log('status : ' + status);
        console.log('hiển thị giao diện người dùng bình thường');
        login();
        inforUser(data);
    }
}
// ****************************** handler slider banner ******************************
function sliderShow() {
    var clickPrev = $('.slider-turn__left')
    var clickNext = $('.slider-turn__right')
    var showImg = $('.slider-main__items-img')
    var btnChose = $$('.slider-nav__items')
    var imgsLength;
    var btnChoseLength = btnChose.length;
    const imageApi = "https://shoppy-coppy-db.herokuapp.com/sliderBanner"

    function getImage() {
        fetch(imageApi).then(function (response) {
            return response.json();
        }).then(
            function (imgs) {
                handlerSlider(imgs)

            })
    }
    getImage()

    function handlerSlider(imgs) {
        // nút next
        imgsLength = imgs.length
        let i = 0

        clickNext.onclick = function () {
            showImg.src = imgs[i].src
            if (i + 1 == imgs[i].id) {
                $('.slider-nav__items.slider-nav__items--active').classList.remove('slider-nav__items--active')
                btnChose[i].className = "slider-nav__items slider-nav__items--active"
            }
            i++;

            if (i == imgsLength) {
                i = 0
            }
            console.log(i)
        }

        //  nút Prev
        var j = imgsLength - 1
        clickPrev.onclick = function (e) {
            console.log(j)
            showImg.src = imgs[j].src
            if (j + 1 == imgs[j].id) {
                $('.slider-nav__items.slider-nav__items--active').classList.remove('slider-nav__items--active')
                btnChose[j].className = "slider-nav__items slider-nav__items--active"
            }

            j--;
            if (j == -1) {
                j = imgsLength - 1
            }
            console.log(j)
        }
        //  tự động chạy
        var k = 1

        function changeImgs() {
            showImg.src = imgs[k].src
            if (k + 1 == imgs[k].id) {
                $('.slider-nav__items.slider-nav__items--active').classList.remove('slider-nav__items--active')
                btnChose[k].className = "slider-nav__items slider-nav__items--active"
            }
            k++;
            if (k == imgsLength) {
                k = 0
            }
        }
        setInterval(changeImgs, 4000);
        //  nút chọn ảnh
        for (let i = 0; i < btnChoseLength; i++) {
            btnChose[i].onclick = function () {
                showImg.src = imgs[i].src
                if (i + 1 == imgs[i].id) {
                    $('.slider-nav__items.slider-nav__items--active').classList.remove('slider-nav__items--active')
                    btnChose[i].className = "slider-nav__items slider-nav__items--active"
                }
                console.log(i)
            }
        }
    }
}
//****************************** handler noti   ******************************
function handlerNoti() {
    const apiNoti = "https://shoppy-coppy-db.herokuapp.com/notifications"
    const amountNoti = $('.noti-number')
    const eNotification = $('.notification')
    imgnoti = $$('.notifications-contents__img')
    titlenoti = $$('.notifications-contents__title')
    desnoti = $$('.notifications-contents__descriptions')
    getNoti()

    function getNoti() {
        fetch(apiNoti).then(function (response) {
            return response.json();
        }).then(function (notis) {
            renderNoti(notis)
        })
    }
    function renderNoti(notis) {
        let notibody = $('.notifications-body')
        let htmls = notis.map(function (notis) {
            return ` <div class="notifications-body__items">
             <a class="notifications-contents">
               <div class="notifications-contents__left">
                 <img src="${notis.imgNoti}" alt="Thông báo" class="notifications-contents__img">
               </div>
               <div class="notifications-contents__right">
                 <h5 class="notifications-contents__title">${notis.titalNoti}</h5>
                 <p class="notifications-contents__descriptions">${notis.desNoti}</p>
               </div>
             </a>
          </div>`
        })
        notibody.innerHTML = htmls.join("")
        amountNoti.innerHTML = notis.length
        eNotification.addEventListener('mouseover', () => {
            amountNoti.classList.add('hide-element')
        })
    }
}
//****************************** handler carousel  ******************************
function handlerCarousel() {
    let transform = 0;

    carouselControll(transform, $(".flashSale-body .btn-control-carousel-left"), $(".flashSale-body .btn-control-carousel-right"), $(".flashSale-body__list-items"))
    carouselControll(transform, $(".topSearch-body .btn-control-carousel-left"), $(".topSearch-body .btn-control-carousel-right"), $(".topSearch-body__list-items"))
    function carouselControll(transform, btnLeft, btnRight, wrap) {
        // console.log(transform)
        btnLeft.addEventListener('click', function () {
            switch (transform) {
                case 1:
                    wrap.style.transform = 'translateX(0%)';
                    btnLeft.style.display = "none";
                    transform = 0;
                    // console.log(transform)
                    break;
                case 2:
                    wrap.style.transform = 'translateX(-25%)';
                    transform = 1;
                    // console.log(transform)
                    btnRight.style.display = "flex";
                    break;
            }
        })
        btnRight.addEventListener('click', function () {
            switch (transform) {
                case 0:
                    btnLeft.style.display = "flex";
                    wrap.style.transform = 'translateX(-25%)';
                    transform = 1;
                    // console.log(transform)
                    break;
                case 1:
                    wrap.style.transform = 'translateX(-50%)';
                    btnRight.style.display = "none";
                    transform = 2;
                    // console.log(transform)
                    break;
            }
        })

    }
}
//****************************** handler container category  ******************************
function handlerCategory(products) {
    const listItemCategory = $('.category__list-items')
    const itemCategory = $$('.category__items')
    itemCategory.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault()
            let listSearch = []
            products.forEach(product => {
                product.keySearch.forEach((search) => {
                    if (search === item.dataset.name) {
                        listSearch.push(product)
                    }
                })
            });
            console.log(listSearch);
            // chuyen sang trang search
        })
    })

}
//****************************** get list category  ******************************
function getProduct() {
    fetch(apiProduct).then(function (response) {
        return response.json();
    }).then((products) => {
        handlerSuggest(products)
        handlerFlashSale(products)
        handlerCategory(products)
        handlerClickChangePage(products)

    })
}
//****************************** handler container category  ******************************
function handlerSuggest(products) {
    // console.log(products);
    const suggestbody = $('.suggest-body')
    let htmls = products.map((product) => {
        let sold = product.sold / 1000
        let price = product.price / 1000
        return `<div class="suggest-body__items select-product " data-id=${product.id}>
                 <div class="suggest-body__items-wrap">
                     <div class="suggest-body__items-img">
                         <div class="suggest-body__items-img-wrapper">
                             <img src="${product.image}" alt="suggest-img">
                             <img src="${product.treatment}" alt="suggest-service">
                             <div class="suggest-body__items-promotion">
                                 <div class="suggest-body__items-promotion-number">${product.promotion}%</div>
                                 <div class="suggest-body__items-promotion-text">Giảm</div>
                             </div>
                             <div class="suggest-body__items-sponsor">Tài trợ</div>
                             <div class="suggest-body__items-Tick">Yêu thích</div>
                             <div class="suggest-body__items-service">
                             </div>
                         </div>
                     </div>
                     <div class="suggest-body__items-content">
                         <div class="suggest-body__items-content-wrapper">
                             <div class="suggest-body__items-content-title">${product.name}</div>
                             <div class="suggest-body__items-content-voucher">giảm ${product.voucher}%</div>
                             <div class="suggest-body__items-content-end">
                                 <div class="suggest-body__items-content-price">${price.toFixed(3)}đ</div>
                                 <div class="suggest-body__items-content-sold">đã bán ${sold.toFixed(1)}k</div>
                             </div>
                         </div>
                     </div>
                     <div class="suggest-body__items-show">
                         <p>Tìm sản phẩm tương tự</p>
                     </div>
                 </div>
                 </div>` }).join('')
    suggestbody.innerHTML = htmls
}
//****************************** handler container flash sale ******************************
function handlerFlashSale(products) {
    const eListFlashSale = $('.flashSale-body__list-items')
    let listFlashSale = []
    products.forEach((product) => {

        if (product.flashSale == 1) {
            listFlashSale.push(product)
        }
    })
    // console.log(listFlashSale);
    let htmls = listFlashSale.map((item) => {
        let sold = (item.sold / 1000).toFixed(1)
        let price = (item.price / 1000).toFixed(3)
        return `<a href="#" class="flashSale-body__items select-product" data-id=${item.id}>
                    <div class="flashSale-body__items-wrap">
                        <div class="flashSale-cart__items">
                            <div class="flashSale-cart__bground-items"></div>
                            <img src="${item.image}" alt="anh flash sale"
                                class="flashSale-cart__items1-img">
                            <div class="flashSale-cart__bground">
                            </div>
                        </div>
                        <div class="flashSale-cart__price">
                            <div class="flashSale-cart__price-number">${price}đ</div>
                            <div class="flashSale-cart__price-percent">Đã Bán ${sold}k</div>
                        </div>
            
                        <div class="flashSale__ratiosale">
                            <div class="flashSale__ratiosale-number">${item.promotion}%</div>
                            <div class="flashSale__ratiosale-text">giảm</div>
                        </div>
                    </div>
                </a>`   }).join('')
    eListFlashSale.innerHTML = htmls

    handlerCountdown()
    function handlerCountdown() {
        const hour = $('.countdown-hour')
        const minutes = $('.countdown-min')
        const seconds = $('.countdown-sec')
        const setTime = "june 21, 2023, 16:16:16";
        const countDownDate = new Date(setTime).getTime()
        setInterval(() => {
            const date = new Date()
            const now = date.getTime()
            const distance = countDownDate - now;
            hour.innerHTML = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes.innerHTML = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds.innerHTML = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000)
    }
}
//****************************** get list category  ******************************
function getTopSearch() {
    fetch(apiTopSearch).then(function (response) {
        return response.json();
    }).then(function (listTopSearch) {
        handlerTopSearch(listTopSearch)
    })
}
//****************************** handler container topSearch  ******************************
function handlerTopSearch(listTopSearch) {
    const topSearchWrap = $('.topSearch-body__list-items');

    let htmls = listTopSearch.map((item) => {
        return ` <a class="topSearch-body__items select-product" >
        <div class="topSearch-body__items-wrap">
            <div class="topSearch-body__content">
                <div class="topSearch-body__top"></div>
                <img src="${item.image}" class="topSearch-body__img"></img>
                <div class="topSearch-body__img-content">${item.description}</div>
            </div>
            <div class="topSearch-body__title">${item.title}</div>
        </div>
    </a>`
    }).join('')
    topSearchWrap.innerHTML = htmls;

}

function handlerClickChangePage(products) {

    const listEProduct = $$('.select-product')
    listEProduct.forEach((product) => {
        product.addEventListener('click', (e) => {
            e.preventDefault()
            localStorage.setItem("productSelect", JSON.stringify(products[e.currentTarget.dataset.id]))
            window.location.href = "/assets/html/product/product.html";

        })
    })
    const clickUser = $('.header-navbar__profile-header--items')
    clickUser.onclick = () => {
        window.location.href = "/assets/html/account/profile.html";
    }


}