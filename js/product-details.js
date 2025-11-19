let products = [];

fetch("./data/product-details.json")
    .then(res => res.json())
    .then(data => {
        products = data.products;
        loadProductDetails();
    })
    .catch(err => console.log("Error loading JSON:", err));


// Copy Button
document.getElementById("copyBtn").addEventListener("click", function () {
    const text = document.getElementById("productList").innerText;

    navigator.clipboard.writeText(text).then(() => {
        const icon = document.getElementById("copyIcon");
        icon.classList.remove("fa-regular", "fa-copy");
        icon.classList.add("fa-solid", "fa-check");

        document.getElementById("copyText").innerText = "Copied!";

        setTimeout(() => {
            icon.classList.remove("fa-solid", "fa-check");
            icon.classList.add("fa-regular", "fa-copy");
            document.getElementById("copyText").innerText = "Copy List";
        }, 1000);
    });
});


// ----------  PRODUCT DATA ---------------
function loadProductDetails() {

    const id = new URLSearchParams(window.location.search).get("id");
    const product = products.find(p => p.id == id);

    if (!product) return;

    // SET TITLE
    document.getElementById("productTitle").innerText = product.title;

    // SET MAIN IMAGE
    document.getElementById("mainProductImg").src = product.mainImage;

    // SET PRODUCT LIST
    document.getElementById("productList").innerText = product.list;

    // SET THUMBNAILS
    const gallery = document.getElementById("thumbGallery");
    gallery.innerHTML = "";

    product.images.forEach((img, index) => {
        gallery.innerHTML += `
            <img class="thumb ${index === 0 ? 'active' : ''}" 
                 src="${img}" 
                 onclick="changeImage(this)">
        `;
    });
}


// CHANGE IMAGE
function changeImage(img) {
    document.getElementById("mainProductImg").src = img.src;

    document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
    img.classList.add("active");
}


// date add on the top
function loadProductDetails() {

    const id = new URLSearchParams(window.location.search).get("id");
    const product = products.find(p => p.id == id);
    if (!product) return;

    // TITLE
    document.getElementById("productTitle").innerText = product.title;

    // MAIN IMAGE
    document.getElementById("mainProductImg").src = product.mainImage;

    // FORMAT TODAY DATE (DD-MM-YYYY)
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const todayDate = `${day}-${month}-${year}`;

    // SET PRODUCT LIST WITH TODAY DATE ADDED AT TOP
    document.getElementById("productList").innerText =
        `${todayDate}\n\n${product.list}`;

    // THUMBNAILS
    const gallery = document.getElementById("thumbGallery");
    gallery.innerHTML = "";

    product.images.forEach((img, index) => {
        gallery.innerHTML += `
            <img class="thumb ${index === 0 ? "active" : ""}" 
                 src="${img}" 
                 onclick="changeImage(this)">
        `;
    });
}
