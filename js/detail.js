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

// Function to find product by slug
async function getProductBySlug(slug) {
  const products = await fetchProductData();
  
  // Find product where the slug matches the URL-friendly version of the title
  return products.find(product => {
    const productSlug = product.title.toLowerCase().replace(/\s+/g, '-');
    return productSlug === slug;
  });
}

// Update page content with product details
document.addEventListener("DOMContentLoaded", async function () {
  // Get product slug from URL
  const productSlug = getUrlParameter("product");
  
  if (!productSlug) {
    console.error("No product specified in URL");
    return;
  }
  
  // Get product data from API
  const product = await getProductBySlug(productSlug);
  
  if (product) {
    // Update image
    const imgElement = document.querySelector(".img-fluid.img-thumbnail");
    if (imgElement) {
      imgElement.src = product.image;
      imgElement.alt = product.title;
    }

    // Update title
    const titleElement = document.querySelector(".no-select.isi-detail");
    if (titleElement) {
      titleElement.textContent = product.title;
    }

    // Update description (use description2 if available, otherwise use description1)
    const descriptionElement = document.querySelector("p.isi-detail");
    if (descriptionElement) {
      descriptionElement.textContent = product.description2 || product.description1;
    }

    // Update price
    const priceElement = document.querySelector(".text-warning.isi-detail");
    if (priceElement) {
      // Format price to Rupiah
      const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(product.price);
      
      priceElement.textContent = formattedPrice;
    }

    // Update order button link
    const orderButton = document.querySelector(".btn-outline-warning");
    if (orderButton) {
      orderButton.onclick = function () {
        window.location.href = `order.html?product=${productSlug}`;
      };
    }

    // Update breadcrumb
    const breadcrumbCategory = document.querySelector(".breadcrumb-category");
    const breadcrumbItem = document.querySelector(".breadcrumb-item.active");

    if (breadcrumbCategory) {
      breadcrumbCategory.textContent = product.category;
    }

    if (breadcrumbItem) {
      breadcrumbItem.textContent = product.title;
    }
  } else {
    console.error("Product not found:", productSlug);
  }
});
