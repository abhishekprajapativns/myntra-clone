// ===============================
// BAG SYSTEM
// ===============================

let bag = JSON.parse(localStorage.getItem("bag")) || [];

const bagButtons = document.querySelectorAll(".bag-btn");
const navBagBtn = document.getElementById("bag-btn");

// ===============================
// COUNT UPDATE
// ===============================
function updateBagCount() {
  const total = bag.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".bag-count").forEach((el) => {
    el.innerText = total;
  });
}

updateBagCount();

// ===============================
// PRODUCT BUTTONS — ADD TO BAG
// ===============================
bagButtons.forEach((button, index) => {
  button.addEventListener("click", function () {
    const productCard = this.closest(".product-card");
    const productName = productCard.querySelector("h3").innerText;
    const productPrice = productCard.querySelector(".price").innerText;
    const productImg = productCard.querySelector("img").src;
    const id = String(index + 1);

    const alreadyAdded = bag.findIndex((p) => p.id === id);

    if (alreadyAdded === -1) {
      bag.push({
        id,
        name: productName,
        price: productPrice,
        img: productImg,
        quantity: 1,
      });
    } else {
      bag[alreadyAdded].quantity += 1;
    }

    localStorage.setItem("bag", JSON.stringify(bag));
    updateBagCount();
  });
});

// ===============================
// NAVBAR BAG BUTTON
// ===============================
navBagBtn.addEventListener("click", function () {
  renderBagModal();
  document.getElementById("bagModal").classList.add("active");
  document.body.style.overflow = "hidden";
});

// ===============================
// BAG MODAL CLOSE
// ===============================
function closeBagModal() {
  document.getElementById("bagModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

document.getElementById("bagModal").addEventListener("click", function (e) {
  if (e.target === this) closeBagModal();
});

// ===============================
// BAG MODAL RENDER
// ===============================
function renderBagModal() {
  const grid = document.getElementById("bagModalGrid");
  const empty = document.getElementById("bagEmpty");
  const totalEl = document.getElementById("bagTotal");

  grid.innerHTML = "";
  updateBagCount();

  if (bag.length === 0) {
    empty.style.display = "block";
    grid.style.display = "none";
    totalEl.innerHTML = "";
    return;
  }

  empty.style.display = "none";
  grid.style.display = "block";

  let total = 0;

  bag.forEach((product) => {
    const price = parseInt(product.price.replace(/[^0-9]/g, ""));
    total += price * product.quantity;

    const item = document.createElement("div");
    item.className = "bag-item";
    item.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <div class="bag-item-info">
        <h4>${product.name}</h4>
        <p>${product.price}</p>
        <div class="qty-controls">
          <button onclick="decreaseQty('${product.id}')">−</button>
          <span>${product.quantity}</span>
          <button onclick="increaseQty('${product.id}')">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromBag('${product.id}')">✕</button>
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

// ===============================
// CHECKOUT OPEN / CLOSE
// ===============================
function openCheckout() {
  closeBagModal();
  goToAddress();
  document.getElementById("checkoutModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

document
  .getElementById("checkoutModal")
  .addEventListener("click", function (e) {
    if (e.target === this) closeCheckoutModal();
  });

// ===============================
// STEP 1 — ADDRESS
// ===============================
function goToAddress() {
  document.getElementById("checkoutStep1").style.display = "block";
  document.getElementById("checkoutStep2").style.display = "none";
  document.getElementById("step1Tab").classList.add("active-step");
  document.getElementById("step2Tab").classList.remove("active-step");
}

// ===============================
// STEP 2 — PAYMENT
// ===============================
function goToPayment() {
  const firstName = document.getElementById("firstName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const pincode = document.getElementById("pincode").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();

  if (!firstName || !phone || !pincode || !address || !city) {
    alert("Please fill all address fields!");
    return;
  }
  if (phone.length !== 10) {
    alert("Mobile number 10 digits ka hona chahiye!");
    return;
  }
  if (pincode.length !== 6) {
    alert("Pincode 6 digits ka hona chahiye!");
    return;
  }

  document.getElementById("checkoutStep1").style.display = "none";
  document.getElementById("checkoutStep2").style.display = "block";
  document.getElementById("step1Tab").classList.remove("active-step");
  document.getElementById("step2Tab").classList.add("active-step");

  const summary = document.getElementById("checkoutSummary");
  let total = 0;
  let summaryHTML = "";

  bag.forEach((product) => {
    const price = parseInt(product.price.replace(/[^0-9]/g, ""));
    total += price * product.quantity;
    summaryHTML += `
      <div class="summary-row">
        <span>${product.name} × ${product.quantity}</span>
        <span>₹${(price * product.quantity).toLocaleString()}</span>
      </div>
    `;
  });

  summaryHTML += `
    <div class="summary-total">
      <span>Total</span>
      <span>₹${total.toLocaleString()}</span>
    </div>
  `;

  summary.innerHTML = summaryHTML;
}

// ===============================
// PLACE ORDER
// ===============================
function placeOrder() {
  const payment = document.querySelector('input[name="payment"]:checked').value;
  const paymentText =
    payment === "upi"
      ? "UPI"
      : payment === "card"
        ? "Card"
        : "Cash on Delivery";

  closeCheckoutModal();
  alert(
    `🎉 Order Placed Successfully!\n\nPayment: ${paymentText}\n\nThank you for shopping!`,
  );

  bag = [];
  localStorage.setItem("bag", JSON.stringify(bag));
  updateBagCount();
}

// ===============================
// QUANTITY CONTROLS
// ===============================
function increaseQty(id) {
  const index = bag.findIndex((p) => p.id === id);
  if (index !== -1) {
    bag[index].quantity += 1;
    localStorage.setItem("bag", JSON.stringify(bag));
    updateBagCount();
    renderBagModal();
  }
}

function decreaseQty(id) {
  const index = bag.findIndex((p) => p.id === id);
  if (index !== -1) {
    if (bag[index].quantity > 1) {
      bag[index].quantity -= 1;
    } else {
      bag.splice(index, 1);
    }
    localStorage.setItem("bag", JSON.stringify(bag));
    updateBagCount();
    renderBagModal();
  }
}

// ===============================
// REMOVE FROM BAG
// ===============================
function removeFromBag(id) {
  bag = bag.filter((p) => p.id !== String(id));
  localStorage.setItem("bag", JSON.stringify(bag));
  updateBagCount();
  renderBagModal();
}
