//     Checkout bill

window.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("currentUser");
    const cartKey = "cart_" + username;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const billContainer = document.getElementById("bill-container");

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const productDiv = document.createElement("div");
        productDiv.classList.add("mb-3");
        productDiv.innerHTML = `
        <div>
          <strong>${item.name}</strong> (Size: ${item.size})<br>
          Số lượng: ${item.quantity} <br>
          Giá: ${item.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})} <br>
          <strong>Tổng: ${itemTotal.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</strong>
        </div>
        <hr>
      `;
        billContainer.appendChild(productDiv);
    });

    const totalDiv = document.createElement("h5");
    totalDiv.innerHTML = `Tổng cộng: ${total.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}`;
    billContainer.appendChild(totalDiv);
});
//     Checkout form
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("checkoutForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Ngăn submit mặc định
        const isValid = validateForm();
        if (isValid) {
            // Lưu thông tin người đặt hàng
            const orderInfo = {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                note: document.getElementById("note").value,
                shipping: document.querySelector("input[name='shipping']:checked").value,
            };
            localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
            alert("Đặt hàng thành công!");
            const username = localStorage.getItem("currentUser");
            const cartKey = "cart_" + username;
            const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

            localStorage.setItem("billData", JSON.stringify(cart)); // Lưu hóa đơn
            localStorage.setItem("orderData", JSON.stringify(orderInfo)); // Lưu người đặt
            localStorage.removeItem(cartKey); // Xoá giỏ hàng sau khi đặt hàng
            window.location.href = "confirm.html";
        }
    });
});

function kiemTraHoTen(id, message) {
    const input = document.getElementById(id);
    const errorDiv = document.getElementById(id + "Error");
    const value = input.value.trim();

    const regex = /^[A-Za-zÀ-Ỹà-ỹ\s']+$/; // Cho phép chữ cái và dấu tiếng Việt

    if (!value) {
        errorDiv.innerText = message + " không được để trống.";
        input.classList.add("is-invalid");
        return false;
    } else if (!regex.test(value)) {
        errorDiv.innerText = message + " chỉ được chứa chữ cái.";
        input.classList.add("is-invalid");
        return false;
    } else {
        errorDiv.innerText = "";
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return true;
    }
}

function validateForm() {
    let isValid = true;

    // Các trường cần kiểm tra
    const fields = [
        { id: "firstName", message: "Vui lòng nhập họ" },
        { id: "lastName", message: "Vui lòng nhập tên" },
        { id: "email", message: "Vui lòng nhập email hợp lệ", type: "email" },
        { id: "phone", message: "Vui lòng nhập số điện thoại", type: "phone" },
        { id: "address", message: "Vui lòng nhập địa chỉ" },
        { id: "city", message: "Vui lòng chọn tỉnh/thành phố" },
    ];

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorDiv = document.getElementById(field.id + "Error");
        const value = input.value.trim();

        if (!value) {
            errorDiv.innerText = field.message;
            input.classList.add("is-invalid");
            isValid = false;
        } else {
            if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
                errorDiv.innerText = "Email không hợp lệ";
                input.classList.add("is-invalid");
                isValid = false;
            } else if (field.type === "phone" && !/^[0-9]{9,11}$/.test(value)) {
                errorDiv.innerText = "Số điện thoại không hợp lệ";
                input.classList.add("is-invalid");
                isValid = false;
            } else {
                errorDiv.innerText = "";
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
            }
        }
    });

    // Kiểm tra họ và tên
    const validHo = kiemTraHoTen("firstName", "Họ");
    const validTen = kiemTraHoTen("lastName", "Tên");
    if (!validHo || !validTen) {
        isValid = false;
    }

    // Kiểm tra checkbox đồng ý điều khoản
    const termsCheck = document.getElementById("termsCheck");
    const termsError = document.getElementById("termsError");
    if (!termsCheck.checked) {
        termsError.innerText = "Bạn cần đồng ý với điều khoản";
        termsCheck.classList.add("is-invalid");
        isValid = false;
    } else {
        termsError.innerText = "";
        termsCheck.classList.remove("is-invalid");
        termsCheck.classList.add("is-valid");
    }

    return isValid;
}