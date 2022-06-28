
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
// input 
const userName = $('#username');
const passWord = $('#password');
const rePassWord = $('#repassword');
const email = $('#email');
const checkBoxSignUp = $('#checkbox-signup');
const inputs = $$('.content__form-group input[type="text"]');
// message
const messageUsername = $(".message-username");
const messagePassword = $(".message-password");
const messageRePassword = $(".message-repassword");
const messageEmail = $(".message-email");
const allMessage = $$(".content__form-group span");
// btn
const btnSubmitSignUp = $('#btn-submit-signup');
let colorCheckBox = $('.content__form-group-checkbox p')
let cbtnCheckBox = $('.content__form-group-checkbox input')
// create Time
const createdAt = new Date().getTime();

const arrText = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'h']
const arrNum = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const code = []
for (let i = 0; i < 6; i++) {
    let a = Math.floor(Math.random() * arrNum.length)
    code.push(arrNum[a])
    let b = Math.floor(Math.random() * arrText.length)
    code.push(arrText[b])
}
// api 
const apiUser = "https://shoppy-coppy-db.herokuapp.com/user"

function start() {
    handleInput()
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
    fetch(apiUser, options).then(function (response) {
        return response.json();
    }).then(function () {
        alert("đăng kí thành công")
    })
}
// Xử lý thao tác người với form input
function handleInput() {
    inputs.forEach((input) => {
        input.addEventListener('blur', () => {
            if (!(input.value.trim() === '')) {
                if (input.id === 'username') {
                    return validateInput(input, messageUsername, "Tên tài khoản quá ngắn !", input.value.trim().length >= 4);
                }
                if (input.id === 'password') {
                    return validateInput(input, messagePassword, "Mật khẩu ngắn !", input.value.trim().length > 4);
                }
                if (input.id === 'repassword') {
                    return validateInput(input, messageRePassword, "Mật khẩu không trùng khớp !", passWord.value.trim() === input.value.trim());
                }
                if (input.id === 'email') {
                    return validateInput(input, messageEmail, "Vui lòng nhập đúng email!", input.value.trim().search("@") > 3);
                }
            }
        })
    });

    // Nút checker
    cbtnCheckBox.addEventListener('click', () => {
        if (checkBoxSignUp.dataset.result = 'true') {
            colorCheckBox.style.color = "black";
        }
    })
    // validate cheker
    let checkCheckbox = function () {
        if (checkBoxSignUp.checked) {
            colorCheckBox.style.color = "black";
            checkBoxSignUp.dataset.result = 'true'
            console.log(`value check box :${checkBoxSignUp.checked}`);
            return true;
        } else {
            colorCheckBox.style.color = "red";
            return false;
        };

    }
    // xử lý nút đăng ký
    btnSubmitSignUp.onclick = function () {
        checkCheckbox()
        const allInput = $$('.content__form-group input');
        let checkResult = [...allInput].filter((input) => {
            return input.dataset.result === 'false'
        });
        // console.log(checkResult);
        if (checkResult.length === 0) {
            alert('validate thanh cong');
            checkDataUser(userName.value.trim(), passWord.value.trim(), email.value.trim());
        } else {
            checkResult.forEach((c) => {
                c.classList.add('border-error')
            })
            allMessage.forEach((m) => {
                m.classList.remove('message-hide');
                m.innerText = 'Không được để trống !';
            })
            alert('dang ky that bai')
        }
        allInput.forEach((input) => {
            if (input.dataset.result === 'true') {
                input.classList.remove('border-error')
                input.classList.add('border-success')
            }
        })
    }
}
//  mẫu của người dùng
function formUser(idUser, userNameForm, passWordForm, emailForm) {
    var formDataUser = {
        id: idUser,
        createdAt: createdAt,
        userName: userNameForm,
        passWord: passWordForm,
        email: emailForm,
        status: 4,
        fullName: "",
        avatar: "/assets/img/user/useravatar.jpg",
        address: "",
        phone: 0,
        birthOfDate: "",
        gender: 1,
        money: 0,
        code: code.join('')
    }
    createUser(formDataUser);
}
//  kiểm tra username hay email có bị trùng hay không
function checkDataUser(userNameForm, passWordForm, emailForm) {
    //get data
    console.log(userNameForm, emailForm);
    fetch(apiUser).then(function (response) {
        return response.json();
    }).then(function (dataUsers) {
        check(dataUsers)
    })
    // check data
    function check(dataUsers) {
        let id = dataUsers.length + 1;
        let checkUserName = dataUsers.every(data => {
            return !(data.userName == userNameForm);
        })
        let checkEmail = dataUsers.every(data => {
            return !(data.email == emailForm)
        })
        if (checkUserName && checkEmail) {
            formUser(id, userNameForm, passWordForm, emailForm)
        } else {
            console.log('that bai ');
            if (!checkUserName) {
                validateInput(userName, messageUsername, "Tên tài khoản đã được sử dụng", false);
            }
            if (!checkEmail) {
                validateInput(email, messageEmail, "Email đã được sử dụng", false);
            }
        }
    }
}
// Validate Input 
function validateInput(currenInput, message, messageContent, condition) {
    if (condition) {
        // console.log(currenInput.value);
        message.style.display = "none";
        currenInput.dataset.result = "true";
        currenInput.classList.remove('border-error');
        currenInput.classList.add('border-success');
        return true;
    } else {
        message.style.display = "block";
        currenInput.classList.add('border-error')
        currenInput.classList.remove('border-success');
        message.innerText = messageContent;
        return false;
    }
}