import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  return (
    <div>
      {/* Products Section */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              {/* Info */}
              <div className="p-3">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-pink-600 font-bold">₹{product.price}</p>

                {/* Buttons */}
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
                    {wishlist.find((item) => item._id === product._id)
                      ? "❤️ Wishlisted"
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

export default Products;
