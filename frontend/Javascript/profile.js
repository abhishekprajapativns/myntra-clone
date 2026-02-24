// ===============================
// OPEN MODAL (Profile Button)
// ===============================
const profileBtn = document.querySelector(".nav-icons button");
const modal = document.getElementById("authModal");

profileBtn.addEventListener("click", function () {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  showLogin();
});

// ===============================
// CLOSE MODAL (Outside Click)
// ===============================
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeAuthModal();
  }
});

// ===============================
// CLOSE FUNCTION
// ===============================
function closeAuthModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// ===============================
// TOGGLE — LOGIN / SIGNUP
// ===============================
const loginView = document.getElementById("loginView");
const signupView = document.getElementById("signupView");

signupView.style.display = "none";

function showLogin() {
  loginView.style.display = "block";
  signupView.style.display = "none";
}

function showSignup() {
  loginView.style.display = "none";
  signupView.style.display = "block";
}

// ===============================
// LOGIN FORM SUBMIT — BACKEND
// ===============================
const loginForm = document.getElementById("loginView");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  if (!email || !password) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert(`Welcome back ${data.user.firstName}! ✅`);
      closeAuthModal();
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Server se connect nahi ho pa raha!");
  }
});

// ===============================
// SIGNUP FORM SUBMIT — BACKEND
// ===============================
const signupForm = document.getElementById("signupView");

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const firstName = signupForm.firstName.value.trim();
  const lastName = signupForm.lastName.value.trim();
  const email = signupForm.email.value.trim();
  const password = signupForm.password.value.trim();

  if (!firstName || !lastName || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Account Created Successfully 🎉");
      showLogin();
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Server se connect nahi ho pa raha!");
  }
});
