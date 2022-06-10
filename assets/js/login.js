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
// // kích  hoạt state = active cho tk đăng nhập và chuyển sang trang index
// function patchState(id, data) {
//     const options = {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     }
//     fetch(apiUser + '/' + id, options).then(function (response) {
//         return response.json();
//     }).then(function () {
//         location.assign("http://127.0.0.1:5501/index.html")
//         console.log('Đăng nhập thành công')
//     })
// }
function checkDataUser(valueInputName, valueInputPassword) {
    // console.log(valueInputName, valueInputPassword);
    fetch(apiUser).then(function (response) {
        return response.json();
    }).then(function (users) {
        comparison(users)
    })

    function comparison(users) {
        let dataPassWord = '';
        let code = '';
        let checkUserName = users.some((data) => {
            if (data.userName === valueInputName) {
                code = data.code;
                dataPassWord = data.passWord;
            }
            return data.userName === valueInputName;
        })
        if (checkUserName) {
            if (dataPassWord == valueInputPassword) {
                localStorage.setItem('codeUser', code);
                alert("M khau chinh xac , dang nhap thanh cong");
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