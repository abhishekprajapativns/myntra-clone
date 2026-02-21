// ===============================
// BAG SYSTEM — COMPLETE
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
// BAG MODAL — JS SE BANAO
// ===============================
const bagModalHTML = `
<div class="modal-overlay" id="bagModal">
  <div class="modal-card" style="width:500px;max-width:95vw;max-height:85vh;overflow-y:auto;padding:24px;border-radius:10px;background:#fff;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;border-bottom:2px solid #eee;padding-bottom:12px;">
      <h2 style="font-size:18px;font-weight:700;color:#282c3f;margin:0;">🛍️ My Bag (<span class="bag-count">0</span> items)</h2>
      <button onclick="closeBagModal()" style="background:none;border:none;font-size:20px;cursor:pointer;color:#555;width:auto!important;padding:4px 8px;">✕</button>
    </div>
    <div id="bagEmpty" style="text-align:center;padding:40px 20px;display:none;">
      <span class="material-symbols-outlined" style="font-size:60px;color:#ddd;">shopping_bag</span>
      <p style="color:#999;margin-top:10px;font-size:14px;">Your bag is empty!<br/>Click "Add to Bag" on any product.</p>
    </div>
    <div id="bagModalGrid"></div>
    <div id="bagTotal"></div>
  </div>
</div>

<!-- ===== CHECKOUT MODAL ===== -->
<div class="modal-overlay" id="checkoutModal">
  <div class="modal-card" style="width:520px;max-width:95vw;max-height:90vh;overflow-y:auto;padding:28px;border-radius:10px;background:#fff;">

    <!-- Header -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border-bottom:2px solid #eee;padding-bottom:12px;">
      <h2 style="font-size:18px;font-weight:700;color:#282c3f;margin:0;">Checkout</h2>
      <button onclick="closeCheckoutModal()" style="background:none;border:none;font-size:20px;cursor:pointer;color:#555;width:auto!important;padding:4px 8px;">✕</button>
    </div>

    <!-- Steps -->
    <div style="display:flex;justify-content:center;gap:0;margin-bottom:24px;">
      <div id="step1Tab" style="flex:1;text-align:center;padding:10px;background:#ff3f6c;color:#fff;font-weight:700;font-size:13px;border-radius:8px 0 0 8px;">1. Address</div>
      <div id="step2Tab" style="flex:1;text-align:center;padding:10px;background:#eee;color:#999;font-weight:700;font-size:13px;border-radius:0 8px 8px 0;">2. Payment</div>
    </div>

    <!-- STEP 1 — ADDRESS -->
    <div id="checkoutStep1">
      <h3 style="font-size:15px;font-weight:700;margin-bottom:16px;color:#282c3f;">Delivery Address</h3>

      <div style="display:flex;gap:10px;margin-bottom:12px;">
        <input type="text" id="firstName" placeholder="First Name" style="flex:1;padding:10px 14px;border:1.5px solid #ddd;border-radius:8px;font-size:14px;outline:none;" />
        <input type="text" id="lastName" placeholder="Last Name" style="flex:1;padding:10px 14px;border:1.5px solid #ddd;border-radius:8px;font-size:14px;outline:none;" />
      </div>

      <input type="text" id="phone" placeholder="Mobile Number" maxlength="10" style="width:100%;padding:10px 14px;border:1.5px solid #ddd;border-radius:8px;font-size:14px;outline:none;margin-bottom:12px;box-sizing:border-box;" />

      <input type="text" id="pincode" placeholder="Pincode" maxlength="6" style="width:100%;padding:10px 14px;border:1.5px solid #ddd;border-radius:8px;font-size:14px;outline:none;margin-bottom:12px;box-sizing:border-box;" />

      <input type="text" id="address" placeholder="Address (House No, Street, Area)" style="width:100%;padding:10px 14px;border:1.5px solid #ddd;border-radius:8px;font-size:14px;outline:none;margin-bottom:12px;box-sizing:border-box;" />

      <div style="display:flex;gap:10px;margin-bottom:12px;">
        <input type="text" id="city" placeholder="City" style="flex:1;padding:10px 14px;border:1.5px solid #ddd;border-radius:8px;font-size:14px;outline:none;" />
        <input type="text" id="state" placeholder="State" style="flex:1;padding:10px 14px;border:1.5px solid #ddd;border-radius:8px;font-size:14px;outline:none;" />
      </div>

      <button onclick="goToPayment()" style="width:100%;padding:12px;background:#ff3f6c;color:#fff;border:none;border-radius:40px;font-size:15px;font-weight:700;cursor:pointer;margin-top:8px;">Continue to Payment →</button>
    </div>

    <!-- STEP 2 — PAYMENT -->
    <div id="checkoutStep2" style="display:none;">
      <h3 style="font-size:15px;font-weight:700;margin-bottom:16px;color:#282c3f;">Payment Method</h3>

      <!-- Payment Options -->
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">

        <label style="display:flex;align-items:center;gap:12px;padding:14px;border:1.5px solid #ddd;border-radius:8px;cursor:pointer;">
          <input type="radio" name="payment" value="upi" checked style="accent-color:#ff3f6c;" />
          <span style="font-weight:600;font-size:14px;">📱 UPI</span>
        </label>

        <label style="display:flex;align-items:center;gap:12px;padding:14px;border:1.5px solid #ddd;border-radius:8px;cursor:pointer;">
          <input type="radio" name="payment" value="card" style="accent-color:#ff3f6c;" />
          <span style="font-weight:600;font-size:14px;">💳 Credit / Debit Card</span>
        </label>

        <label style="display:flex;align-items:center;gap:12px;padding:14px;border:1.5px solid #ddd;border-radius:8px;cursor:pointer;">
          <input type="radio" name="payment" value="cod" style="accent-color:#ff3f6c;" />
          <span style="font-weight:600;font-size:14px;">💵 Cash on Delivery</span>
        </label>

      </div>

      <!-- Order Summary -->
      <div style="background:#f9f9f9;border-radius:8px;padding:14px;margin-bottom:16px;">
        <h4 style="font-size:14px;font-weight:700;margin-bottom:10px;color:#282c3f;">Order Summary</h4>
        <div id="checkoutSummary"></div>
      </div>

      <div style="display:flex;gap:10px;">
        <button onclick="goToAddress()" style="flex:1;padding:12px;background:#fff;color:#ff3f6c;border:2px solid #ff3f6c;border-radius:40px;font-size:14px;font-weight:700;cursor:pointer;">← Back</button>
        <button onclick="placeOrder()" style="flex:2;padding:12px;background:#ff3f6c;color:#fff;border:none;border-radius:40px;font-size:15px;font-weight:700;cursor:pointer;">Place Order 🎉</button>
      </div>
    </div>

  </div>
</div>
`;

