import products from "./product.js";

const productList = document.getElementById("product-list");
const filterButtons = document.querySelectorAll(".filter-button-group button");

document.addEventListener("DOMContentLoaded", () => {
  displayProducts("all");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    displayProducts(this.getAttribute("data-filter"));
  });
});

function displayProducts(filter) {
  productList.innerHTML = "";
  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  filteredProducts.forEach((product) => {
    const productHTML = `
      <div class="col-sm-6 col-lg-3 mb-4 product-item" data-aos="fade-up" data-category="${
        product.category
      }">
        <div class="card under-shadow3">
          <a href="${product.fullImage}" data-lightbox="${product.name.replace(
      /\s+/g,
      "-"
    )}" data-title="${product.name}">
            <img src="${product.image}" class="card-img-top" alt="${
      product.name
    }">
          </a>
          <div class="card-body">
            <h5 class="card-title text-center text-warning"><strong>${
              product.name
            }</strong></h5>
            <p class="card-text text-center">${product.description}</p>
            <h4 class="text-center text-warning mb-3">${product.price}</h4>
            <div class="d-flex justify-content-center">
              <a href="${
                product.link
              }" class="btn btn-outline-warning btn-lg">See More</a>
            </div>
          </div>
        </div>
      </div>
    `;
    productList.innerHTML += productHTML;
  });
}
