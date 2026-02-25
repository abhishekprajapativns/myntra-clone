// BAG STATE

let bag = JSON.parse(localStorage.getItem("bag")) || [];

const bagButtons = document.querySelectorAll(".bag-btn");
const navBagBtn = document.getElementById("bag-btn");

// HELPERS

function saveBag() {
  localStorage.setItem("bag", JSON.stringify(bag));
  updateBagCount();
}

function getNumericPrice(price) {
  return parseInt(price.replace(/[^0-9]/g, ""));
}

function updateBagCount() {
  const total = bag.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".bag-count").forEach((el) => {
    el.innerText = total;
  });
}

updateBagCount();

// ADD TO BAG

bagButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".product-card");
    const id = card.dataset.id; // HTML me data-id lagao
    const name = card.querySelector("h3").innerText;
    const price = card.querySelector(".price").innerText;
    const img = card.querySelector("img").src;

    const index = bag.findIndex((p) => p.id === id);

    if (index === -1) {
      bag.push({ id, name, price, img, quantity: 1 });
    } else {
      bag[index].quantity++;
    }

    saveBag();
  });
});

// MODAL CONTROL

navBagBtn.addEventListener("click", () => {
  renderBag();
  document.getElementById("bagModal").classList.add("active");
  document.body.style.overflow = "hidden";
});

function closeBag() {
  document.getElementById("bagModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

document.getElementById("bagModal").addEventListener("click", function (e) {
  if (e.target === this) closeBag();
});

// RENDER BAG

function renderBag() {
  const grid = document.getElementById("bagModalGrid");
  const empty = document.getElementById("bagEmpty");
  const totalEl = document.getElementById("bagTotal");

  grid.innerHTML = "";

  if (!bag.length) {
    empty.style.display = "block";
    grid.style.display = "none";
    totalEl.innerHTML = "";
    return;
  }

  empty.style.display = "none";
  grid.style.display = "block";

  let total = 0;

  bag.forEach((product) => {
    const price = getNumericPrice(product.price);
    total += price * product.quantity;

    const item = document.createElement("div");
    item.className = "bag-item";
    item.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <div class="bag-item-info">
        <h4>${product.name}</h4>
        <p>${product.price}</p>
        <div class="qty-controls">
          <button onclick="updateQuantity('${product.id}', -1)">−</button>
          <span>${product.quantity}</span>
          <button onclick="updateQuantity('${product.id}', 1)">+</button>
        </div>
      </div>
      <button onclick="removeItem('${product.id}')">✕</button>
    `;
    grid.appendChild(item);
  });

  totalEl.innerHTML = `
    <div class="bag-total-row">
      <span>Total:</span>
      <span>₹${total.toLocaleString()}</span>
    </div>
    <button onclick="openCheckout()">Proceed to Checkout →</button>
  `;
}

// QUANTITY & REMOVE

function updateQuantity(id, change) {
  const index = bag.findIndex((p) => p.id === id);
  if (index === -1) return;

  bag[index].quantity += change;

  if (bag[index].quantity <= 0) {
    bag.splice(index, 1);
  }

  saveBag();
  renderBag();
}

function removeItem(id) {
  bag = bag.filter((p) => p.id !== id);
  saveBag();
  renderBag();
}

// CHECKOUT (Same Logic)

function openCheckout() {
  closeBag();
  document.getElementById("checkoutModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("active");
  document.body.style.overflow = "auto";
}
