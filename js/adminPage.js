let listProduct = JSON.parse(localStorage.getItem("listProduct"));

// hàm đọc ảnh (không cần hiểu)
const myImage = document.getElementById("image");
// Lắng nghe sự kiện onchange của input
        const imageInput = document.getElementById("imgProduct");

          imageInput.onchange = function (event) {
        const file = event.target.files[0];

          // Đọc tệp ảnh và chuyển đổi nó thành dữ liệu URL
        const reader = new FileReader();
          reader.onload = function (event) {
        const dataUrl = event.target.result;

            // Thiết lập nguồn ảnh của đối tượng ảnh với dữ liệu URL
            myImage.src = dataUrl;

            // Lưu dữ liệu URL vào local storage
            localStorage.setItem("myImage", dataUrl);

            // // Hiển thị ảnh
            // imgElement.src = dataUrl;
          };
          reader.readAsDataURL(file);
      };
function addPage() { 
    
    let inputId = document.getElementById("ma").value;
    let inputName = document.getElementById("name").value;
    let inputPrice = document.getElementById("price").value;
    let inputSl = document.getElementById("sl").value;
    let inputImg = localStorage.getItem("myImage"); // khai báo 1 biến để lấy ảnh trên local về
    document.getElementById("ma").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("sl").value = "";
    let nameProduct = {
        ma: inputId,
        name: inputName,
        price: inputPrice,
        sl: inputSl,
        img: inputImg, // thêm 1 key có giá trị là ảnh lưu trên local
    }

    let flag = JSON.parse(localStorage.getItem("flag"));
    if (flag != null) {
        listProduct.splice(flag, 1, nameProduct);
        localStorage.removeItem("flag")
        localStorage.setItem("listProduct", JSON.stringify(listProduct))
        renderListProduct()
        return;
    }

    if (listProduct == null) {
        listProduct = []
        listProduct.push(nameProduct);
        localStorage.setItem("listProduct", JSON.stringify(listProduct))
    } else {
        listProduct.push(nameProduct);
        localStorage.setItem("listProduct", JSON.stringify(listProduct))
    }
    renderListProduct()
}
renderListProduct()
function renderListProduct() {
    // khai báo giá trị để search
    let valueSearch = document.getElementById("searchProduct").value;
    let result =
        `<tr>
        <td>ID</td>
        <td>Ảnh</td>
        <td>Tên</td>
        <td>Giá</td>
        <td>Số lượng</td>
        <td>Xóa</td>
        <td>Sửa</td>

    </tr>
    `
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    })
    for (i = 0; i < listProduct.length; i++) {
        // điều kiện để search
        if (listProduct[i].name.toLowerCase().includes(valueSearch.toLowerCase())) {
            let priceProduct = VND.format(listProduct[i].price)
            result +=
                `<tr>
        <td>${listProduct[i].ma}</td>
        <td><img src="${listProduct[i].img}" width="100px" height="100px" /></td>
        <td>${listProduct[i].name}</td>
        <td>${priceProduct}</td>
        <td>${listProduct[i].sl}</td>
        <td><button onclick="Delete(${i})"> Xóa </button> </td>
        <td><button onclick="Edit(${i})"> Sửa </button></td>
    </tr>
    `

        }
    }
    document.getElementById("table").innerHTML = result;
}
function Delete(id) {
    listProduct.splice(id, 1)
    localStorage.setItem("listProduct", JSON.stringify(listProduct))
    renderListProduct()
}
function Edit(id) {
    let newImg = localStorage.getItem("anhCuaMy"); // khai báo 1 biến để edit ảnh
    document.getElementById("ma").value = listProduct[id].ma;
    document.getElementById("name").value = listProduct[id].name;
    document.getElementById("price").value = listProduct[id].price;
    document.getElementById("sl").value = listProduct[id].sl;
    newImg = listProduct[id].img;     // gán biến cho biến edit
    localStorage.setItem("flag", id);
    // console.log(flag);
    renderListProduct()
}

