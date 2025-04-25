function addToCart(product) {
    const username = localStorage.getItem("currentUser");

    if (!username) {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
        return;
    }

    // Lấy size được chọn
    const selectedSize = document.querySelector('input[name="size"]:checked');
    if (!selectedSize) {
        alert("Vui lòng chọn size!");
        return;
    }
    const size = selectedSize.value;

    const cartKey = "cart_" + username;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Kiểm tra sản phẩm + size đã có trong giỏ chưa
    const existingItem = cart.find(item => item.id === product.id && item.size === size);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, size: size, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert(`Đã thêm vào giỏ hàng (Size ${size})!`);
}