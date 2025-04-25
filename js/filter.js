// Filter San Pham
document.addEventListener("DOMContentLoaded", () => {
    const categoryFilter = document.getElementById("categoryFilter");
    const colorFilter = document.getElementById("colorFilter");
    const priceFilter = document.getElementById("priceFilter");
    const cards = document.querySelectorAll(".card");

    function filterProducts() {
        const category = categoryFilter.value;
        const color = colorFilter.value;
        const priceRange = priceFilter.value;

        cards.forEach(card => {
            const cardCategory = card.getAttribute("data-category");
            const cardColor = card.getAttribute("data-color");
            const cardPrice = parseInt(card.getAttribute("data-price")) || 0;

            let priceValid = true;

            if (priceRange.includes("-")) {
                const [min, max] = priceRange.split("-").map(Number);
                priceValid = cardPrice >= min && cardPrice <= max;
            } else if (priceRange === "3000000+") {
                priceValid = cardPrice > 3000000;
            } else if (priceRange && !priceRange.includes("-")) {
                priceValid = cardPrice < parseInt(priceRange);
            }

            const show =
                (category === "" || cardCategory === category) &&
                (color === "" || cardColor === color) &&
                priceValid;

            card.style.display = show ? "block" : "none";
        });
    }

    categoryFilter.addEventListener("change", filterProducts);
    colorFilter.addEventListener("change", filterProducts);
    priceFilter.addEventListener("change", filterProducts);
});