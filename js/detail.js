// Untuk mendapatkan parameter URL
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1]);
}

// Pemetaan detail produk
const productDetails = {
  "blueberry-muffin": {
    image: "blueberry-muffin.jpg",
    title: "Blueberry Muffin",
    description:
      "Muffin yang lezat dengan rasa blueberry yang kaya, dengan tekstur yang lembut dan renyah.",
    price: 99000,
    category: "Cakes",
  },
  "blueberry-roll": {
    image: "blueberry-roll.jpg",
    title: "Blueberry Roll",
    description:
      "Roll yang lezat dengan rasa blueberry yang kaya, dengan tekstur yang lembut dan renyah.",
    price: 99000,
    category: "Cakes",
  },
  "chocolate-muffin": {
    image: "chocolate-muffin.jpg",
    title: "Chocolate Muffin",
    description:
      "Muffin yang lezat dengan rasa coklat yang kaya, dengan tekstur yang lembut dan renyah.",
    price: 99000,
    category: "Cakes",
  },
  "chocolate-roll": {
    image: "image/product/chocolate-roll.jpg",
    title: "Chocolate Roll",
    description:
      "Roll cake cokelat dengan tekstur lembut dan rasa cokelat yang kaya. Dibuat dengan cokelat pilihan dan bahan-bahan berkualitas tinggi.",
    price: 99000,
    category: "Cakes",
  },
  brownies: {
    image: "image/product/brownies.jpg",
    title: "Brownies",
    description:
      "Brownies klasik dengan tekstur lembut dan rasa cokelat yang kaya. Dibuat dengan cokelat pilihan dan bahan-bahan berkualitas tinggi.",
    price: 99000,
    category: "Pastries",
  },
  "milk-bread": {
    image: "image/product/milk-bread.jpg",
    title: "Milk Bread",
    description:
      "Roti lembut dengan rasa susu yang khas. Dibuat dengan bahan-bahan berkualitas tinggi dan teknik pembuatan roti yang teruji.",
    price: 99000,
    category: "Bread",
  },
  muffins: {
    image: "image/product/muffin.jpg",
    title: "Muffins",
    description:
      "Muffins lembut dengan rasa manis yang pas. Dibuat dengan bahan-bahan berkualitas tinggi dan teknik pembuatan muffins yang teruji.",
    price: 99000,
    category: "Cakes",
  },
  "honey-pancake": {
    image: "image/product/honey-pancake.jpg",
    title: "Honey Pancake",
    description:
      "Pancake lembut dengan rasa madu yang khas. Dibuat dengan bahan-bahan berkualitas tinggi dan teknik pembuatan pancake yang teruji.",
    price: 99000,
    category: "Cakes",
  },
  "ginger-bread": {
    image: "image/product/gingerbread.jpg",
    title: "Ginger Bread",
    description:
      "Roti jahe dengan rasa jahe yang khas. Dibuat dengan bahan-bahan berkualitas tinggi dan teknik pembuatan roti yang teruji.",
    price: 99000,
    category: "Cookies",
  },
  donut: {
    image: "image/product/donut.jpg",
    title: "Donut",
    description:
      "Donut lembut dengan rasa manis yang pas. Dibuat dengan bahan-bahan berkualitas tinggi dan teknik pembuatan donut yang teruji.",
    price: 99000,
    category: "Pastries",
  },
  fudge: {
    image: "image/product/fudge.jpg",
    title: "Fudge",
    description:
      "Fudge lembut dengan rasa cokelat yang khas. Dibuat dengan bahan-bahan berkualitas tinggi dan teknik pembuatan fudge yang teruji.",
    price: 99000,
    category: "Pastries",
  },
  "strawberry-roll": {
    image: "image/product/strawberry-roll.jpg",
    title: "Strawberry Roll",
    description:
      "Roti strawberry dengan rasa strawberry yang khas. Dibuat dengan bahan-bahan berkualitas tinggi dan teknik pembuatan roti yang teruji.",
    price: 99000,
    category: "Cakes",
  },
  "orange-roll": {
    image: "image/product/orange-roll.jpg",
    title: "Orange Roll",
    description:
      "Roti jeruk dengan rasa jeruk yang khas. Dibuat dengan bahan-bahan berkualitas tinggi dan teknik pembuatan roti yang teruji.",
    harga: 99000,
    category: "Cakes",
  },
  "cheese-chiffon": {
    image: "image/product/cheese-chiffon.jpg",
    title: "Cheese Chiffon",
    description:
      "Cheese Chiffon dengan rasa keju yang khas. Dibuat denganbahan-bahan berkualitas tinggi dan teknik pembuatan roti yang teruji",
    price: 99000,
    category: "Cakes",
  },
  "pandan-chiffon": {
    image: "image/product/pandan-chiffon.jpg",
    title: "Pandan Chiffon",
    description:
      "Pandan Chiffon dengan rasa keju yang khas. Dibuat denganbahan-bahan berkualitas tinggi dan teknik pembuatan roti yang teruji",
    price: 99000,
    category: "Cakes",
  },
  "vanilla-chiffon": {
    image: "image/product/vanilla-chiffon.jpg",
    title: "Vanilla Chiffon",
    description:
      "Vanilla Chiffon dengan rasa keju yang khas. Dibuat denganbahan-bahan berkualitas tinggi dan teknik pembuatan roti yang teruji",
    price: 99000,
    category: "Cakes",
  },
};

// Perbarui konten halaman ketika dokumen sudah siap
document.addEventListener("DOMContentLoaded", function () {
  // Dapatkan produk dari URL
  const product = getUrlParameter("product");

  // Periksa apakah produk ada di pemetaan kita
  if (productDetails[product]) {
    const productData = productDetails[product];

    // Update image
    const imgElement = document.querySelector(".img-fluid");
    if (imgElement) {
      imgElement.src = productData.image;
      imgElement.alt = productData.title;
    }

    // Update title
    const titleElement = document.querySelector(".title-detail");
    if (titleElement) {
      titleElement.textContent = productData.title;
    }

    // Update description
    const descriptionElement = document.querySelectorAll(".isi-detail")[1];
    if (descriptionElement) {
      descriptionElement.textContent = productData.description;
    }

    // Update price
    const priceElement = document.querySelector(".isi-detail");
    if (priceElement) {
      priceElement.textContent = `Rp ${productData.price.toLocaleString()}`;
    }

    // Update order button link
    const orderButton = document.querySelector(".btn-outline-warning");
    if (orderButton) {
      orderButton.onclick = function () {
        window.location.href = `order.html?product=${product}`;
      };
    }

    // **Update breadcrumb**
    const breadcrumbCategory = document.querySelector(".breadcrumb-category");
    const breadcrumbItem = document.querySelector(".breadcrumb-item.active");

    if (breadcrumbCategory) {
      breadcrumbCategory.textContent = productData.category;
    }

    if (breadcrumbItem) {
      breadcrumbItem.textContent = productData.title;
    }
  } else {
    console.error("Produk tidak ditemukan!");
  }
});
