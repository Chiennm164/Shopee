const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const userName = $("input[name = 'username']")
const passWord = $("input[name = 'password']")
const btnSubmit = $(".form-login__btn-submit")
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
    var formData = {
        userName: userName.value.trim(),
        passWord: passWord.value.trim()
    }
    console.log(formData)
        //  check username , password
    let userIdApi;
    let checkUserLogin = users.some(function(check) {
        userIdApi = check.id
        userStatusApi = check.status

        return check.userName === formData.userName && check.passWord === formData.passWord;
    })

    console.log("check tk , mk :" + " " + checkUserLogin)
    console.log("check đến id :" + " " + userIdApi)
    console.log("trạng thái người đăng nhập :" + " " + userStatusApi)
        // check status
    if (userStatusApi > 4) {
        console.log("Tk của bạn đã bị khoá ,thắc mắc vui lòng liên hệ qtv ")
    } else if (userStatusApi == 4) {
        console.log("Tk của bạn chưa được xác thực ")
    } else if (checkUserLogin && 4 > userStatusApi) {
        var stateData = {
            state: 'active'
        }
        patchState(userIdApi, stateData)
        console.log("đăng nhập thành công")
    } else {
        console.log("đăng nhập thất bại , kiểm tra tên đăng nhập hoặc mật khẩu")
    }
}
//xử lý nút đăng nhập khi người dùng ấn vào -> validate form
function handleLogin() {
    btnSubmit.onclick = function(e) {
        console.log(userName.value, passWord.value)
        if (userName.value.trim() != '' && userName.value.trim().length >= 4,
            passWord.value.trim() != '' && passWord.value.trim().length >= 4
        ) {
            getUser()
        } else {
            console.log("vui lòng nhập đúng Tên đăng nhập và mật khẩu")
        }

    }
}