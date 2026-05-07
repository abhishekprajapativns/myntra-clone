import { useState, useEffect } from "react";

const banners = [
  "/banners/Activewear_DK.webp",
  "/banners/banner.jpg",
  "/banners/Handbags_Desk.webp",
  "/banners/USPA_Desk_Banner.webp",
  "/banners/wd.webp",
  "/banners/Xn5v.webp",
];

const banners = [
  "/banners/Activewear_DK.webp",
  "/banners/banner.jpg",
  "/banners/Handbags_Desk.webp",
  "/banners/USPA_Desk_Banner.webp",
  "/banners/wd.webp",
  "/banners/Xn5v.webp",
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Banner */}
      <div className="relative w-full">
        <img
          src={banners[currentSlide]}
          alt="banner"
          className="w-full h-auto"
        />

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex gap-2">
          {banners.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentSlide === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
