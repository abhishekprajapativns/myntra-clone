// ===============================
// SLIDER — AUTO SLIDE WITH DOTS
// ===============================

let currentSlide = 0;
const totalSlides = 6;
const wrapper = document.getElementById("sliderWrapper");
const dots = document.querySelectorAll(".dot");

// ===============================
// SLIDE JAO
// ===============================
function goToSlide(index) {
  currentSlide = index;
  wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Dots update karo
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}

// ===============================
// AUTO SLIDE — HAR 3 SECOND
// ===============================
function autoSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

// 3 second mein auto slide
const autoPlay = setInterval(autoSlide, 3000);

// Dot pe click karne pe auto slide rok do — phir shuru karo
dots.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    clearInterval(autoPlay);
    goToSlide(index);
  });
});
