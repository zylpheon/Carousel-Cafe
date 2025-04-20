// API Configuration
const API_URL = "https://puma-bold-grubworm.ngrok-free.app";

// Function to fetch products from the API
// Improve the fetchProducts function to better handle errors
async function fetchProducts() {
  try {
    console.log("Fetching products from API...");

    // Use fetchWithHeaders to ensure proper headers are sent
    const response = await fetchWithHeaders(`${API_URL}/tampil`);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    // Get response as text first for debugging
    const responseText = await response.text();
    console.log("Response preview:", responseText.substring(0, 100));

    try {
      // Parse the text as JSON
      const data = JSON.parse(responseText);

      if (data.status === 200 && Array.isArray(data.values)) {
        console.log(`Successfully fetched ${data.values.length} products`);
        return data.values;
      } else {
        console.error("Invalid API response format:", data);
        return [];
      }
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      console.error("Response was:", responseText.substring(0, 500)); // Show first 500 chars
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Helper function to add ngrok-skip-browser-warning header to all requests
async function fetchWithHeaders(url, options = {}) {
  // Ensure headers object exists
  if (!options.headers) {
    options.headers = {};
  }

  // Add ngrok skip header
  options.headers["ngrok-skip-browser-warning"] = "1";
  options.headers["Content-Type"] =
    options.headers["Content-Type"] || "application/json";

  // Add mode: 'cors' to explicitly request CORS
  options.mode = "cors";

  return fetch(url, options);
}

// Function to render featured products on the homepage with equal height cards
async function renderFeaturedProducts() {
  // Check if we're on the homepage
  if (
    !window.location.pathname.includes("index.html") &&
    window.location.pathname !== "/" &&
    window.location.pathname !== ""
  )
    return;

  const featuredContainer = document.querySelector(
    ".container-fluid.py-5 .row.mt-5.justify-content-center"
  );
  if (!featuredContainer) return;

  try {
    const products = await fetchProducts();
    // Take first 4 products for featured section
    const featuredProducts = products.slice(0, 4);

    if (featuredProducts.length > 0) {
      featuredContainer.innerHTML = "";

      featuredProducts.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.className = "col-sm-6 col-lg-3 mb-3";
        productCard.setAttribute("data-aos", "fade-up");

        if (index > 0) {
          productCard.setAttribute(
            "data-aos-duration",
            (600 + index * 50).toString()
          );
        }

        productCard.innerHTML = `
          <div class="card under-shadow2 h-100">
            <a href="${product.fullImage || product.image}" data-lightbox="${(
          product.name || product.title
        )
          .toLowerCase()
          .replace(/\s+/g, "-")}" data-title="${product.name || product.title}">
              <img src="${product.image}" class="card-img-top" alt="${
          product.name || product.title
        }">
            </a>
            <div class="card-body text-center d-flex flex-column">
              <h5 class="card-title text-warning">${
                product.name || product.title
              }</h5>
              <p class="card-text flex-grow-1">${
                product.description || product.description1
              }</p>
              <h4 class="text-warning mt-auto">Rp ${product.price}</h4>
            </div>
          </div>
        `;

        featuredContainer.appendChild(productCard);
      });
    }
  } catch (error) {
    console.error("Failed to render featured products:", error);
  }
}

// Function to get a single product by slug
async function getProductBySlug(slug) {
  const products = await fetchProducts();
  return products.find((product) => {
    const productSlug = product.name.toLowerCase().replace(/\s+/g, "-");
    return productSlug === slug;
  });
}

// Function to get products by category
async function getProductsByCategory(category) {
  const products = await fetchProducts();
  if (category === "all") {
    return products;
  }
  return products.filter((product) => product.category === category);
}

// Function to render products on the product page
async function renderProductsPage() {
  const productContainer = document.querySelector(".special-list");
  if (!productContainer) return;

  try {
    const products = await fetchProducts();

    if (products.length > 0) {
      productContainer.innerHTML = "";

      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "col-sm-6 col-lg-3 mb-4 product-item";
        productCard.setAttribute("data-category", product.category);
        productCard.setAttribute("data-aos", "fade-up");

        productCard.innerHTML = `
          <div class="card under-shadow2 h-100">
            <a href="${product.fullImage}" data-lightbox="${product.name
          .toLowerCase()
          .replace(/\s+/g, "-")}" data-title="${product.name}">
              <img src="${product.image}" class="card-img-top" alt="${
          product.name
        }">
            </a>
            <div class="card-body text-center d-flex flex-column">
              <h5 class="card-title text-warning">${product.name}</h5>
              <p class="card-text flex-grow-1">${product.description}</p>
              <h4 class="text-warning mt-2">Rp ${product.price}</h4>
              <a href="${
                product.link
              }" class="btn btn-outline-warning mt-3">View Details</a>
            </div>
          </div>
        `;

        productContainer.appendChild(productCard);
      });
    }
  } catch (error) {
    console.error("Failed to render products page:", error);
  }
}

// Function to render product details on the detail page
async function renderProductDetail() {
  // Check if we're on the detail page
  if (!window.location.pathname.includes("detail.html")) return;

  // Get product slug from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productSlug = urlParams.get("product");

  if (!productSlug) return;

  try {
    const product = await getProductBySlug(productSlug);

    if (product) {
      // Update breadcrumb
      const categoryElement = document.querySelector(".breadcrumb-category");
      if (categoryElement) categoryElement.textContent = product.category;

      const activeElement = document.querySelector(".breadcrumb-item.active");
      if (activeElement) activeElement.textContent = product.name;

      // Update product image
      const imageElement = document.querySelector(".img-fluid.img-thumbnail");
      if (imageElement) imageElement.src = product.fullImage;

      // Update product details
      const titleElement = document.querySelector(".no-select.isi-detail");
      if (titleElement) titleElement.textContent = product.name;

      const descriptionElement = document.querySelector("p.isi-detail");
      if (descriptionElement) {
        // Use description2 if available, otherwise use description1
        descriptionElement.textContent =
          product.apiData.description2 || product.description;
      }

      const priceElement = document.querySelector(".text-warning.isi-detail");
      if (priceElement) priceElement.textContent = `Rp ${product.price}`;
    }
  } catch (error) {
    console.error("Failed to render product detail:", error);
  }
}

// Function to handle category filtering on the product page
function setupCategoryFilters() {
  const filterButtons = document.querySelectorAll(
    ".filter-button-group button"
  );
  if (!filterButtons.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter products
      const productItems = document.querySelectorAll(".product-item");
      productItems.forEach((item) => {
        if (
          category === "all" ||
          item.getAttribute("data-category") === category
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Render products based on current page
  renderProductsPage();
  renderProductDetail();
  renderFeaturedProducts();

  // Setup category filters
  setupCategoryFilters();
});

// Export functions for use in other scripts if needed
export { fetchProducts, getProductBySlug, getProductsByCategory };
