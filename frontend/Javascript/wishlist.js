// ===============================
// WISHLIST — COMPLETE WITH LOCALSTORAGE
// ===============================

// localStorage se load karo
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistButtons = document.querySelectorAll(".wishlist-btn");
const wishlistCount = document.querySelector(".wishlist-count");

// ===============================
// PAGE LOAD PE — SAVED BUTTONS HIGHLIGHT KARO
// ===============================
wishlistButtons.forEach((button, index) => {
  const id = String(index + 1);
  if (wishlist.find((p) => p.id === id)) {
    button.innerText = "❤️ Wishlisted";
    button.classList.add("active");
  }
});

wishlistCount.innerText = wishlist.length;

// ===============================
// PRODUCT BUTTONS — ADD / REMOVE
// ===============================
wishlistButtons.forEach((button, index) => {
  button.addEventListener("click", function () {
    const productCard = this.closest(".product-card");
    const productName = productCard.querySelector("h3").innerText;
    const productPrice = productCard.querySelector(".price").innerText;
    const productImg = productCard.querySelector("img").src;
    const id = String(index + 1);

    const alreadyAdded = wishlist.findIndex((p) => p.id === id);

    if (alreadyAdded === -1) {
      // ADD
      const product = {
        id: id,
        name: productName,
        price: productPrice,
        img: productImg,
      };
      wishlist.push(product);
      this.innerText = "❤️ Wishlisted";
      this.classList.add("active");
    } else {
      // REMOVE (toggle)
      wishlist.splice(alreadyAdded, 1);
      this.innerText = "Wishlist";
      this.classList.remove("active");
    }

    wishlistCount.innerText = wishlist.length;
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  });
});

// ===============================
// NAVBAR WISHLIST BUTTON — MODAL OPEN
// ✅ id se directly dhundha — [1] nahi
// ===============================
const navWishlistBtn = document.getElementById("wishlist-btn");

navWishlistBtn.addEventListener("click", function () {
  renderWishlistModal();
  document.getElementById("wishlistModal").classList.add("active");
  document.body.style.overflow = "hidden";
});

// ===============================
// MODAL CLOSE
// ===============================
function closeWishlistModal() {
  document.getElementById("wishlistModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

document
  .getElementById("wishlistModal")
  .addEventListener("click", function (e) {
    if (e.target === this) closeWishlistModal();
  });

// ===============================
// MODAL MEIN PRODUCTS DIKHAO
// ===============================
function renderWishlistModal() {
  const grid = document.getElementById("wishlistModalGrid");
  const empty = document.getElementById("wishlistEmpty");

  grid.innerHTML = "";

  document.querySelectorAll(".wishlist-count").forEach((el) => {
    el.innerText = wishlist.length;
  });

  if (wishlist.length === 0) {
    empty.style.display = "block";
    grid.style.display = "none";
    return;
  }

  empty.style.display = "none";
  grid.style.display = "grid";

  wishlist.forEach((product) => {
    const item = document.createElement("div");
    item.className = "wishlist-modal-item";
    item.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <div class="wm-info">
        <h4>${product.name}</h4>
        <p class="wm-price">${product.price}</p>
      </div>
      <button class="wm-remove-btn" onclick="removeItem('${product.id}')">✕</button>
    `;
    grid.appendChild(item);
  });
}

// ===============================
// REMOVE FROM WISHLIST
// ===============================
function removeItem(id) {
  wishlist = wishlist.filter((p) => p.id !== String(id));

  wishlistCount.innerText = wishlist.length;
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  renderWishlistModal();

  // Card ka button bhi reset karo
  wishlistButtons.forEach((btn, index) => {
    if (String(index + 1) === id) {
      btn.innerText = "Wishlist";
      btn.classList.remove("active");
    }
  });
}
