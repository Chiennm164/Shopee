
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
        handlerAccountInfo()
    })
    btnAddress.addEventListener('click', () => {
        handerUserAddress()
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
        // check status
        let status = localStorage.getItem('statusUser');
        switch (Number(status)) {
            case 2:
            case 3:
                handlerStatus3(presentUser)
                console.log(' nguoi dung đã thong tin day du');
                break;
            case 4:
                handlerStatus4(presentUser)
                console.log(' nguoi dung chua nhap thong tin day du');
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
            if (element.name == "address") {
                element.value = presentUser.address
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
    function validateForm(element, condition) {
        if (condition) {
            element.classList.remove('border-error');
        } else {
            element.classList.add('border-error');
            element.classList.remove('border-success');
        }
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
// *******************************   Handler Account  *********************************
function handlerAccountInfo() {
    profileMain.innerHTML = ' oke acc'
}
// *******************************   Render User Address  *********************************
function handerUserAddress() {
    profileMain.innerHTML = ' oke add'
}
// *******************************   Render Infor User  *********************************
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
                    <label for="address" class="form-label-edit-profile">Địa Chỉ</label>
                    <span class="form-label-edit-profile-space"></span>
                    <div class="input-wrapper">
                        <input type="text" value="" name="address" 
                            class="form-input-edit-profile pointer-event-none border-none status ">
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
