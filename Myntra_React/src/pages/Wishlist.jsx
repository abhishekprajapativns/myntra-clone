import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="px-6 py-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-xl text-gray-500">Your wishlist is empty!</p>
          <p className="text-gray-400 mt-2">
            Click "Wishlist" on any product to save it.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-pink-600 font-bold">₹{item.price}</p>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="w-full mt-3 border border-red-500 text-red-500 py-1 rounded text-sm"
                >
                  Remove
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
