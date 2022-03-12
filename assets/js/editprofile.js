const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
let profile = $(".profile")
let logout = $(".profile-logout")
let inputElement = $$(".form-input-edit-profile")

let username = $(".profile__nav-title-name")
let address = $("input[name='address")
let fullname = $("input[name='fullname']")
let email = $("a[name='useremail']")
let phone = $("input[name='phone']")
let dateOfBirth = $("input[name='dateofbirth']")
let gender = $$("input[name='gender']")
let genderGroup = $(".profile-gender-group")
let showsGender = $("input[name='shows-gender']")
let genderNone = $(".form-input-edit-profile-gender")
let pointerNone = $$(".pointer-none")
let btnEdit = $(".btn-edit-profile")

let money = $(".profile__nav-title-money")
let avatars = $$("img[name='avataruser']")

let profileNoti = $(".profile__main-noti")
const apiUser = "http://localhost:3000/user"
console.log(avatars)
getUser()

// call api
function getUser() {
    fetch(apiUser).then(function(response) {
        return response.json();
    }).then(function(users) {
        checkLogin(users)
    })
}
// kích hoạt trạng thái active
function patchState(id, data) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(apiUser + '/' + id, options).then(function(response) {
        return response.json();
    }).then(function() {
        location.assign("http://127.0.0.1:5501/index.html"),
            console.log("đổi trạng thái thành công")
    })
}
// check state(tình trạng  ) status (trạng thái ) của   người dùng , đang mở hay tạm nghỉ ( check state )
function checkLogin(users) {
    let idApi;
    // check state người dùng 
    let activeSatate = users.some(
        function(check) {
            idApi = check.id
            statusApi = check.status
            return check.state === 'active'
        }
    )
    handleAccount(idApi, users)

    if (activeSatate) {
        // console.log("check active");
        profile.style.display = "flex";
        handleLogOut(idApi);
    }
    // check xem người dùng đã đủ info chưa
    if (statusApi == 3) {
        console.log('tài khoản chưa đủ thông tin')
        renderFormEditUser(idApi)
    } else {
        console.log('tài khoản đã đủ thông tin')
        renderInfoUser(idApi, users)
    }

}
// xử lý đăng xuất  
function handleLogOut(idApi) {
    console.log(idApi);
    logout.onclick = function() {
        var changeState = {
            state: "noactive"
        }
        patchState(idApi, changeState)
    }
}

// xử lý khi status = 3 ( người dùng chưa đủ thông tin cá nhân)
function renderFormEditUser(idApi) {
    showsGender.parentElement.classList.add("profile-hide")
    genderGroup.classList.remove("profile-hide")
    profileNoti.style.display = "block"
    btnEdit.innerText = 'Lưu';
    pointerNone.forEach(element => {
        element.classList.remove(("pointer-none"))
    });
    for (let i = 0; i < gender.length; i++) {
        gender[i].onclick = function() {
            if (gender[i].value == 1) {
                gender.value = 1
                console.log(gender.value)
            }
            if (gender[i].value == 2) {
                gender.value = 2
                console.log(gender.value)
            }
            if (gender[i].value == 3) {
                gender.value = 3
                console.log(gender.value)
            }
        }
    }
    btnEdit.onclick = function(e) {
        e.preventDefault()
            // kiểm tra dữ liệu người dùng nhập vào  xem trùng hay không ( phone ,full name ,)
        if (fullname.value != '' && phone.value != '' && dateOfBirth.value != '' && address.value != '') {
            let formEdit = {
                fullName: fullname.value,
                address: address.value,
                phone: phone.value,
                birthday: dateOfBirth.value,
                gender: gender.value,
                status: 2
            }
            console.log(" nhập chính xác")
            patchProfileUser(idApi, formEdit)
        } else {
            console.log(" Vui lòng nhập đúng")
        }

    }
}
// xử lý khi status < 3 ( người dùng đã điền đầy đủ  thông tin cá nhân -> có thể sử dụng chức năng khác )
function renderInfoUser(idApi, users) {

    // get ra info người dùng
    fullname.value = users[idApi].fullName
    phone.value = users[idApi].phone
    avatar.value = users[idApi].avatar
    money.innerText = users[idApi].money
    dateOfBirth.value = users[idApi].birthday
    address.value = users[idApi].address
        // showsGender.value = users[idApi].gender
        // console.log(gender.value)
        //check xem giá trị của gender
    if (users[idApi].gender == 1) {
        showsGender.value = "Nam"
    }
    if (users[idApi].gender == 2) {
        showsGender.value = "Nữ"
    }
    if (users[idApi].gender == 3) {
        showsGender.value = "Khác"
    }
    handleBtnEdit(idApi)
}
// xử lý nút Edit khi người dùng ấn vào
function handleBtnEdit(idApi) {
    btnEdit.onclick = function() {

        fullname.classList.add("border-input")
        phone.classList.add("border-input")
        address.classList.add("border-input")
        dateOfBirth.classList.add("border-input")
            // xoá giới hạn của trỏ chuột
        pointerNone.forEach(element => {
            element.classList.remove(("pointer-none"))
        });
        // lấy giá trị value của gender
        for (let i = 0; i < gender.length; i++) {
            gender[i].onclick = function() {
                if (gender[i].value == 1) {
                    gender.value = 1
                }
                if (gender[i].value == 2) {
                    gender.value = 2
                }
                if (gender[i].value == 3) {
                    gender.value = 3
                }
            }
        }
        // đổi nút để lưu
        handleBtnSave(idApi)
    }
}
// xử lý nút Save khi người dùng ấn vào
function handleBtnSave(idApi) {
    let btnSave = $(".btn-edit-profile")
    btnSave.innerText = "Lưu"
    btnSave.onclick = function(e) {
        e.preventDefault()
            // kiểm tra dữ liệu người dùng nhập vào  xem trùng hay không ( phone ,full name ,)
        if (fullname.value != '' && phone.value != '' && dateOfBirth.value != '' && address.value != '') {
            let formEdit = {
                fullName: fullname.value,
                address: address.value,
                phone: phone.value,
                birthday: dateOfBirth.value,
                gender: gender.value,
                status: 2
            }
            console.log(" nhập chính xác")
            patchProfileUser(idApi, formEdit)
        } else {
            console.log(" Vui lòng nhập đúng")
        }
    }
}
// cập nhật status lên 2 và đưa thêm thông tin người dùng
function patchProfileUser(id, data) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(apiUser + '/' + id, options).then(function(response) {
        return response.json();
    }).then(function() {
        console.log("cập nhật thành công")
        location.assign("http://127.0.0.1:5501/profile.html")

    })
}

function handleAccount(idApi, users) {

    username.innerText = users[idApi].userName
    avatar = users[idApi].avatar
    password = users[idApi].passWord
    email = users[idApi].email
    money.innerText = users[idApi].money
    point = users[idApi].point
    createdAt = users[idApi].createdAt
    console.log(avatar)
    avatars.forEach(element => {
        element.src = avatar
    });
    let account = $('.profile__user-infor-account')
    account.onclick = function() {
        console.log("oke")
    }

}