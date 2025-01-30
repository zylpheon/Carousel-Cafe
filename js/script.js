import products from "./product.js";

const productList = document.getElementById("product-list");

products.forEach((product) => {
  const productHTML = `
    <div class="col-sm-6 col-lg-4 mb-3" data-aos="fade-up" ${
      product.aosDuration ? `data-aos-duration="${product.aosDuration}"` : ""
    }>
      <div class="card">
        <a href="${product.fullImage}" data-lightbox="${product.name
    .toLowerCase()
    .replace(/\s+/g, "-")}" data-title="${product.name}">
          <img src="${product.image}" class="card-img-top" alt="${product.name
    .toLowerCase()
    .replace(/\s+/g, "-")}" />
        </a>
        <div class="card-body">
          <h5 class="card-title text-center text-warning">
            <strong>${product.name}</strong>
          </h5>
          <p class="card-text text-center">${product.description}</p>
          <h4 class="text-center text-warning mb-3">${product.price}</h4>
          <div class="d-flex justify-content-center">
            <a href="${
              product.link
            }" class="btn btn-outline-warning btn-lg" data-aos="zoom-in">See More</a>
          </div>
        </div>
      </div>
    </div>
  `;
  productList.innerHTML += productHTML;
});
