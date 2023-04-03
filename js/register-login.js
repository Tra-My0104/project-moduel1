// Đăng Ký
let listRegister = JSON.parse(localStorage.getItem("listRegister"))
function registerBtn() {
    let inputMail = document.getElementById("mail").value;
    let ten = document.getElementById("name").value;
    let mk = document.getElementById("pass").value;
    let mk2 = document.getElementById(" againPass").value;
    let flag = false
    document.getElementById("mail").value = "";
    document.getElementById("name").value = "";
    document.getElementById("pass").value = "";
    document.getElementById(" againPass").value = "";
    let myRegister = {
        mail: inputMail,
        name: ten,
        pass: mk,
        passagain: mk2,
        trangthai: "Active"

    };
    if (listRegister == null) {
        listRegister = []
    }
    // bắt buộc nhập thông tin
    if (inputMail == "" || ten == "" || mk == "" || mk2 == "") {
        alert("mời nhập đủ thông tin")
        flag = false
        return;
    }
    // check điều kiện email
    /* Địa chỉ email phải chứa ít nhất dấu ‘@’ và dấu chấm(.).Ngoài ra, ‘@’ không được là ký tự đầu tiên 
của địa chỉ email và dấu chấm cuối cùng ít nhất phải là một ký tự sau dấu ‘@’. */
    // atpos : vị trí xuất hiện đầu tiên
    // dotpos : vị trí xuất hiện cuối cùng
    function testMail() {
        const atpos = inputMail.indexOf(`@`);
        const dotpos = inputMail.lastIndexOf(`.`);
        return atpos > 0 && dotpos > atpos + 1 && dotpos < inputMail.length - 1;
    }
    if (testMail('example@gmail.com')) {
        // console.log('Email hợp lệ');
        flag = true
    } else {
        alert("email không hợp lệ hãy nhập theo dạng abc@gmail.com");
        return;
        // console.log('Email không hợp lệ');
    }

    // check mail xem trùng không
    let checkMail = listRegister.find(
        check => check.mail == inputMail
    )
    if (checkMail) {
        alert("email đã tồn tại")
        flag = false
        return;
    }

    // ktra password
    if (mk != mk2) {
        alert("mật khẩu không trùng khớp")
        flag = false
        return;
    }
    // cho phép lưu giữ liệu nếu thỏa mãn điều kiện
    if (flag = true) {
        listRegister.push(myRegister)
        localStorage.setItem("listRegister", JSON.stringify(listRegister))
        // alert("đăng ký thành công")
        popR();
        setTimeout(() => { window.location.href = "signin.html"; }, 3000);

    }
    // chuyển sang trang đăng nhập
    if (flag = true && mk == mk2 && inputMail != "" || ten != "" || mk != "" || mk2 != "") {
        // popR();
        // setTimeout(() => { window.location.href = "signin.html"; }, 3000);
        // window.location.href = "signin.html"
    }
}



// Đăng nhập
let listLogin = JSON.parse(localStorage.getItem("listRegister"))
function loginBtn() {
    let inputLogin = document.getElementById("login").value;
    let inputPass = document.getElementById("pass").value;
    if (inputLogin == "tramyminxu@gmail.com" && inputPass == 10012004) {
        window.location.href = "../html/adminPage.html";
    }
    let checkLogin = listRegister.find(user => user.mail === inputLogin && user.pass === inputPass)
    // if (checkLogin){
    //     let loginSuccess=1;
    //     // console.log("1111");
    //     localStorage.setItem("loginSuccess",loginSuccess);
    //     localStorage.setItem("loginFlag", 1);

    //     popUp();
    //     setTimeout(() => { window.location.href = "index.html"; }, 3000);

    // } else{
    //     popUpF();
    //     // alert("đăng nhập thất bại kiểm tra thông tin dăng nhập");
    // }
    if (checkLogin) {
        if (checkLogin.trangthai === "Block") {
            const snackbar = document.createElement("div"); { }
            snackbar.classList.add("snackbar");
            snackbar.innerText = "Tài khoản bị khóa";
            document.body.appendChild(snackbar);
            setTimeout(() => {
                snackbar.remove();
            }, 3000);
        } else {
            localStorage.setItem("flaguser", inputLogin);
             // cờ để hiện đăng ký đăng nhập
            localStorage.setItem("loginFlag", 1);
            popUp();
            setTimeout(() => { window.location.href = "index.html"; }, 3000);
        }
    } else {
        popUpF();
        // alert("đăng nhập thất bại kiểm tra thông tin dăng nhập");
    }
}

function popUp() {
    var x = document.getElementById("snack-bar-login");
    document.getElementById("snack-bar-login").innerHTML = "đăng nhập thành công";
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}
// đăng nhập thất bại
function popUpF() {
    var x = document.getElementById("snack-bar-login");
    document.getElementById("snack-bar-login").innerHTML = "đăng nhập thất bại";
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

// chuyển đến trang đăng ký
function registerPage() {
    window.location.href = "register.html";
}
// chuyển từ trang chủ sang đăng nhập
function signinPage() {
    window.location.href = "signin.html";
}
// đăng ký thành công
function popR() {
    var x = document.getElementById("snack-bar-register");
    document.getElementById("snack-bar-register").innerHTML = "đăng ký thành công";
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}




