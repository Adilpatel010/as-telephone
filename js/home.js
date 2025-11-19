// Show Scroll Button on Scroll
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }
});

// Scroll to Top Function
scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("productGrid");

    // Load JSON file
    fetch("./data/product-main.json")
        .then(response => response.json())
        .then(data => {

            const products = data.products; // Get products from JSON

            products.forEach(product => {
                const box = `
                    <div class="product-box">
                        <a href="./product-details.html?id=${product.id}" class="product-link">
                            <img src="${product.image}" alt="${product.title}">
                        </a>

                        <div class="product-des">
                            <h3>${product.title}</h3>
                            <a href="./product-details.html?id=${product.id}" class="btn">View Details</a>
                        </div>
                    </div>
                `;
                grid.innerHTML += box;
            });

        })
        .catch(err => console.log("JSON Load Error:", err));

});
