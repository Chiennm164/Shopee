var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
// input 
const userName = $('#username');
const passWord = $('#password');
const rePassWord = $('#repassword');
const email = $('#email');
const checkBoxSignUp = $('#checkbox-signup');
// message
const messageUsername = $(".message-username");
const messagePassword = $(".message-password");
const messageRePassword = $(".message-repassword");
const messageEmail = $(".message-email");
const messageCheckbox = $(".message-checkbox");
// btn
const btnSubmitSignUp = $('#btn-submit-signup');
// create Time
const createdAt = new Date().getTime();
// api 
const apiUser = "http://localhost:3000/user"

function start() {
    handleBlurInput()

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
            console.log("đăng kí thành công")
        })
}

function getUser() {
    fetch(apiUser).then(function(response) {
        return response.json();
    }).then(function(dataUsers) {
        formUser(dataUsers)
    })
}

// Xử lý thao tác người dùng blur input


function handleBlurInput() {
    function validateInput(message, messageContent, condition) {
        if (condition) {
            message.style.display = "none";
            return true;
        } else {
            message.style.display = "block";
            message.innerText = messageContent;
            return false;
        }
    }

    let checkUserName = userName.onblur = function() {
        return validateInput(messageUsername, "Tên tài khoản quá ngắn !", userName.value.trim() != "" && userName.value.length >= 4);
    }
    let checkPassword = passWord.onblur = function() {
        return validateInput(messagePassword, "Vui lòng nhập mật khẩu !", passWord.value.trim() != "" && passWord.value.length > 4);
    }
    let checkRePassword = rePassWord.onblur = function() {
        return validateInput(messageRePassword, "Mật khẩu không trùng khớp !", rePassWord.value.trim() != "" && passWord.value.trim() === rePassWord.value.trim());
    }
    let checkEmail = email.onblur = function() {
        return validateInput(messageEmail, "Vui lòng nhập email !", email.value.trim() != "" && email.value.search("@") > 3);
    }
    let checkCheckbox = function() {
        if (checkBoxSignUp.checked) {
            messageCheckbox.style.display = "none";
            console.log(`value check box :${checkBoxSignUp.checked}`);
            return true;
        } else {
            messageCheckbox.style.display = "block";
            messageCheckbox.innerText = "Bạn cần đồng ý các điều khoản trên !";
            return false;
        };
    }

    // xử lý nút đăng ký
    btnSubmitSignUp.onclick = function() {
        checkUserName()
        checkEmail()
        checkPassword()
        checkRePassword()
        checkCheckbox()
        if (checkUserName() && checkEmail() && checkPassword() && checkRePassword() && checkCheckbox()) {
            console.log('check thành công')
            getUser();
        } else {
            console.log('check thất bại')

        }
    }
}
//  mẫu của người dùng
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
function checkDataUser(formDataUser, dataUsers) {
    let checkUserName = function() {
        let userName = dataUsers.every(
            function(check) {
                return check.userName !== formDataUser.userName;
            }
        )
        if (userName) {
            console.log("check dữ liệu : tên người dùng không trùng lặp");
            messageUsername.style.display = "none"
            return true;

        } else {
            console.log("check dữ liệu : tên người đã có");
            messageUsername.style.display = "block"
            messageUsername.innerText = "Tên tài khoản đã tồn tại!"
        }
    }
    let checkEmail = function() {
        let email = dataUsers.every(
            function(check) {
                return check.email !== formDataUser.email;
            }
        )
        if (email) {
            messageEmail.style.display = "none"
            console.log("check dữ liệu thành công , email không trùng lặp");
            return true;
        } else {
            console.log("check dữ liệu : email đã có");
            messageEmail.style.display = "block"
            messageEmail.innerText = "Email này đã được sử dụng !"
        }
    }
    checkUserName()
    checkEmail()
    if (checkUserName() && checkEmail()) {
        createUser(formDataUser);
    } else {
        console.log('đăng ký thất bại')

    }
}