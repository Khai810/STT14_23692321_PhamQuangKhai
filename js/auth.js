// ==== XỬ LÝ LOGIN ====
function handleLoginForm() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;

            const userData = localStorage.getItem("user_" + username);

            if (!userData) {
                document.getElementById('login-message').innerText = "Tài khoản không tồn tại!";
                return;
            }

            const user = JSON.parse(userData);

            if (user.password === password) {
                localStorage.setItem("currentUser", username);
                window.location.href = "homepage.html"; // chuyển sau login
            } else {
                document.getElementById('login-message').innerText = "Sai mật khẩu!";
            }
        });
    }
}

// ==== HIỂN THỊ NAVBAR ====
function showUserOnNavbar() {
    const username = localStorage.getItem("currentUser");
    const authSection = document.getElementById("auth-section");

    if (authSection && username) {
        const userData = localStorage.getItem("user_" + username);
        if (userData) {
            const user = JSON.parse(userData);
            authSection.innerHTML = `
                <li class="nav-item1">
                    <span class="nav-link text-white">👋 Xin chào, ${user.fullname}</span>
                </li>
                <li class="nav-item1" style="margin-top: 5px;">
                    <a href="#" class="nav-link text-danger" onclick="logout()">Đăng xuất</a>
                </li>
            `;
        }
    }
}

// ==== LOGOUT ====
function logout() {
    localStorage.removeItem("currentUser");
    location.reload(); // hoặc window.location.href = "login.html";
}

// ==== GỌI KHI TẢI TRANG ====
window.addEventListener("DOMContentLoaded", () => {
    handleLoginForm(); // xử lý login nếu có form
    showUserOnNavbar(); // hiển thị tên nếu đã login
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("searchForm");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const keyword = document.getElementById("searchInput").value.trim();
        if (keyword !== "") {
            const encoded = encodeURIComponent(keyword);
            window.location.href = `shoppage.html?search=${encoded}`;
        }
    });
});