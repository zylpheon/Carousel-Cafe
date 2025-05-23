// API Configuration
const API_URL = "https://puma-bold-grubworm.ngrok-free.app";

const productList = document.getElementById("product-list");
const filterButtons = document.querySelectorAll(".filter-button-group button");

// Helper function to add ngrok-skip-browser-warning header to all requests
async function fetchWithHeaders(url, options = {}) {
  // Ensure headers object exists
  if (!options.headers) {
    options.headers = {};
  }

  // Add ngrok skip header
  options.headers["ngrok-skip-browser-warning"] = "1";
  options.headers["Content-Type"] = options.headers["Content-Type"] || "application/json";
  
  // Add mode: 'cors' to explicitly request CORS
  options.mode = 'cors';
  
  return fetch(url, options);
}

// Pre-warm ngrok connection
async function preWarmNgrok() {
  try {
    console.log("Pre-warming ngrok connection...");
    // Direct fetch with the header
    await fetchWithHeaders(`${API_URL}/`);
    console.log("Prewarming ngrok complete");
  } catch (e) {
    console.log("Prewarming attempt failed:", e);
  }
}

// Function to fetch products from the API
async function fetchProducts() {
  try {
    console.log("Fetching products from API...");
    
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
    
    // Show error in product list
    if (productList) {
      productList.innerHTML = `
        <div class="col-12 text-center py-5">
          <h3>Unable to connect to the server</h3>
          <p>Please check your connection and try again later</p>
          <p class="text-muted small">Error: ${error.message}</p>
          <button class="btn btn-warning mt-3" onclick="location.reload()">Try Again</button>
        </div>
      `;
    }
    
    return [];
  }
}

// Function to get products by category
async function getProductsByCategory(category) {
  const products = await fetchProducts();
  if (category === 'all') {
    return products;
  }
  return products.filter(product => product.category === category);
}

document.addEventListener("DOMContentLoaded", async () => {
  // Pre-warm the ngrok connection
  await preWarmNgrok();
  
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get("category") || "all";

  setActiveFilterButton(selectedCategory);
  await displayProducts(selectedCategory);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const selectedCategory = this.getAttribute("data-filter");
    updateURL(selectedCategory);
    setActiveFilterButton(selectedCategory);
    displayProducts(selectedCategory);
  });
});

window.addEventListener("popstate", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get("category") || "all";
  setActiveFilterButton(selectedCategory);
  displayProducts(selectedCategory);
});

async function displayProducts(filter) {
  // Show loading spinner
  productList.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  
  try {
    const products = await getProductsByCategory(filter);
    
    if (products.length > 0) {
      productList.innerHTML = '';
      
      products.forEach((product) => {
        // Create URL-friendly slug from title
        const slug = product.title.toLowerCase().replace(/\s+/g, '-');
        
        // Format price to Rupiah
        const formattedPrice = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        }).format(product.price);
        
        const productHTML = `
          <div class="col-sm-6 col-lg-3 mb-4 product-item" data-aos="fade-up" data-category="${product.category}">
            <div class="card under-shadow3">
              <a href="${product.image}" data-lightbox="${slug}" data-title="${product.title}">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
              </a>
              <div class="card-body">
                <h5 class="card-title text-center text-warning"><strong>${product.title}</strong></h5>
                <p class="card-text text-center">${product.description1}</p>
                <h4 class="text-center text-warning mb-3">${formattedPrice}</h4>
                <div class="d-flex justify-content-center">
                  <a href="detail.html?product=${slug}" class="btn btn-outline-warning btn-lg">See More</a>
                </div>
              </div>
            </div>
          </div>
        `;
        productList.innerHTML += productHTML;
      });
    } else {
      productList.innerHTML = `
        <div class="col-12 text-center py-5">
          <h3>No products found</h3>
        </div>
      `;
    }
  } catch (error) {
    console.error("Failed to display products:", error);
    productList.innerHTML = `
      <div class="col-12 text-center py-5">
        <h3>Error loading products</h3>
        <p>Please try again later</p>
      </div>
    `;
  }
}

function setActiveFilterButton(category) {
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  const activeButton = document.querySelector(
    `.filter-button-group button[data-filter="${category}"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

function updateURL(category) {
  const newUrl = `${window.location.pathname}?category=${category}`;
  window.history.pushState({ path: newUrl }, "", newUrl);
}