document.body.insertAdjacentHTML("beforeend", bagModalHTML);

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
    item.style.cssText =
      "display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid #f0f0f0;position:relative;";
    item.innerHTML = `
      <img src="${product.img}" alt="${product.name}" style="width:80px;height:80px;object-fit:contain;background:#f9f9f9;border-radius:8px;padding:4px;flex-shrink:0;" />
      <div style="flex:1;">
        <h4 style="font-size:14px;font-weight:600;color:#282c3f;margin-bottom:4px;">${product.name}</h4>
        <p style="color:#ff3f6c;font-weight:700;font-size:14px;margin-bottom:8px;">${product.price}</p>
        <div style="display:flex;align-items:center;gap:10px;">
          <button onclick="decreaseQty('${product.id}')" style="width:28px!important;height:28px;border:1px solid #ddd;background:#fff;border-radius:50%;cursor:pointer;font-size:16px;padding:0!important;line-height:1;">−</button>
          <span style="font-size:15px;font-weight:600;">${product.quantity}</span>
          <button onclick="increaseQty('${product.id}')" style="width:28px!important;height:28px;border:1px solid #ddd;background:#fff;border-radius:50%;cursor:pointer;font-size:16px;padding:0!important;line-height:1;">+</button>
        </div>
      </div>
      <button onclick="removeFromBag('${product.id}')" style="position:absolute;top:12px;right:0;background:none;border:none;font-size:18px;cursor:pointer;color:#aaa;width:auto!important;padding:4px!important;">✕</button>
    `;
    grid.appendChild(item);
  });

  totalEl.innerHTML = `
    <div style="display:flex;justify-content:space-between;padding:14px 0 10px;font-size:16px;font-weight:700;color:#282c3f;border-top:2px solid #eee;margin-top:8px;">
      <span>Total:</span>
      <span>₹${total.toLocaleString()}</span>
    </div>
    <button onclick="openCheckout()" style="width:100%;padding:12px;background:#ff3f6c;color:#fff;border:none;border-radius:40px;font-size:15px;font-weight:700;cursor:pointer;margin-top:10px;">Proceed to Checkout →</button>
  `;
}

// ===============================
// CHECKOUT OPEN
// ===============================
function openCheckout() {
  closeBagModal();
  goToAddress(); // pehle address step dikhao
  document.getElementById("checkoutModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

// ===============================
// CHECKOUT CLOSE
// ===============================
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
  document.getElementById("step1Tab").style.background = "#ff3f6c";
  document.getElementById("step1Tab").style.color = "#fff";
  document.getElementById("step2Tab").style.background = "#eee";
  document.getElementById("step2Tab").style.color = "#999";
}

// ===============================
// STEP 2 — PAYMENT
// ===============================
function goToPayment() {
  // Validation
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

  // Step 2 dikhao
  document.getElementById("checkoutStep1").style.display = "none";
  document.getElementById("checkoutStep2").style.display = "block";
  document.getElementById("step1Tab").style.background = "#eee";
  document.getElementById("step1Tab").style.color = "#999";
  document.getElementById("step2Tab").style.background = "#ff3f6c";
  document.getElementById("step2Tab").style.color = "#fff";

  // Order summary dikhao
  const summary = document.getElementById("checkoutSummary");
  let total = 0;
  let summaryHTML = "";

  bag.forEach((product) => {
    const price = parseInt(product.price.replace(/[^0-9]/g, ""));
    total += price * product.quantity;
    summaryHTML += `
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;color:#555;">
        <span>${product.name} × ${product.quantity}</span>
        <span>₹${(price * product.quantity).toLocaleString()}</span>
      </div>
    `;
  });

  summaryHTML += `
    <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:700;margin-top:10px;padding-top:10px;border-top:1px solid #ddd;color:#282c3f;">
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

  // Success message
  alert(
    `🎉 Order Placed Successfully!\n\nPayment: ${paymentText}\n\nThank you for shopping!`,
  );

  // Bag clear karo
  bag = [];
  localStorage.setItem("bag", JSON.stringify(bag));
  updateBagCount();
}

// ===============================
// QUANTITY BADHAO / GHATAO
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
