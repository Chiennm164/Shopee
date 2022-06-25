
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
let elementStatus = $$(".status")
const profileMain = $('.profile__main ')
const btnAccount = $('.profile__user-infor-account');
const btnAddress = $('.profile__user-infor-address')
const btnInforUser = $('.profile__user-infor-profile')
const listBtn = $$('.profile__nav-body-items a')
const apiUser = "http://localhost:3000/user";

start()
function start() {
    renderDefault()
    handlerStatus()
    listBtn.forEach(element => {
        element.addEventListener('click', () => {
            listBtn.forEach(e => {
                e.classList.remove('nav-item-active')
            })
            element.classList.add('nav-item-active')
        })
    })
    btnAccount.addEventListener('click', () => {
        handlerChangePassword()
    })
    btnAddress.addEventListener('click', () => {
        handlerUserAddress()
    })
    btnInforUser.addEventListener('click', () => {
        renderDefault()
        handlerStatus()
    })
}
// ***************************************** Check Status   *****************************************
function handlerStatus() {
    // get user
    fetch(apiUser).then(function (response) {
        return response.json();
    }).then(function (users) {
        let presentUser = '';
        let code = localStorage.getItem('codeUser');
        // lấy ra người dùng hiện tại
        users.forEach(user => {
            if (code === user.code) {
                presentUser = user;
            }
        })
        if (!(presentUser.address == "")) {
            let listAddress = JSON.stringify(presentUser.address);
            localStorage.setItem('listAddress', listAddress)
        } else {
            localStorage.setItem('listAddress', "")
        }
        // check status
        let status = localStorage.getItem('statusUser');
        switch (Number(status)) {
            case 2:
            case 3:
                handlerStatus3(presentUser)
                console.log('Người dùng có thông tin đầy đủ');
                break;
            case 4:
                handlerStatus4(presentUser)
                console.log('Người dùng chưa có thông tin');
                break;
        };
        showDefault(presentUser);
    })
}
// ***************************************** Show Default   *****************************************
function showDefault(presentUser) {
    // console.log(presentUser);
    // show element header
    const useravatar = $$('.useravatar');
    const username = $$('.username');
    const usermoney = $('.usermoney');
    usermoney.innerText = presentUser.money
    username.forEach(e => {
        e.innerText = presentUser.userName
    })
    useravatar.forEach(e => {
        e.src = presentUser.avatar
    })
    // show element header
    const eLogin = $$('.element-login');
    // console.log(eLogin);
    eLogin.forEach(e => {
        e.classList.toggle('hide-element')
    })
    // xu ly nut logout
    const btnLogout = $('.btn-logout')
    btnLogout.addEventListener('click', () => {
        localStorage.setItem('codeUser', "");
        login()
        // tại đây cần chuyển sang trang index
        console.log("dang xuat thanh cong");
    })
}
// ***************************************** Status=3   *****************************************
function handlerStatus3(presentUser) {
    const valueInput = $$('.form-input-edit-profile');
    const valueGender = $$('input[name="gender"]');
    const btnWrap = $('.btn-edit-profile')
    elementStatus.forEach((e) => {
        e.classList.add('status3')
    });
    // console.log(presentUser);
    showInfor()
    function showInfor() {
        valueInput.forEach(element => {
            if (element.name == "fullname") {
                element.value = presentUser.fullName
            }
            if (element.name == "phone") {
                element.value = presentUser.phone
            }
            if (element.name == "email") {
                element.value = presentUser.email
            }
            if (element.name == "birthofdate") {
                element.value = presentUser.birthOfDate
            }
        });
        valueGender.forEach(element => {
            if (presentUser.gender == element.value) {
                element.checked = true;
            }
        });
        btnWrap.innerHTML = `<p href="#" class="btnEdit">Chỉnh Sửa</p>`
        const btnEdit = $('.btnEdit');
        btnEdit.addEventListener('click', () => {
            btnWrap.innerHTML = `<p href="#" class="btnSave">Lưu </p>`
            handlerStatus4(presentUser);
        })
    }
}
// ***************************************** Status=4   *****************************************
function handlerStatus4(presentUser) {

    // thay đổi input birthday
    const wrapBirthOfDate = $('.birthofdate');
    wrapBirthOfDate.innerHTML = ` <div class="input-setbirthday-wrap">
                                      <input type="text" name="day" placeholder="Ngày "
                                          class=" setbirthday status ">
                                  </div>
                                  <div class="input-setbirthday-wrap">
                                      <input type="text" name="month" placeholder="Tháng"
                                          class=" setbirthday status ">
                                  </div>
                                  <div class="input-setbirthday-wrap">
                                      <input type="text" name="year" placeholder="Năm"
                                          class=" setbirthday status ">
                                  </div>`
    // truyền giá trị cho các ô input của birthday
    let a = presentUser.birthOfDate.split('/');
    console.log(a);
    const valueBirthOfDay = $$('.setbirthday');
    valueBirthOfDay.forEach(element => {
        if (element.name == 'day') {
            element.value = a[0];
        }
        if (element.name == 'month') {
            element.value = a[1];
        }
        if (element.name == 'year') {
            element.value = a[2];
        }
    });
    // mở cho người dùng thay đổi input
    let elementStatus = $$(".status")
    elementStatus.forEach((e) => {
        e.classList.add('status4')
        e.classList.remove('status3')
    });
    // add sự kiện on blur để check trống hay không // validate bước 1
    elementStatus.forEach((element) => {
        element.addEventListener('blur', () => {
            if (element.value == '') {
                element.classList.add('border-error');
            } else {
                element.classList.remove('border-error');
            }
        });
    })
    const btnSave = $('.btnSave');
    btnSave.addEventListener('click', () => {
        console.log('check form');
        // validate bước 2
        checkForm();
    })


}
// ***************************************** CheckForm      *****************************************
function checkForm() {
    const valueInput = $$('.form-input-edit-profile');
    const valueGender = $$('input[name="gender"]');
    const valueBirthOfDay = $$('.setbirthday');
    let result = true;

    let valuesForm = {
        fullName: '',
        phone: '',
        gender: '',
        birthOfDate: '',
        _status: 3,
    };
    // lấy ra value của các trường name , phone
    valueInput.forEach(element => {
        if (element.value == '') {
            validateForm(element, false);
        } else {
            validateForm(element, true);
            if (element.name == "fullname") {
                valuesForm.fullName = element.value
            }
            if (element.name == "phone") {
                valuesForm.phone = element.value
            }
        }
    });
    // lây ra value gender
    valueGender.forEach(element => {
        if (element.checked == true) {
            valuesForm.gender = element.value;
        }
    });
    // lấy ra các value của 
    valueBirthOfDay.forEach(element => {
        if (element.value == '' || isNaN(Number(element.value))) {
            validateForm(element, false);
            return result = false;
        } else {
            valuesForm.birthOfDate += '/' + element.value.trim();
            validateForm(element, true);
        }
    });
    valuesForm.birthOfDate = valuesForm["birthOfDate"].slice(1);
    for (const key in valuesForm) {
        if (Object.hasOwnProperty.call(valuesForm, key)) {
            if (valuesForm[key] == '') {
                console.log('Chưa đủ thông tin');
                return result = false;
            }
        }
    }
    if (result) {
        console.log('Đã đủ thông tin');
        localStorage.setItem('statusUser', '3')
        patchDataForm(valuesForm);
    } else {
        console.log(result);
        console.log('Chưa đủ thông tin');
    }

}
// ***************************************** Validata input Form     *****************************************
function validateForm(element, condition) {
    if (condition) {
        element.classList.remove('border-error');
    } else {
        element.classList.add('border-error');
        element.classList.remove('border-success');
    }
}
// ***************************************** Patch Data     *****************************************
function patchDataForm(valuesForm) {
    let id = Number(localStorage.getItem('idUser'))

    console.log(valuesForm, id);
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valuesForm)
    }
    fetch(apiUser + '/' + id, options).then(function (response) {
        return response.json();
    }).then(function () {
        alert('Cập nhật thành công');
    })
}
// ***************************************** Handler Change password  *****************************************
function handlerChangePassword() {
    renderFormChangePassWord();
    const inputForm = $$('.input-change-password-item');
    const newPassword = $('input[name="changepassword-newpassword"]');
    const reNewPassword = $('input[name="changepassword-repassword"]');
    const btnConfirm = $('.btnConfirm');
    let result = true;
    inputForm.forEach((input) => {
        input.addEventListener("blur", () => {
            if (input.value == "") {
                validateForm(input, false)
                result = false;
            }
            else {
                result = true;
                validateForm(input, true);
            }
        })
    })
    reNewPassword.addEventListener('blur', () => {
        if (!(reNewPassword.value == newPassword.value)) {
            validateForm(reNewPassword, false);
            result = false;
            console.log('mat khau chua dung');
        }
    })
    btnConfirm.addEventListener('click', (e) => {
        e.preventDefault()
        inputForm.forEach((input) => {
            if (input.value == "") {
                validateForm(input, false);
                result = false;
            }
        })
        if (result == true) {
            const valuesForm = {
                passWord: newPassword.value,
            }
            alert('oke')
            patchDataForm(valuesForm)
        } else {
            console.log("no");
        }
    })
}
// ***************************************** Render Form Change password   *****************************************
function renderFormChangePassWord() {
    profileMain.innerHTML = ` <div class="profile__main-wrap">
                <div div class="profile__main-wrapper" >
                <div class="profile__main-header">
                    <h4> Thay Mật Khẩu</h4>
                    <p>Để bảo mật tài khoản , vui lòng không chia sẻ mật khẩu cho ai khác.</p>
                </div>
                <div class="profile__main-body">
                <form action="" class="form-change-password">
                   <div class="form-change-password-group">
                       <label for="">Mật Khẩu Mới</label>
                       <div class="input-change-password-wrap">
                           <input type="text" placeholder="" class="input-change-password-item"
                               name="changepassword-newpassword">
                       </div>
                   </div>
                   <div class="form-change-password-group">
                       <label for="">Nhập Lại Mật Khẩu</label>
                       <div class="input-change-password-wrap">
                           <input type="text" placeholder="" class="input-change-password-item"
                               name="changepassword-repassword">
                       </div>
                   </div>
                   <div class="form-change-password-group">
                       <label for=""> Mật Khẩu Hiện Tại</label>
                       <div class="input-change-password-wrap">
                           <input type="text" placeholder="" class="input-change-password-item"
                               name="changepassword-oldpassword">
                       </div>
                   </div>
                   <div class="change-password-btn">
                       <button class="btnConfirm">Xác Nhận</button>
                   </div>
                </form>
                </div>
            </div >
            </div > `
}
// ***************************************** Handler User Add Address  *****************************************
function handlerUserAddress() {
    const listAddress = JSON.parse(localStorage.getItem('listAddress'))
    if (!(listAddress == "")) {
        console.log(listAddress);
        renderInforAddress(true, listAddress);
        const setDefault = $$('.setDefault');
        setDefault.forEach((e) => {
            // console.log(e.dataset.value);
            if (e.dataset.value == 1) {
                e.classList.remove('hide-element')
            }
        })
    } else {
        renderInforAddress(false, false);
    }
    const btnAdd = $(".btn-add-address")
    const btnEdit = $$(".show-address-edit")
    const btnDelete = $$(".show-address-delete")
    const formAddNewAddress = $(".add-address");
    // btn add new address
    btnAdd.addEventListener('click', () => {
        formAddNewAddress.classList.remove('hide-element');
        validateFormAddress(listAddress)
    })
    // btnedit address
    btnEdit.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            formAddNewAddress.classList.remove('hide-element');
            validateFormAddress(listAddress, btn.dataset.index);
        })
    })
    //btn delete address
    btnDelete.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            listAddress.splice(btn.dataset.index, 1)
            let newAddress = {
                address: [...listAddress]
            }
            patchDataForm(newAddress);

        })
    })

}
// *****************************************Validate form address *****************************************
function validateFormAddress(listAddress, index) {
    console.log(index);
    const btnBack = $(".formAddress-btnBack")
    const btnSubmit = $(".formAddress-Submit")
    const formAddNewAddress = $(".add-address")
    const listInput = $$('.form-address-body-item input[type="text"]')
    const btnTypeAddress = $$('.type-address')

    let result = true;
    // console.log(listAddress);
    // validate cho input
    listInput.forEach((input) => {
        input.addEventListener('blur', () => {
            if (input.value == "") {
                validateForm(input, false)
                result = false;
            } else {
                validateForm(input, true)
                result = true;
            }
        })
    })
    if (!(index === undefined)) {
        let address = listAddress[index]
        getData()
        function getData() {
            listInput.forEach((input) => {
                if (input.name == "fullname") {
                    input.value = address.takeName
                }
                if (input.name == "phone") {
                    input.value = address.takePhone
                }
                if (input.name == "address") {
                    input.value = address.address1
                }
                if (input.name == "subaddress") {
                    input.value = address.address2
                }
            })
            if (address.setDefault == 1) {
                $('.adddress-checkbox').checked = true
            } else {
                $('.adddress-checkbox').checked = false
            }
            if (address.typeAddress == 1) {
                btnTypeAddress.forEach((btn) => {
                    btn.classList.remove('btn-active')
                })
                $('.type-address.type2').classList.add('btn-active');
            }
        }
    }
    // add sự kiện cho 2 nút 
    btnTypeAddress.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            btnTypeAddress.forEach((btn2) => {
                btn2.classList.remove("btn-active")
            })
            btn.classList.add("btn-active")
        })
    })
    btnBack.addEventListener('click', (e) => {
        e.preventDefault()
        formAddNewAddress.classList.add('hide-element');
    })

    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        listInput.forEach((input) => {
            if (input.value == "") {
                validateForm(input, false)
                result = false;
            } else {
                validateForm(input, true)
                result = true;
            }
        })
        if (result == true) {
            if (index === undefined) {
                console.log(listAddress, index);
                handlerAddAddress(listAddress);
            } else {
                console.log(listAddress, index);
                handlerEditAddress(listAddress, index);
            }
        }
    })
}
// ***************************************** Show Form Add Address  *****************************************
function handlerAddAddress(listAddress) {
    let setDefaultValue = 0;
    if ($('.adddress-checkbox').checked == true) {
        setDefaultValue = 1;
    }
    let newAddress = {
        address: [...listAddress, {
            idAddress: listAddress.length,
            takeName: $('.form-address-fullname').value,
            takePhone: $('.form-address-phone').value,
            typeAddress: $('.type-address.btn-active').value,
            address1: $('.form-address-now-address').value,
            address2: $('.form-address-sub-address').value,
            setDefault: setDefaultValue
        }]
    }
    patchDataForm(newAddress);
}
// *****************************************show edit form *****************************************
function handlerEditAddress(listAddress, index) {
    let setDefaultValue = 0;
    if ($('.adddress-checkbox').checked == true) {
        setDefaultValue = 1;
    }
    let id = listAddress[index].idAddress
    let editAddress = {
        idAddress: id,
        takeName: $('.form-address-fullname').value,
        takePhone: $('.form-address-phone').value,
        typeAddress: $('.type-address.btn-active').value,
        address1: $('.form-address-now-address').value,
        address2: $('.form-address-sub-address').value,
        setDefault: setDefaultValue
    }
    listAddress[index] = editAddress
    let newListAddress = {
        address: [...listAddress]
    }
    patchDataForm(newListAddress);
    // console.log(listAddress);
}
// ***************************************** Render Form Add Address  *****************************************
function renderInforAddress(condition, listAddress) {
    let htmls = ""
    if (condition && !(listAddress == false)) {
        htmls = listAddress.map((address, index) => {
            return ` <div class="show-address">
            <div class="show-address-wrap">
                <form action="" class="form-show-address">
                    <div class="form-show-address-item">
                        <label for="">Họ Và Tên</label>
                            <p name="fullname">${address.takeName} <span data-value = ${address.setDefault} class='setDefault hide-element'>Mặc định</span> </p>
                        </div>
                    <div class="form-show-address-item">
                            <label for="">Số Điện Thoại</label>
                            <p name="phone">${address.takePhone} </p>
                        </div>
                        <div class="form-show-address-item">
                            <label for="">Địa Chỉ</label>
                                <p name="address1">${address.address1}</p>
                        </div>
                        <div class="form-show-address-item">
                        <label for="">Mô Tả Địa Chỉ</label>
                            <p name="address2">${address.address2} </p>
                    </div>
                    </form>
                    <div class="show-address-option">
                        <a href="" class="show-address-edit" data-index=${index}>Sửa</a>
                        <a href="" class="show-address-delete" data-index=${index}>Xoá</a>
                    </div>
                </div>
            </div>`
        }).join('')

    } else {
        htmls = `<p class="noti-add-address"> Bạn chưa có địa chỉ </p>`
    }
    profileMain.innerHTML = ` <div class="profile__main-wrap">
    <div div class="profile__main-wrapper">
        <div class="profile-main-add-address__header ">
            <p> Địa Chỉ Của Tôi</p>
            <div class="btn-add-address">
                <i class="ti-plus"></i>
                <p>Thêm Địa Chỉ Mới</p>
            </div>
        </div>
        <div class="profile-main-add-address__body">
           ${htmls}
        </div>
    </div>
</div>`

}
// ***************************************** Render Infor User  *****************************************
function renderDefault() {
    profileMain.innerHTML = ` <div class="profile__main-wrapper">
    <div class="profile__main-header">
        <h4> Hồ Sơ Của Tôi</h4>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
    </div>
    <div class="profile__main-body">
        <div class="profile__main-body-form">
            <form action="#" class="form-edit-profile">
                <div class="form-edit-profile-group">
                    <label for="fullname" class="form-label-edit-profile">Họ và Tên </label>
                    <span class="form-label-edit-profile-space"></span>
                    <div class="input-wrapper">
                        <input type="text" value="" name="fullname" placeholder=" Nhập Họ và Tên"
                            class="form-input-edit-profile  status ">
                    </div>
                </div>
                <div class="form-edit-profile-group">
                    <label for="fullname" class="form-label-edit-profile">Email</label>
                    <span class="form-label-edit-profile-space"></span>
                    <div class="input-wrapper">
                        <input type="text" name="email" 
                            class="form-input-edit-profile pointer-event-none border-none status">
                    </div>
                </div>
               
                <div class="form-edit-profile-group">
                    <label for="phone" class="form-label-edit-profile ">Số Điện Thoại</label>
                    <span class="form-label-edit-profile-space"></span>
                    <div class="input-wrapper ">
                        <input type="text" name="phone" value="" placeholder=" Nhập số điện thoại  "
                            class="form-input-edit-profile  status ">
                    </div>
                </div>
                <div class="form-edit-profile-group">
                    <label for="" class="form-label-edit-profile">Giới Tính</label>
                    <span class="form-label-edit-profile-space"></span>
                    <div class="input-wrapper">
                        <div class="profile-gender-group border-none status">
                            <input type="radio" id="gender-male" name="gender"
                                value="1" class="form-input-edit-profile-gender">
                            <label for="">Nam</label>
                            <input type="radio" id="gender-female" name="gender"
                                value="2" class="form-input-edit-profile-gender">
                            <label for="gender-female">Nữ</label>
                            <input type="radio" id="gender-orther" name="gender"
                                value="3" checked="true" class="form-input-edit-profile-gender">
                            <label for="gender-orther">Khác</label>
                        </div>
                    </div>
                </div>
                <div class="form-edit-profile-group">
                    <label for="dateofbirth" class="form-label-edit-profile">Ngày Sinh</label>
                    <span class="form-label-edit-profile-space"></span>
                    <div class="input-wrapper birthofdate ">
                      <input type="text" name="birthofdate" value="" placeholder=" "
                      class="form-input-edit-profile  status ">
                    </div>
                </div>
               <div class='btn-edit-profile'> </div>
            </form>
        </div>
        <div class="profile__main-body-upavatar">
            <div class="profile__main-body-upavatar-wrapper">
                <div class="profile-body__upavatar">
                    <img src="/assets/img/user/profile/avatar.png" alt="" name="avataruser"
                        class="profile-body__upavatar-img useravatar">
                </div>
                <button class="profile-body-btn">Chọn ảnh</button>
                <p class="profile-body-description">Dung lượng file tối đa 1 MB Định dạng:.JPEG,
                    .PNG</p>
            </div>
        </div>
    </div>
</div> `

}
