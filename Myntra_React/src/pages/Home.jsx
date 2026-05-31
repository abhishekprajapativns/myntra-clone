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
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                currentSlide === index ? "bg-white scale-125" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => {
            const isWishlisted = wishlist.find(
              (item) => item.id === product.id,
            );
            return (
              <div
                key={product.id}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group bg-white"
              >
                {/* Image + Heart */}
                <div className="relative">
                  <div className="h-64 bg-gray-50 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Heart Button */}
                  <button
                    onClick={() => addToWishlist(product)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:scale-110 transition-transform"
                  >
                    {isWishlisted ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-800"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-pink-600 font-bold">₹{product.price}</p>
                    <p className="text-gray-400 text-xs line-through">
                      ₹{product.price + 500}
                    </p>
                    <p className="text-green-600 text-xs font-semibold">
                      {Math.round((500 / (product.price + 500)) * 100)}% OFF
                    </p>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-3 bg-white border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
