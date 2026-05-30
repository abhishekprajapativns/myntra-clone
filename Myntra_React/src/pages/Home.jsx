import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const banners = [
  "/banners/Activewear_DK.webp",
  "/banners/banner.jpg",
  "/banners/Handbags_Desk.webp",
  "/banners/USPA_Desk_Banner.webp",
  "/banners/wd.webp",
  "/banners/Xn5v.webp",
];

const products = [
  { id: 1, name: "Men's T-Shirt", price: 499, image: "/products/1.png" },
  { id: 2, name: "Shoes", price: 1999, image: "/products/3.png" },
  { id: 3, name: "Jacket", price: 2599, image: "/products/4.png" },
  { id: 4, name: "Shirt", price: 699, image: "/products/7.png" },
  { id: 5, name: "T-Shirt", price: 999, image: "/products/8.png" },
  { id: 6, name: "Shoes", price: 999, image: "/products/9.png" },
  { id: 7, name: "Shoes", price: 999, image: "/products/10.png" },
  { id: 8, name: "Sandal", price: 999, image: "/products/11.png" },
  { id: 9, name: "Jeans", price: 999, image: "/products/12.png" },
  { id: 10, name: "Shoes", price: 1999, image: "/products/3.png" },
  { id: 11, name: "Jacket", price: 2599, image: "/products/4.png" },
  { id: 12, name: "Shirt", price: 699, image: "/products/7.png" },
  { id: 13, name: "T-Shirt", price: 999, image: "/products/8.png" },
  { id: 14, name: "Shoes", price: 999, image: "/products/9.png" },
  { id: 15, name: "Shoes", price: 999, image: "/products/10.png" },
  { id: 16, name: "Sandal", price: 999, image: "/products/11.png" },
  { id: 17, name: "Jeans", price: 999, image: "/products/12.png" },
  { id: 18, name: "Shoes", price: 1999, image: "/products/3.png" },
  { id: 19, name: "Jacket", price: 2599, image: "/products/4.png" },
  { id: 20, name: "Shirt", price: 699, image: "/products/7.png" },
  { id: 21, name: "T-Shirt", price: 999, image: "/products/8.png" },
  { id: 22, name: "Shoes", price: 999, image: "/products/9.png" },
  { id: 23, name: "Shoes", price: 999, image: "/products/10.png" },
  { id: 24, name: "Sandal", price: 999, image: "/products/11.png" },
  { id: 25, name: "Jeans", price: 999, image: "/products/12.png" },
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

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
        <div className="absolute bottom-4 left-1/2 flex gap-2">
          {banners.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${currentSlide === index ? "bg-white" : "bg-gray-400"}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              <div className="h-64 bg-gray-50 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-pink-600 font-bold">₹{product.price}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-pink-600 text-white py-1 rounded text-sm"
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => addToWishlist(product)}
                    className="flex-1 border border-pink-600 text-pink-600 py-1 rounded text-sm"
                  >
                    {wishlist.find((item) => item.id === product.id)
                      ? "❤️"
                      : "Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
