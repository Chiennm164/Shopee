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

//
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
        .then(function() {
            alertBg.style.display = "block"
            alertLogin.style.display = "flex"
            console.log("đăng kí thành công")
        })
}

function getUser() {
    fetch(apiUser).then(function(response) {
        return response.json();
    }).then(function(users) {
        formUser(users)
    })

}
//  mẫu của  người dùng
function formUser(users) {
    let lgUser = users.length
    var formDataUser = {
            id: lgUser,
            createdAt: createdAt,
            userName: userName.value.trim(),
            passWord: passWord.value.trim(),
            email: email.value.trim(),
            status: 4,
            fullName: "",
            avatar: "/assets/img/user/useravatar.jpg",
            address: "",
            phone: 0,
            birthOfDate: "",
            gender: 1,
            state: "noactive",
            money: 0,
            point: 0,
        }
        //  status : 
        //    0 : admin 
        //    1 : seller 
        //    2 : user update full info 
        //    3 : user no info / 
        //    4 : unverified account 
        //    5 : account ban 
        // state :  active / noactive
        // gender : 
        // 1 : Nam 
        // 2 : Nữ
        // 3 : Khác
    checkDataUser(formDataUser, users)
}
//  kiểm tra username hay email có sẵn chưa
function checkDataUser(formDataUser, users) {
    let checkData = users.every(
        function(check) {
            return check.userName !== formDataUser.userName && check.email !== formDataUser.email;
        }
    )
    console.log(checkData)
    if (checkData) {
        console.log("check dữ liệu thành công , không trùng lặp")
        createUser(formDataUser);
    } else {
        console.log("Trùng tên đăng nhập hoặc email")

    }

}
// xử lý nút đăng kí
function handleSignUp() {
    btnSubmitSignUp.onclick = function() {
        // kiểm tra sơ bộ , validate form
        console.log(checkBoxSignUp.checked)

        if (checkBoxSignUp.checked &&
            passWord.value.trim() === rePassWord.value.trim() &&
            userName.value != '' && passWord.value != '' && email.value != '' &&
            userName.value.length >= 4 &&
            passWord.value.length >= 3 &&
            email.value.search("@") > 2) {
            getUser()
        } else {
            message.style.display = "block";
            console.log("Vui lòng điền đầy đủ thông tin")

        }
    }
}