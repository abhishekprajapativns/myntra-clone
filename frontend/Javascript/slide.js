// SLIDER — AUTO SLIDE WITH DOTS

let currentSlide = 0;
const totalSlides = 6;
const wrapper = document.getElementById("sliderWrapper");
const dots = document.querySelectorAll(".dot");

// Go to Slide

function goToSlide(index) {
  currentSlide = index;
  wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update the dots
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}

// Auto Slide — Every 3 Seconds

function autoSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

// Auto-slide in 3 seconds
const autoPlay = setInterval(autoSlide, 3000);

// Stop the auto-slide when a dot is clicked — then resume it.
dots.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    clearInterval(autoPlay);
    goToSlide(index);
  });
});
