// API Configuration
const API_URL = "https://puma-bold-grubworm.ngrok-free.app";

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
    console.log("Pre-warming ngrok connection in detail.js...");
    // Direct fetch with the header
    await fetchWithHeaders(`${API_URL}/`);
    console.log("Prewarming ngrok complete in detail.js");
  } catch (e) {
    console.log("Prewarming attempt failed in detail.js:", e);
  }
}

// Function to get URL parameter
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1]);
}

// Function to fetch product data from API
async function fetchProductData() {
  try {
    // Use fetchWithHeaders instead of regular fetch
    const response = await fetchWithHeaders(`${API_URL}/tampil`);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    // Get response as text first for debugging
    const responseText = await response.text();
    console.log("Response preview in detail.js:", responseText.substring(0, 100));
    
    try {
      const data = JSON.parse(responseText);
      
      if (data.status === 200 && Array.isArray(data.values)) {
        console.log(`Successfully fetched ${data.values.length} products in detail.js`);
        return data.values;
      } else {
        console.error("Invalid API response format in detail.js:", data);
        return [];
      }
    } catch (parseError) {
      console.error("Failed to parse JSON response in detail.js:", parseError);
      console.error("Response was:", responseText.substring(0, 500));
      return [];
    }
  } catch (error) {
    console.error("Error fetching products in detail.js:", error);
    return [];
  }
}

// Function to render product detail
async function renderProductDetail() {
  // Get product slug from URL
  const productSlug = getUrlParameter('product');
  
  if (!productSlug) {
    console.log("No product slug found in URL");
    return;
  }
  
  try {
    const products = await fetchProductData();
    
    // Find the product that matches the slug
    const product = products.find(item => {
      const slug = item.title.toLowerCase().replace(/\s+/g, '-');
      return slug === productSlug;
    });
    
    if (product) {
      // Update breadcrumb
      const categoryElement = document.querySelector('.breadcrumb-category');
      if (categoryElement) categoryElement.textContent = product.category;
      
      const activeElement = document.querySelector('.breadcrumb-item.active');
      if (activeElement) activeElement.textContent = product.title;
      
      // Update product image
      const imageElement = document.querySelector('.img-fluid.img-thumbnail');
      if (imageElement) {
        imageElement.src = product.image;
        imageElement.alt = product.title;
      }
      
      // Update product details
      const titleElement = document.querySelector('.no-select.isi-detail');
      if (titleElement) titleElement.textContent = product.title;
      
      const descriptionElement = document.querySelector('p.isi-detail');
      if (descriptionElement) {
        // Use description2 if available, otherwise use description1
        descriptionElement.textContent = product.description2 || product.description1;
      }
      
      const priceElement = document.querySelector('.text-warning.isi-detail');
      if (priceElement) {
        // Format price to Rupiah
        const formattedPrice = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        }).format(product.price);
        
        priceElement.textContent = formattedPrice;
      }
      
      // Render random recommendations
      renderRandomRecommendations(products, productSlug);
    } else {
      console.error("Product not found:", productSlug);
    }
  } catch (error) {
    console.error("Failed to render product detail:", error);
  }
}

// Function to render random recommendations
function renderRandomRecommendations(products, currentProductSlug) {
  if (!products || products.length === 0) return;
  
  // Filter out the current product
  const filteredProducts = products.filter(product => {
    const slug = product.title.toLowerCase().replace(/\s+/g, '-');
    return slug !== currentProductSlug;
  });
  
  // Shuffle the filtered products
  const shuffledProducts = [...filteredProducts].sort(() => 0.5 - Math.random());
  
  // Take the first 4 products (or less if there aren't enough)
  const recommendedProducts = shuffledProducts.slice(0, 4);
  
  // Get the recommendation container
  const recommendationContainer = document.querySelector('.recommendation-section .row');
  if (!recommendationContainer) return;
  
  // Clear existing recommendations
  recommendationContainer.innerHTML = '';
  
  // Add the random recommendations
  recommendedProducts.forEach((product, index) => {
    const productSlug = product.title.toLowerCase().replace(/\s+/g, '-');
    const recommendationItem = document.createElement('div');
    recommendationItem.className = 'col-sm-6 col-lg-3 mb-3';
    recommendationItem.setAttribute('data-aos', 'fade-up');
    
    if (index > 0) {
      recommendationItem.setAttribute('data-aos-duration', (600 + (index * 100)).toString());
    }
    
    recommendationItem.innerHTML = `
      <a href="detail.html?product=${productSlug}">
        <img
          src="${product.image}"
          class="img-fluid img-thumbnail"
          alt="${product.title}"
        />
      </a>
      <div class="text-center mt-2">
        <h5>${product.title}</h5>
      </div>
    `;
    
    recommendationContainer.appendChild(recommendationItem);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  preWarmNgrok();
  renderProductDetail();
});
