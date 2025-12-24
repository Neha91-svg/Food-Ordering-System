export default function FoodList({ foods, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600">
        <h2 className="text-lg font-bold text-white tracking-wide">
          🍽️ Food Management
        </h2>
        <p className="text-xs text-green-100">
          Manage all foods of selected restaurant
        </p>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-gray-600 bg-gray-50 uppercase border-b">
        <div className="col-span-5">Food</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {/* Rows */}
      {foods.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          🍔 No foods added yet
        </div>
      ) : (
        foods.map((f) => (
          <div
            key={f._id}
            className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b last:border-b-0
                       hover:bg-green-50/40 transition-all duration-200"
          >
            {/* Food Info */}
            <div className="col-span-5 flex items-center gap-4">
              <img
                src={`${import.meta.env.VITE_BASE_API_URL.replace(
                  "/api",
                  ""
                )}/uploads/${f.image}`}
                alt={f.name}
                className="w-14 h-14 rounded-xl object-cover border shadow-sm"
              />

              <div>
                <p className="font-semibold text-gray-800">
                  {f.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {f.foodType}
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="col-span-2">
              <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium">
                {f.category}
              </span>
            </div>

            {/* Price */}
            <div className="col-span-2 font-semibold text-gray-800">
              ₹{f.price}
            </div>

            {/* Status */}
            <div className="col-span-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${f.isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {f.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-1 flex justify-end">
              <button
                onClick={() => onDelete(f._id)}
                className="px-3 py-1.5 text-xs font-semibold text-red-600 
                           bg-red-50 rounded-lg hover:bg-red-100 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
