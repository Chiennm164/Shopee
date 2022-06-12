const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const userName = $("input[name = 'username']")
const passWord = $("input[name = 'password']")
const btnSubmit = $(".form-login__btn-submit")

let message = $$('.form-message');
let userIdApi;
const apiUser = "http://localhost:3000/user"

const createdAt = new Date().getTime();

handleBtnLogin()
function checkDataUser(valueInputName, valueInputPassword) {
    // console.log(valueInputName, valueInputPassword);
    fetch(apiUser).then(function (response) {
        return response.json();
    }).then(function (users) {
        comparison(users)
    })

    function comparison(users) {
        let data = {
            id: '',
            status: '',
            passWord: '',
            code: ''
        }

        let checkUserName = users.some((user) => {
            if (user.userName === valueInputName) {
                data.id = user.id;
                data.code = user.code;
                data.passWord = user.passWord;
                data.status = user.status;
            }
            return user.userName === valueInputName;
        })
        if (checkUserName) {
            if (data.passWord == valueInputPassword) {
                // localStorage.setItem('codeUser', "8h6f7g1a9i3c");
                localStorage.setItem('codeUser', data.code);
                localStorage.setItem('statusUser', data.status);
                localStorage.setItem('idUser', data.id);

                alert("M khau chinh xac");
                checkStatus(data.status)
            } else {
                showMessage(passWord, "Mật khẩu không chính xác", true);
            }
        } else {
            showMessage(userName, "Tài khoản không tồn tại", true);
        }
    }
}
//xử lý nút đăng nhập khi người dùng ấn vào -> validate form
function handleBtnLogin() {
    btnSubmit.onclick = function () {
        let valueInputName = userName.value.trim();
        let valueInputPassword = passWord.value.trim();
        showMessage(userName, "Chưa nhập tên tài khoản", valueInputName == '');
        showMessage(passWord, "Chưa nhập Mật Khẩu", valueInputPassword == '');
        if (!(valueInputName == '') && !(valueInputPassword == '')) {
            checkDataUser(valueInputName, valueInputPassword)
        }
    }
}
function showMessage(index, contentMessage, condition) {
    if (!condition) {
        index.classList.remove('border-error');
        index.nextElementSibling.classList.add('hide-message')
    } else {
        index.classList.add('border-error');
        index.nextElementSibling.classList.remove('hide-message')
        index.nextElementSibling.innerText = contentMessage;
    }

}
// ****************************** Check Status ******************************
// Thông qua code ở phần local storgae ,lấy được thông tin người dùng bao gồm:
// Thông tin cá nhân : full name , address , phone ,email ,birthOfDay ,gender
// Thông tin tài khoản : password , username, createdate , money,avatar , point, status
// Status : từ 1 -5
// 1: admin
// 2: người dùng có đăng ký bán hàng
// 3: người dùng cấp cao (đã đầy đủ thông tin )
// 4: người dùng bình thường (đã kích hoạt tài khoản nhưng chưa điền thông tin cá nhân)
// 5: người dùng đang chờ (chưa kích hoạt tài khoản)
// 6: người dùng đang bị cấm

function checkStatus(data) {
    console.log(data);
    const message = $('.status-error');
    switch (data) {
        case 1:
        case 2:
        case 3:
        case 4:
            message.classList.remove('hide-message')
            message.innerText = "Đăng nhập thành công, đang chuyển trang !"
            break;
        case 5:
            message.classList.remove('hide-message')
            message.innerText = "Đăng nhập thất bại, Tài Khoản chưa được kích hoạt !"
            break;
        case 6:
            message.classList.remove('hide-message')
            message.innerText = "Đăng nhập thất bại, Tài Khoản đã bị khoá !"
            break;
    }
}