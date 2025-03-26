import React, { useState } from "react";

const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const handleOpenModal = (customer = null) => {
    setIsEditMode(!!customer);
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCustomer(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for creating or updating a customer
    console.log("Form submitted");
    handleCloseModal();
  };

  return (
    <div className="p-6 bg-light-gray h-screen">
      {/* Page Title */}
      <h2 className="text-3xl font-montserrat text-dark-gray mb-6">Customers</h2>

      {/* Create Customer Button */}
      <div className="mb-4">
        <button
          onClick={() => handleOpenModal()}
          className="bg-dark-teal text-white px-4 py-2 rounded-lg hover:bg-highlight-yellow transition duration-200"
        >
          Create Customer
        </button>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto bg-white shadow-3xl rounded-lg">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-dark-teal text-white">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((id) => (
              <tr
                key={id}
                className="border-t hover:bg-light-gray transition duration-150"
              >
                <td className="px-4 py-2">CUST00{id}</td>
                <td className="px-4 py-2">John Doe</td>
                <td className="px-4 py-2">johndoe@example.com</td>
                <td className="px-4 py-2">+123456789</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      handleOpenModal({
                        id: `CUST00${id}`,
                        name: "John Doe",
                        email: "johndoe@example.com",
                        phone: "+123456789",
                      })
                    }
                    className="bg-highlight-yellow text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-montserrat mb-4">
              {isEditMode ? "Edit Customer" : "Create Customer"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  defaultValue={isEditMode ? currentCustomer?.name : ""}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue={isEditMode ? currentCustomer?.email : ""}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  defaultValue={isEditMode ? currentCustomer?.phone : ""}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-dark-teal text-white px-4 py-2 rounded-lg hover:bg-highlight-yellow transition"
                >
                  {isEditMode ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
