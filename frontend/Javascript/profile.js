// ===============================
// OPEN MODAL (Profile Button)
// ===============================
const profileBtn = document.querySelector(".nav-icons button");
const modal = document.getElementById("authModal");

profileBtn.addEventListener("click", function () {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
});

// ===============================
// CLOSE MODAL (Outside Click)
// ===============================
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// ===============================
// LOGIN FORM SUBMIT
// ===============================
const loginForm = document.getElementById("loginView");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  if (!email || !password) {
    alert("Please fill all fields!");
    return;
  }

  alert("Login Successful ✅");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
});

// ===============================
// SIGNUP FORM SUBMIT
// ===============================
const signupForm = document.getElementById("signupView");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = signupForm.firstName.value.trim();
  const lastName = signupForm.lastName.value.trim();
  const email = signupForm.email.value.trim();
  const password = signupForm.password.value.trim();

  if (!firstName || !lastName || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  alert("Account Created Successfully 🎉");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
});
