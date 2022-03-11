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
    }).then(
        console.log('Đăng nhập thành công')
    )
}

function checkDataUser(users) {
    console.log(users)
    var formData = {
        userName: userName.value.trim(),
        passWord: passWord.value.trim()
    }
    console.log(formData)

    let userIdApi;
    let checkUserLogin = users.some(function(check) {
        userIdApi = check.id
        return check.userName === formData.userName && check.passWord === formData.passWord;
    })
    console.log(checkUserLogin)
    console.log(userIdApi)

    if (checkUserLogin) {
        var stateData = {
            state: 'active'
        }
        patchState(userIdApi, stateData)
        console.log("đăng nhập thành công")
        location.assign("http://127.0.0.1:5501/index.html#")
    } else {
        console.log("đăng nhập thất bại")
    }
}

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