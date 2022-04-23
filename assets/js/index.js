const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let btnLeft = $(".flashsale__btn-control-left");
let wrapFlashSale = $(".flashSale-body__list-items");
let btnRight = $(".flashsale__btn-control-right");

function start() {
    handlerUser()
    sliderShow()
    handlerNoti()
    handlerCarousel()
}
start()

// Xử lý user : 1.check state , 2.logout , 3. username, 4. noti ,5.cart
function handlerUser() {
    let profile = $$(".profile");
    let usersignup = $$(".usersignup");
    let userlogin = $$(".userlogin");
    let logout = $$(".profile-logout");

    let username = $('.header-username');
    let avatar = $('.navbar__item-avatar-img');
    let notiNumber = $('.noti-number');
    let notiContentOn = $('.navbar-notifications-wrap');
    let notiContentOff = $('.navbar-notifications-wrap-off');

    let cartNumber = $('.cart-number-badge');
    let cartContentOn = $('.cart__drawer-wrapper');
    let cartContentOff = $('.cart__drawer-wrapper-off');

    const apiUser = "http://localhost:3000/user";
    getUser()

    function getUser() {
        fetch(apiUser).then(function (response) {
            return response.json();
        }).then(function (users) {
            checkLogin(users)
        })
    }
    //  đăng xuất -> state  = noactive 
    function patchState(id, data) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(apiUser + '/' + id, options).then(function (response) {
            return response.json();
        }).then(
            console.log("đổi trạng thái thành công"),
            location.assign("http://127.0.0.1:5501/index.html")

        )
    }
    // check state người dùng , đang mở hay tạm nghỉ -> state :  active  > hiển thị , state : noactive ẩn 
    function checkLogin(users) {
        let idApi;
        let activeSatate = users.some(
            function (check) {
                idApi = check.id
                return check.state === 'active'
            }
        )
        if (activeSatate) {
            console.log("check active");
            checkUserOn();
            handleLogOut(idApi);
        } else {
            checkUserOff();
        }

        function checkUserOn() {
            profile.forEach(element => {
                element.style.display = "flex";
                element.setAttribute("style", 'align-items:center')
            });
            usersignup.forEach(element => {
                element.style.display = "none";
            });
            userlogin.forEach(element => {
                element.style.display = "none";
            });
            notiNumber.style.display = "block";
            notiContentOn.style.display = "flex";
            notiContentOff.style.display = "none";

            cartNumber.style.display = "block";
            cartContentOn.style.display = "flex";
            cartContentOff.style.display = "none";

            username.innerText = users[idApi].userName;
            avatar.style.src = users[idApi].avatar;
        }

        function checkUserOff() {
            profile.forEach(element => {
                element.style.display = "none";
            });
            logout.forEach(element => {
                element.style.display = "none";
            });
            notiNumber.style.display = "none";
            notiContentOn.style.display = "none";
            notiContentOff.style.display = "flex";

            cartNumber.style.display = "none";
            cartContentOn.style.display = "none";
            cartContentOff.style.display = "flex";
        }
    }
    // xử lý nút đăng xuất trong profile
    function handleLogOut(idApi) {
        // console.log(idApi);
        logout.forEach(element => {
            element.onclick = function () {
                var changeState = {
                    state: "noactive"
                }
                patchState(idApi, changeState)
            }
        });
    }
}
// sliler banner
function sliderShow() {
    var clickPrev = $('.slider-turn__left')
    var clickNext = $('.slider-turn__right')
    var showImg = $('.slider-main__items-img')
    var btnChose = $$('.slider-nav__items')
    var imgsLength;
    var btnChoseLength = btnChose.length;
    const imageApi = "http://localhost:3000/sliderBanner"

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
// Xử lý thông báo
function handlerNoti() {
    const apiNoti = "http://localhost:3000/notifications"


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
    }
}

function handlerCarousel() {
    let transform = 0;
    console.log(transform)
    btnLeft.addEventListener('click', function () {
        switch (transform) {
            case 1:
                wrapFlashSale.style.transform = 'translateX(0%)';
                btnLeft.style.display = "none";
                transform = 0;
                console.log(transform)
                break;
            case 2:
                wrapFlashSale.style.transform = 'translateX(-25%)';
                transform = 1;
                console.log(transform)
                btnRight.style.display = "flex";
                break;
        }
    })
    btnRight.addEventListener('click', function () {
        switch (transform) {
            case 0:
                btnLeft.style.display = "flex";
                wrapFlashSale.style.transform = 'translateX(-25%)';
                transform = 1;
                console.log(transform)
                break;
            case 1:
                wrapFlashSale.style.transform = 'translateX(-50%)';
                btnRight.style.display = "none";
                transform = 2;
                console.log(transform)
                break;
        }
    })

}

