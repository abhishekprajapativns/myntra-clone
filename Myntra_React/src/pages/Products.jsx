import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

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

function Products() {
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
              key={product.id}
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
                    {wishlist.find((item) => item.id === product.id)
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
