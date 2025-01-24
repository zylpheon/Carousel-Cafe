// Untuk mendapatkan parameter URL
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1]);
}

// Pemetaan detail produk
const productDetails = {
  "chocolate-roll": {
    image: "image/product/chocolate-roll.jpg",
    title: "Chocolate Roll",
    description:
      "Roll cake cokelat dengan tekstur lembut dan rasa cokelat yang kaya. Dibuat dengan cokelat pilihan dan bahan-bahan berkualitas tinggi.",
    price: 99000,
  },
  "brownies": {
    image: "image/product/brownies.jpg",
    title: "Brownies",
    description:
      "Brownies klasik dengan tekstur lembut dan rasa cokelat yang kaya. Dibuat dengan cokelat pilihan dan bahan-bahan berkualitas tinggi.",
    price: 99000,
  },
  "milk-bread": {
    image: "image/product/milk-bread.jpg",
    title: "Milk Bread",
    description:
      "Roti lembut dengan rasa susu yang khas. Dibuat dengan bahan-bahan berkualitas tinggi dan teknik pembuatan roti yang teruji.",
    price: 99000,
  },
  "muffins": {
    image: "image/product/muffins.jpg",
    title: "Muffins",
    description:
      "Muffins lembut dengan rasa manis yang pas. Dibuat dengan bahan-bahan berkualitas tinggi dan teknik pembuatan muffins yang teruji.",
    price: 99000,
  },
  "honey-pancake": {
    image: "image/product/honey-pancake.jpg",
    title: "Honey Pancake",
    description:
      "Pancake lembut dengan rasa madu yang khas. Dibuat dengan bahan-bahan berkualitas tinggi dan teknik pembuatan pancake yang teruji.",
    price: 99000,
  },
  "ginger-bread": {
    image: "image/product/ginger-bread.jpg",
    title: "Ginger Bread",
    description:
      "Roti jahe dengan rasa jahe yang khas. Dibuat dengan bahan-bahan berkualitas tinggi dan teknik pembuatan roti yang teruji.",
    price: 95000,
  },
};

// Perbarui konten halaman ketika dokumen sudah siap
document.addEventListener("DOMContentLoaded", function () {
  // Dapatkan produk dari URL
  const product = getUrlParameter("product");

  // Periksa apakah produk ada di pemetaan kita
  if (productDetails[product]) {
    // Update image
    const imgElement = document.querySelector(".img-fluid");
    if (imgElement) {
      imgElement.src = productDetails[product].image;
      imgElement.alt = productDetails[product].title;
    }

    // Update title
    const titleElement = document.querySelector(".title-detail");
    if (titleElement) {
      titleElement.textContent = productDetails[product].title;
    }

    // Update description
    const descriptionElement =
      document.querySelectorAll(".isi-detail")[1];
    if (descriptionElement) {
      descriptionElement.textContent = productDetails[product].description;
    }

    // Update price
    const priceElement = document.querySelector(".isi-detail");
    if (priceElement) {
      priceElement.textContent = `Rp ${productDetails[
        product
      ].price.toLocaleString()}`;
    }

    // Update order button link
    const orderButton = document.querySelector(".btn-outline-warning");
    if (orderButton) {
      orderButton.onclick = function () {
        window.location.href = `order.html?product=${product}`;
      };
    }
  }
});
