import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="px-6 py-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">
        My Wishlist ({wishlist.length})
      </h2>

      {wishlist.length === 0 ? (
        <div className="text-center mt-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <p className="text-xl text-gray-500 font-semibold">
            Your wishlist is empty!
          </p>
          <p className="text-gray-400 mt-2">
            Products ko heart icon se save karo
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id || item._id}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group bg-white"
            >
              {/* Image + Remove Heart */}
              <div className="relative">
                <div className="h-64 bg-gray-50 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Remove Heart Button */}
                <button
                  onClick={() => removeFromWishlist(item.id || item._id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:scale-110 transition-transform"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-800"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 truncate">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-pink-600 font-bold">₹{item.price}</p>
                  <p className="text-gray-400 text-xs line-through">
                    ₹{item.price + 500}
                  </p>
                  <p className="text-green-600 text-xs font-semibold">
                    {Math.round((500 / (item.price + 500)) * 100)}% OFF
                  </p>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={() => addToCart(item)}
                  className="w-full mt-3 bg-white border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
