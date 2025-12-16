import React from "react";

const Address = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold text-ternary">Address Page</h1>
      <p>Manage your delivery addresses here. Add, edit, or remove addresses as needed.</p>
      <div className="mt-6">
        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <h2 className="font-semibold text-lg">Home Address</h2>
          <p>123, Example Street, City, State, ZIP</p>
          <button className="mt-2 px-4 py-2 bg-secondary text-white rounded">Edit</button>
        </div>
        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <h2 className="font-semibold text-lg">Office Address</h2>
          <p>456, Office Lane, City, State, ZIP</p>
          <button className="mt-2 px-4 py-2 bg-secondary text-white rounded">Edit</button>
        </div>
        <button className="px-6 py-2 bg-ternary text-white rounded mt-4">Add New Address</button>
      </div>
    </div>
  );
};

export default Address;
