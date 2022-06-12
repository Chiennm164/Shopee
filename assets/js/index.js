
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let btnLeft = $(".flashsale__btn-control-left");
let wrapFlashSale = $(".flashSale-body__list-items");
let btnRight = $(".flashsale__btn-control-right");

const apiUser = "http://localhost:3000/user";

function start() {
    handlerUser()
    // sliderShow()
    // handlerNoti()
    // handlerCarousel()
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

function infoUser(data) {

    const useravatar = $('.useravatar');
    const username = $('.username');
    username.innerText = data.username
    useravatar.src = data.avatar
}
// ****************************** Check Status ******************************
function checkStatus(data) {
    let status = localStorage.getItem('statusUser');
    console.log(typeof Number(status));
    if (Number(status) === 1) {
        console.log('status : ' + status);
        console.log('hiển thị giao diện admin');
        login();
        infoUser(data);
    }
    if (Number(status) > 1 && !(status == '')) {
        console.log('status : ' + status);
        console.log('hiển thị giao diện người dùng bình thường');
        login();
        infoUser(data);
    }
}
// slider banner
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

