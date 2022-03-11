const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
var profile = $(".profile")
var usersignup = $(".usersignup")
var userlogin = $(".userlogin")
var logout = $(".profile-logout")
const apiUser = "http://localhost:3000/user"


function start() {
    handlerUser()
    sliderShow()
}
start()

function handlerUser() {
    getUser(), handleLogOut()

    function getUser() {
        fetch(apiUser).then(function(response) {
            return response.json();
        }).then(function(users) {
            checkLogin(users)
            handleLogOut(users)

        })
    }

    function patchState(id, formData) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch(apiUser + '/' + id, options).then(function(response) {
            return response.json();
        }).then(
            logout.href = 'index.html'

        )
    }

    function checkLogin(users) {

        let activeSatate = users.some(
            function(check) {
                return check.state === 'active'
            }
        )
        if (activeSatate) {
            profile.style.display = "flex"
            usersignup.style.display = "none";
            userlogin.style.display = "none";
        } else {

            profile.style.display = "none"

        }

    }

    function handleLogOut(users) {
        logout.onclick = function() {
            let lengthUsers = users.length

            for (var i = 0; i < lengthUsers; i++) {
                var idApi = users[i].id
            }
            var formData = {
                state: "noactive"
            }
            patchState(idApi, formData)
        }
    }
}

function sliderShow() {
    var clickPrev = $('.slider__turn--left')
    var clickNext = $('.slider__turn--right')
    var showImg = $('.slider__main-item-img')
    var btnChose = $$('.slider__nav-item')
    var imgsLength;
    var btnChoseLength = btnChose.length;
    const imageApi = "http://localhost:3000/sliderBanner"

    function getImage() {
        fetch(imageApi).then(function(response) {
            return response.json();
        }).then(
            function(imgs) {
                handlerSlider(imgs)

            })
    }
    getImage()

    function handlerSlider(imgs) {
        // nút next
        imgsLength = imgs.length
        let i = 0

        clickNext.onclick = function() {
            showImg.src = imgs[i].src
            if (i + 1 == imgs[i].id) {
                $('.slider__nav-item.slider__nav-item--active').classList.remove('slider__nav-item--active')
                btnChose[i].className = "slider__nav-item slider__nav-item--active"
            }
            i++;

            if (i == imgsLength) {
                i = 0
            }
            console.log(i)
        }


        //  nút Prev
        var j = imgsLength - 1
        clickPrev.onclick = function(e) {
                console.log(j)
                showImg.src = imgs[j].src
                if (j + 1 == imgs[j].id) {
                    $('.slider__nav-item.slider__nav-item--active').classList.remove('slider__nav-item--active')
                    btnChose[j].className = "slider__nav-item slider__nav-item--active"
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
                $('.slider__nav-item.slider__nav-item--active').classList.remove('slider__nav-item--active')
                btnChose[k].className = "slider__nav-item slider__nav-item--active"
            }
            k++;
            if (k == imgsLength) {
                k = 0
            }
        }
        setInterval(changeImgs, 4000);

        //  nút chọn ảnh
        for (let i = 0; i < btnChoseLength; i++) {
            btnChose[i].onclick = function() {
                showImg.src = imgs[i].src
                if (i + 1 == imgs[i].id) {
                    $('.slider__nav-item.slider__nav-item--active').classList.remove('slider__nav-item--active')
                    btnChose[i].className = "slider__nav-item slider__nav-item--active"
                }
                console.log(i)
            }
        }
    }
}