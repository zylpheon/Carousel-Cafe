import products from "./product.js";

//// LOGIN LOGIC ////
const loginForm = document.getElementById("loginForm");
const loginContainer = document.getElementById("loginContainer");
const adminContainer = document.getElementById("adminContainer");

loginForm.onsubmit = function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {
    loginContainer.style.display = "none";
    adminContainer.style.display = "block";
    renderProducts();
  } else {
    alert("Invalid credentials!");
  }
};

//// CRUD LOGIC ////
const productTableBody = document.getElementById("productTableBody");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const closeModal = document.querySelector(".close");
const productForm = document.getElementById("productForm");
const addProductBtn = document.getElementById("addProductBtn");

let editIndex = null;

// Render produk ke dalam tabel
function renderProducts() {
  productTableBody.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.description}</td>
      <td>${product.category}</td>
      <td>${
        product.image
          ? "<img src='" + product.image + "' width='50'/>"
          : "No Image"
      }</td>
      <td>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    productTableBody.appendChild(row);
  });
}

// Tampilkan modal
function showModal(edit = false) {
  modal.style.display = "flex";
  modalTitle.textContent = edit ? "Edit Product" : "Add Product";
}

// Tutup modal
closeModal.onclick = () => {
  modal.style.display = "none";
};

// Handle form tambah/edit
productForm.onsubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const fileInput = document.getElementById("imageUpload");
  let imageURL = "";

  // Jika ada file diunggah, buat URL object
  if (fileInput.files && fileInput.files[0]) {
    imageURL = URL.createObjectURL(fileInput.files[0]);
  }

  // Jika sedang dalam mode edit, update produk
  if (editIndex !== null) {
    products[editIndex] = {
      name,
      price,
      description,
      category,
      image: imageURL || products[editIndex].image,
    };
  } else {
    products.push({ name, price, description, category, image: imageURL });
  }

  modal.style.display = "none";
  renderProducts();
  productForm.reset();
  editIndex = null;
};

// Fungsi edit produk
window.editProduct = function (index) {
  editIndex = index;
  const product = products[index];

  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("description").value = product.description;
  document.getElementById("category").value = product.category;

  // Tidak mengisi file input karena alasan keamanan browser

  showModal(true);
};

// Fungsi hapus produk
window.deleteProduct = function (index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    renderProducts();
  }
};

// Buka modal untuk menambah produk baru
addProductBtn.onclick = () => {
  editIndex = null;
  productForm.reset();
  showModal(false);
};
