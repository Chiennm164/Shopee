var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
const userName = $('#username');
const passWord = $('#password');
const rePassWord = $('#repassword');
const email = $('#email');
const checkBoxSignUp = $('#checkbox-signup');
const message = $(".content__form-message")
const btnSubmitSignUp = $('#btn-submit-signup');
const alertBg = $('.confirm-background')
const alertLogin = $('.confirm-alert')
const createdAt = new Date().getTime();
var userNameApi;
const apiUser = "http://localhost:3000/user"
var emailApi;

function start() {
    handleSignUp()
}
start()

function createUser(formDataUser) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataUser)
    }
    fetch(apiUser, options).then(function(response) {
            return response.json();
        })
        .then(
            alertBg.style.display = "block",
            alertLogin.style.display = "flex")
}

function getUser() {
    fetch(apiUser).then(function(response) {
        return response.json();
    }).then(function(users) {
        checkValidate(users)
    })

}

function checkValidate(users) {
    let lgUser = users.length
    var formDataUser = {
        id: lgUser,
        createdAt: createdAt,
        userName: userName.value.trim(),
        passWord: passWord.value.trim(),
        fullName: "text",
        avatar: "src",
        email: email.value.trim(),
        address: "text",
        phone: 0,
        birthday: "time",
        gender: "text",
        state: "noactive",
        money: 0,
        point: 0,
        salesman: "false"
    }
    checkDataUser(formDataUser, users)

}

function checkDataUser(formDataUser, users) {
    // let lgUser = users.length;
    // console.log(users)
    let checkData = users.every(
        function(check) {
            return check.userName !== formDataUser.userName && check.email !== formDataUser.email;
        }
    )
    console.log(checkData)

    if (checkData) {
        console.log("check data thành công")
        createUser(formDataUser);

    } else {
        console.log("Trùng tên đăng nhập hoặc email")

    }

}

function handleSignUp() {
    btnSubmitSignUp.onclick = function() {
        if (checkBoxSignUp.checked &&
            passWord.value.trim() === rePassWord.value.trim() &&
            userName.value != '', passWord.value != '', email.value != '' &&
            userName.value.length >= 4 &&
            passWord.value.length >= 3 &&
            email.value.search("@") > 2) {
            getUser()
        } else {
            message.style.display = "block";
            handleSignUp()
        }
    }
}