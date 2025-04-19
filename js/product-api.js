// API Configuration - only define if not already defined
if (typeof API_URL === 'undefined') {
  const API_URL = "https://puma-bold-grubworm.ngrok-free.app";
}

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
    console.log("Pre-warming ngrok connection in product-api.js...");
    // Direct fetch with the header
    await fetchWithHeaders(`${API_URL}/`);
    console.log("Prewarming ngrok complete in product-api.js");
  } catch (e) {
    console.log("Prewarming attempt failed in product-api.js:", e);
  }
}

// Function to fetch products from the API
async function fetchProducts() {
  try {
    // Add a loading indicator to the console
    console.log("Fetching products from API in product-api.js...");
    
    // Use fetchWithHeaders instead of regular fetch
    const response = await fetchWithHeaders(`${API_URL}/tampil`);
    
    // Log the response status
    console.log(`API Response Status in product-api.js: ${response.status}`);
    
    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    // Try to parse the response as JSON
    const text = await response.text();
    
    // Debug: Log the first 100 characters of the response
    console.log("Response preview in product-api.js:", text.substring(0, 100));
    
    try {
      const data = JSON.parse(text);
      
      if (data.status === 200 && Array.isArray(data.values)) {
        console.log(`Successfully fetched ${data.values.length} products in product-api.js`);
        return data.values;
      } else {
        console.error("Invalid API response format in product-api.js:", data);
        return [];
      }
    } catch (parseError) {
      console.error("Failed to parse JSON response in product-api.js:", parseError);
      console.error("Response was:", text.substring(0, 500)); // Show first 500 chars
      return [];
    }
  } catch (error) {
    console.error("Error fetching products in product-api.js:", error);
    
    // Show a more user-friendly error in the product list
    const productList = document.getElementById("product-list");
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

// Function to display products based on category filter
async function displayProducts(filter = 'all') {
  const productList = document.getElementById("product-list");
  if (!productList) return;
  
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
      
      products.forEach(product => {
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

// Set up category filter buttons
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-button-group button");
  if (!filterButtons.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener("click", function() {
      const selectedCategory = this.getAttribute("data-filter");
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
      
      // Update URL
      updateURL(selectedCategory);
      
      // Display filtered products
      displayProducts(selectedCategory);
    });
  });
}

// Update URL with selected category
function updateURL(category) {
  const newUrl = `${window.location.pathname}?category=${category}`;
  window.history.pushState({ path: newUrl }, "", newUrl);
}

// Handle browser back/forward navigation
window.addEventListener("popstate", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get("category") || "all";
  
  // Update active button
  setActiveFilterButton(selectedCategory);
  
  // Display products based on URL parameter
  displayProducts(selectedCategory);
});

// Set active filter button based on category
function setActiveFilterButton(category) {
  const filterButtons = document.querySelectorAll(".filter-button-group button");
  filterButtons.forEach(btn => btn.classList.remove("active"));
  
  const activeButton = document.querySelector(
    `.filter-button-group button[data-filter="${category}"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get category from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get("category") || "all";
  
  // Set active button
  setActiveFilterButton(selectedCategory);
  
  // Display products
  displayProducts(selectedCategory);
  
  // Set up filter buttons
  setupFilterButtons();
});