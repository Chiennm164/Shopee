const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
var userName = $('#username');
var passWord = $('#password');
var rePassWord = $('#repassword');
var email = $('#email');
var checkBoxSignUp = $('#checkbox-signup');
var message = $(".content__form-message")
var btnSubmitSignUp = $('#btn-submit-signup');

var i = 1;



const signInApi = "http://localhost:3000/user"

function start() {
    handleSignUp()
}
start()

var createdAt = new Date().getTime();

function signIn(formDataUser) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataUser)
    }
    fetch(signInApi, options).then(function(response) {
            return response.json();
        })
        .then(function() {
            console.log('đăng ký thành công');
            console.log("id user tiếp theo : " + i);


        })
        .catch(function(error) {
            console.error("thất bại lỗi fetch:" + error);
        })
}

function handleSignUp() {
    btnSubmitSignUp.onclick = function() {
        if (checkBoxSignUp.checked &&
            passWord.value === rePassWord.value &&
            userName.value, passWord.value, email.value != "" &&
            userName.value.length >= 6 &&
            passWord.value.length >= 3 &&
            email.value.search("@") > 2) {
            var formDataUser = {
                id: i,
                createdAt: createdAt,
                userName: userName.value,
                passWord: passWord.value,
                fullName: "text",
                avatar: "src",
                email: email.value,
                address: "text",
                phone: 0,
                birthday: "time",
                gender: "text",
                state: "noactive",
                money: 0,
                point: 0,
                salesman: "false"
            }

            signIn(formDataUser)
            i++
            btnSubmitSignUp.href = 'http://127.0.0.1:5501/login.html'


        } else {
            console.log("đăng kí thất bại , kiểm tra form");
            message.style.display = "block";
            handleSignUp()
        }


    }

}