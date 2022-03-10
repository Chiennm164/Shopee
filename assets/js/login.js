const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const userName = $("input[name = 'username']")
const passWord = $("input[name = 'password']")
const btnSubmit = $(".form-login__btn-submit")
const apiUser = "http://localhost:3000/user"


function start() {
    getUser()
}
start()


function getUser() {
    fetch(apiUser).then(function(response) {
        return response.json();
    }).then(function(users) {
        handleLogin(users)
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

    )
}


function handleLogin(users) {
    let lengthUsers = users.length
    btnSubmit.onclick = function() {
        for (var i = 0; i < lengthUsers; i++) {
            var idApi = users[i].id
            var userNameApi = users[i].userName
            var passWordApi = users[i].passWord
            var stateApi = users[i].state
            console.log(userNameApi, passWordApi, stateApi)
        }
        if (userNameApi === userName.value && passWordApi === passWord.value && stateApi == "noactive") {
            var formData = {
                state: "active"
            }
            patchState(idApi, formData)
            console.log("đăng nhập thành công")
            btnSubmit.href = 'http://127.0.0.1:5501/index.html'

        } else {
            console.log("đăng nhập thất bại")

        }

    }
}