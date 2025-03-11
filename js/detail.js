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
    image: "image/product/blueberry-muffin.jpg",
    title: "Blueberry Muffin",
    description:
      "A delicious muffin with rich blueberry flavor, soft and crispy texture.",
    price: 99000,
    category: "Cakes",
  },
  "blueberry-roll": {
    image: "image/product/blueberry-roll.jpg",
    title: "Blueberry Roll",
    description:
      "A soft roll cake filled with fresh and sweet blueberry filling.",
    price: 99000,
    category: "Cakes",
  },
  brownies: {
    image: "image/product/brownies.jpg",
    title: "Brownies",
    description: "Classic fudgy brownies with rich chocolate flavor.",
    price: 99000,
    category: "Cakes",
  },
  "cheese-cake": {
    image: "image/product/cheese-cake.jpg",
    title: "Cheese Cake",
    description:
      "Our cheesecake is a rich, creamy delight with a smooth texture and a perfectly buttery crust that tantalizes your taste buds with each bite. The subtle tanginess of the cream cheese is balanced by a hint of sweetness, making it a versatile dessert for any occasion.This classic treat is meticulously crafted to deliver a luxurious mouthfeel that melts in your mouth. Whether enjoyed on its own or paired with a fresh fruit compote, our cheesecake promises a memorable experience that celebrates the art of dessert making.",
    price: 99000,
    category: "Cakes",
  },
  "cheese-chiffon": {
    image: "image/product/cheese-chiffon.jpg",
    title: "Cheese Chiffon",
    description:
      "Our Cheese Chiffon cake is a light and airy creation that infuses the subtle savory flavor of cheese into a sweet, delicate sponge. The soft, moist crumb pairs wonderfully with the mild tang of cheese, resulting in a unique taste that’s both refreshing and indulgent. Expertly baked to achieve the perfect balance, this chiffon cake offers a texture that is as smooth as it is fluffy. It’s an innovative twist on traditional cakes that promises a delightful and unexpected flavor experience for those looking to explore something new.",
    price: 99000,
    category: "Cakes",
  },
  "chocolate-mousse": {
    image: "image/product/chocolate-mousse.jpg",
    title: "Chocolate Mousse",
    description:
      "Light and soft chocolate mousse with an intense chocolate taste.",
    price: 99000,
    category: "Cakes",
  },
  "chocolate-muffin": {
    image: "image/product/chocolate-muffin.jpg",
    title: "Chocolate Muffin",
    description:
      "Delicious chocolate muffin with a soft texture and rich chocolate taste.",
    price: 99000,
    category: "Cakes",
  },
  "chocolate-roll": {
    image: "image/product/chocolate-roll.jpg",
    title: "Chocolate Roll",
    description: "Soft chocolate roll cake with a rich chocolate filling.",
    price: 99000,
    category: "Cakes",
  },
  donut: {
    image: "image/product/donut.jpg",
    title: "Donut",
    description: "Soft donut with sweet and tempting toppings.",
    price: 99000,
    category: "Pastries",
  },
  fudge: {
    image: "image/product/fudge.jpg",
    title: "Fudge",
    description: "Soft chocolate fudge with a rich taste.",
    price: 99000,
    category: "Pastries",
  },
  gingerbread: {
    image: "image/product/gingerbread.jpg",
    title: "Ginger Bread",
    description:
      "Gingerbread with a distinctive spicy aroma and delicious taste.",
    price: 99000,
    category: "Cookies",
  },
  "honey-pancake": {
    image: "image/product/honey-pancake.jpg",
    title: "Honey Pancake",
    description: "Soft pancakes with a naturally sweet honey flavor.",
    price: 99000,
    category: "Pastries",
  },
  "milk-bread": {
    image: "image/product/milk-bread.jpg",
    title: "Milk Bread",
    description: "Soft milk bread with the perfect sweet taste.",
    price: 99000,
    category: "Breads",
  },
  muffin: {
    image: "image/product/muffin.jpg",
    title: "Muffin",
    description: "Delicious muffins with various delightful flavors.",
    price: 99000,
    category: "Pastries",
  },
  "orange-roll": {
    image: "image/product/orange-roll.jpg",
    title: "Orange Roll",
    description: "Soft roll cake with a unique fresh orange flavor.",
    price: 99000,
    category: "Cakes",
  },
  "pandan-chiffon": {
    image: "image/product/pandan-chiffon.jpg",
    title: "Pandan Chiffon",
    description:
      "Chiffon cake with a distinctive pandan aroma and soft texture.",
    price: 99000,
    category: "Cakes",
  },
  "strawberry-roll": {
    image: "image/product/strawberry-roll.jpg",
    title: "Strawberry Roll",
    description: "Roll cake with a fresh and sweet strawberry flavor.",
    price: 99000,
    category: "Cakes",
  },
  "vanilla-chiffon": {
    image: "image/product/vanilla-chiffon.jpg",
    title: "Vanilla Chiffon",
    description: "Chiffon cake with a soft and fragrant vanilla taste.",
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

    // Update breadcrumb
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
