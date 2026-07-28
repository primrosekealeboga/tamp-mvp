import { useState } from "react";
import { useTAMP } from "../../context/TAMPContext";

function LoadPosting() {
  const {
    loads,
    addLoad,
    deleteLoad,
    updateLoad,
  } = useTAMP();

  const emptyLoadData = {
    pickup: "",
    destination: "",
    cargoType: "",
    weight: "",
    truckType: "",
    pickupDate: "",
  };

  const [loadData, setLoadData] = useState(emptyLoadData);
  const [searchTerm, setSearchTerm] = useState("");
  const [editLoadId, setEditLoadId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoadData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !loadData.pickup.trim() ||
      !loadData.destination.trim() ||
      !loadData.cargoType.trim() ||
      !loadData.weight ||
      !loadData.truckType ||
      !loadData.pickupDate
    ) {
      setMessage("Please complete all the load details.");
      return;
    }

    if (Number(loadData.weight) <= 0) {
      setMessage("Load weight must be greater than zero.");
      return;
    }

    if (isEditing) {
      updateLoad(editLoadId, loadData);

      setMessage("Load updated successfully.");
      setIsEditing(false);
      setEditLoadId(null);
    } else {
      addLoad(loadData);

      setMessage("Load added successfully.");
    }

    setLoadData(emptyLoadData);
  };

  const handleEdit = (load) => {
    setLoadData({
      pickup: load.pickup,
      destination: load.destination,
      cargoType: load.cargoType,
      weight: load.weight,
      truckType: load.truckType,
      pickupDate: load.pickupDate || "",
    });

    setEditLoadId(load.id);
    setIsEditing(true);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (loadId) => {
    deleteLoad(loadId);

    if (editLoadId === loadId) {
      handleCancelEdit();
    }

    setMessage("Load deleted successfully.");
  };

  const handleCancelEdit = () => {
    setLoadData(emptyLoadData);
    setEditLoadId(null);
    setIsEditing(false);
    setMessage("");
  };

  const filteredLoads = loads.filter((load) => {
    const searchValue = searchTerm.toLowerCase().trim();

    return (
      load.pickup.toLowerCase().includes(searchValue) ||
      load.destination.toLowerCase().includes(searchValue) ||
      load.cargoType.toLowerCase().includes(searchValue) ||
      load.truckType.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">
            Load Posting
          </h1>

          <p className="mt-2 text-gray-500">
            Add and manage loads that require transportation.
          </p>

          {message && (
            <div className="mt-5 rounded-lg bg-blue-50 p-4 text-blue-800">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            <div>
              <label
                htmlFor="pickup"
                className="mb-2 block font-medium text-gray-700"
              >
                Pickup Location
              </label>

              <input
                id="pickup"
                type="text"
                name="pickup"
                value={loadData.pickup}
                onChange={handleChange}
                placeholder="Example: Johannesburg"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="destination"
                className="mb-2 block font-medium text-gray-700"
              >
                Destination
              </label>

              <input
                id="destination"
                type="text"
                name="destination"
                value={loadData.destination}
                onChange={handleChange}
                placeholder="Example: Durban"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="cargoType"
                className="mb-2 block font-medium text-gray-700"
              >
                Cargo Type
              </label>

              <input
                id="cargoType"
                type="text"
                name="cargoType"
                value={loadData.cargoType}
                onChange={handleChange}
                placeholder="Example: Steel"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="weight"
                className="mb-2 block font-medium text-gray-700"
              >
                Weight in Tons
              </label>

              <input
                id="weight"
                type="number"
                name="weight"
                value={loadData.weight}
                onChange={handleChange}
                placeholder="Example: 20"
                min="1"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="truckType"
                className="mb-2 block font-medium text-gray-700"
              >
                Required Truck Type
              </label>

              <select
                id="truckType"
                name="truckType"
                value={loadData.truckType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
              >
                <option value="">Select truck type</option>
                <option value="Flatbed">Flatbed</option>
                <option value="Refrigerated">
                  Refrigerated
                </option>
                <option value="Tanker">Tanker</option>
                <option value="Curtain Side">
                  Curtain Side
                </option>
                <option value="Box Truck">Box Truck</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="pickupDate"
                className="mb-2 block font-medium text-gray-700"
              >
                Pickup Date
              </label>

              <input
                id="pickupDate"
                type="date"
                name="pickupDate"
                value={loadData.pickupDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800"
              >
                {isEditing ? "Update Load" : "Submit Load"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Posted Loads
              </h2>

              <p className="mt-1 text-gray-500">
                Total loads: {loads.length}
              </p>
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search loads..."
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600 md:max-w-sm"
            />
          </div>

          {filteredLoads.length === 0 ? (
            <div className="mt-6 rounded-lg bg-gray-50 p-6 text-center text-gray-500">
              {loads.length === 0
                ? "No loads have been posted yet."
                : "No loads match your search."}
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3">Pickup</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Cargo</th>
                    <th className="p-3">Weight</th>
                    <th className="p-3">Truck Type</th>
                    <th className="p-3">Pickup Date</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLoads.map((load) => (
                    <tr
                      key={load.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3">{load.pickup}</td>

                      <td className="p-3">
                        {load.destination}
                      </td>

                      <td className="p-3">
                        {load.cargoType}
                      </td>

                      <td className="p-3">
                        {load.weight} tons
                      </td>

                      <td className="p-3">
                        {load.truckType}
                      </td>

                      <td className="p-3">
                        {load.pickupDate || "Not provided"}
                      </td>

                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(load)}
                            className="rounded-lg bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-800 hover:bg-yellow-200"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(load.id)
                            }
                            className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoadPosting;