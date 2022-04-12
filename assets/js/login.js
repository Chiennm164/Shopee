const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const userName = $("input[name = 'username']")
const passWord = $("input[name = 'password']")
const btnSubmit = $(".form-login__btn-submit")

let message = $('.form-message');
let userIdApi;


const apiUser = "http://localhost:3000/user"

function start() {
    handleLogin()
}
start()

function getUser() {
    fetch(apiUser).then(function(response) {
        return response.json();
    }).then(function(users) {
        checkDataUser(users)
    })
}
// kích  hoạt state = active cho tk đăng nhập và chuyển sang trang index
function patchState(id, data) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(apiUser + '/' + id, options).then(function(response) {
        return response.json();
    }).then(function() {
        location.assign("http://127.0.0.1:5501/index.html")
        console.log('Đăng nhập thành công')
    })
}
// check username , password , status của người dùng 
// người dùng có thể đăng  nhập được
// 0 : admin | 1: người bán hàng | 2: người dùng bình thường | 3: người dùng chưa có thông tin cá nhân |
// người dùng không đăng nhập được
// 4: người dùng chưa kích hoạt tài khoản |5: người dùng bị cấm
function checkDataUser(users) {
    let formData = {
        userName: userName.value.trim(),
        passWord: passWord.value.trim()
    }
    console.log(formData);
    //  check username 
    let checkUserName = users.some(function(check) {
        userIdApi = check.id
        return check.userName === formData.userName;
    })
    console.log("check tk :" + " " + checkUserName);
    statusUser = users[userIdApi].status;
    console.log(statusUser);
    if (checkUserName) {
        console.log('tài khoản tồn tại');
        message.style.display = "none";
        let checkPassword = users.some(function(check) {
            return check.passWord === formData.passWord;
        });
        // check password
        if (checkPassword) {
            message.style.display = "none";
            switch (statusUser) {
                case 5:
                    message.style.display = "block";
                    message.innerText = "Tài khoản của bạn đã bị khoá";
                    break;
                case 4:
                    message.style.display = "block";
                    message.innerText = "Tài khoản của bạn chưa được xác thực";
                    break;
                case 3:
                case 2:
                case 1:
                case 0:
                    var stateData = {
                        state: "active"
                    }
                    console.log("a" + userIdApi)
                    patchState(userIdApi, stateData)
                    break;
            }
        } else {
            console.log("mật khẩu không chính xác");
            message.style.display = "block";
            message.innerText = "Mật khẩu không chính xác";
        }
    } else {
        console.log("tài khoản không tồn tại")
        message.style.display = "block";
        message.innerText = "Tài khoản không tồn tại";
    }
}
//xử lý nút đăng nhập khi người dùng ấn vào -> validate form
function handleLogin() {
    btnSubmit.onclick = function(e) {
        console.log(userName.value, passWord.value)
        if (userName.value.trim() != '' && userName.value.trim().length >= 4,
            passWord.value.trim() != '' && passWord.value.trim().length >= 4
        ) {
            message.style.display = "none";
            getUser()
        } else {
            console.log("vui lòng nhập đúng Tên đăng nhập và mật khẩu");
            message.style.display = "block"
            message.innerText = "Vui lòng nhập tên đăng nhập và mật khẩu"
        }

    }
}