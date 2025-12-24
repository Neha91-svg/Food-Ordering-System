export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Total Restaurants</p>
          <h2 className="text-3xl font-bold">12</h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Total Foods</p>
          <h2 className="text-3xl font-bold">120</h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold">56</h2>
        </div>
      </div>
    </div>
  );
}
