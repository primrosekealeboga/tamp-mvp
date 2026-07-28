import { useState } from "react";
import { useTAMP } from "../../context/TAMPContext";

function TruckPosting() {
  const {
    trucks,
    addTruck,
    deleteTruck,
  } = useTAMP();

  const emptyTruckData = {
    registrationNumber: "",
    driverName: "",
    truckType: "",
    capacity: "",
    currentLocation: "",
    destination: "",
    status: "Available",
  };

  const [truckData, setTruckData] = useState(emptyTruckData);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTruckData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !truckData.registrationNumber.trim() ||
      !truckData.driverName.trim() ||
      !truckData.truckType ||
      !truckData.capacity ||
      !truckData.currentLocation.trim() ||
      !truckData.destination.trim() ||
      !truckData.status
    ) {
      setMessage("Please complete all the truck details.");
      return;
    }

    if (Number(truckData.capacity) <= 0) {
      setMessage("Truck capacity must be greater than zero.");
      return;
    }

    const registrationExists = trucks.some(
      (truck) =>
        truck.registrationNumber.toLowerCase() ===
        truckData.registrationNumber.trim().toLowerCase()
    );

    if (registrationExists) {
      setMessage(
        "A truck with this registration number already exists."
      );
      return;
    }

    addTruck({
      ...truckData,
      registrationNumber:
        truckData.registrationNumber.trim().toUpperCase(),
      driverName: truckData.driverName.trim(),
      currentLocation: truckData.currentLocation.trim(),
      destination: truckData.destination.trim(),
      capacity: Number(truckData.capacity),
    });

    setTruckData(emptyTruckData);
    setMessage("Truck added successfully.");
  };

  const handleDelete = (truckId) => {
    deleteTruck(truckId);
    setMessage("Truck deleted successfully.");
  };

  const filteredTrucks = trucks.filter((truck) => {
    const searchValue = searchTerm.toLowerCase().trim();

    return (
      truck.registrationNumber
        .toLowerCase()
        .includes(searchValue) ||
      truck.driverName.toLowerCase().includes(searchValue) ||
      truck.truckType.toLowerCase().includes(searchValue) ||
      truck.currentLocation.toLowerCase().includes(searchValue) ||
      truck.destination.toLowerCase().includes(searchValue) ||
      truck.status.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">
            Truck Posting
          </h1>

          <p className="mt-2 text-gray-500">
            Register and manage trucks available for transportation.
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
                htmlFor="registrationNumber"
                className="mb-2 block font-medium text-gray-700"
              >
                Registration Number
              </label>

              <input
                id="registrationNumber"
                type="text"
                name="registrationNumber"
                value={truckData.registrationNumber}
                onChange={handleChange}
                placeholder="Example: GP 123-456"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="driverName"
                className="mb-2 block font-medium text-gray-700"
              >
                Driver Name
              </label>

              <input
                id="driverName"
                type="text"
                name="driverName"
                value={truckData.driverName}
                onChange={handleChange}
                placeholder="Example: Thabo Mokoena"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="truckType"
                className="mb-2 block font-medium text-gray-700"
              >
                Truck Type
              </label>

              <select
                id="truckType"
                name="truckType"
                value={truckData.truckType}
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
                htmlFor="capacity"
                className="mb-2 block font-medium text-gray-700"
              >
                Capacity in Tons
              </label>

              <input
                id="capacity"
                type="number"
                name="capacity"
                value={truckData.capacity}
                onChange={handleChange}
                placeholder="Example: 30"
                min="1"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="currentLocation"
                className="mb-2 block font-medium text-gray-700"
              >
                Current Location
              </label>

              <input
                id="currentLocation"
                type="text"
                name="currentLocation"
                value={truckData.currentLocation}
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
                value={truckData.destination}
                onChange={handleChange}
                placeholder="Example: Durban"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="status"
                className="mb-2 block font-medium text-gray-700"
              >
                Truck Status
              </label>

              <select
                id="status"
                name="status"
                value={truckData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
              >
                <option value="Available">Available</option>
                <option value="Assigned">Assigned</option>
                <option value="In Transit">In Transit</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800"
              >
                Register Truck
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Registered Trucks
              </h2>

              <p className="mt-1 text-gray-500">
                Total trucks: {trucks.length}
              </p>
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search trucks..."
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600 md:max-w-sm"
            />
          </div>

          {filteredTrucks.length === 0 ? (
            <div className="mt-6 rounded-lg bg-gray-50 p-6 text-center text-gray-500">
              {trucks.length === 0
                ? "No trucks have been registered yet."
                : "No trucks match your search."}
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3">Registration</th>
                    <th className="p-3">Driver</th>
                    <th className="p-3">Truck Type</th>
                    <th className="p-3">Capacity</th>
                    <th className="p-3">Current Location</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTrucks.map((truck) => (
                    <tr
                      key={truck.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3 font-medium">
                        {truck.registrationNumber}
                      </td>

                      <td className="p-3">
                        {truck.driverName}
                      </td>

                      <td className="p-3">
                        {truck.truckType}
                      </td>

                      <td className="p-3">
                        {truck.capacity} tons
                      </td>

                      <td className="p-3">
                        {truck.currentLocation}
                      </td>

                      <td className="p-3">
                        {truck.destination}
                      </td>

                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            truck.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : truck.status === "Maintenance"
                                ? "bg-yellow-100 text-yellow-800"
                                : truck.status === "Unavailable"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {truck.status}
                        </span>
                      </td>

                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(truck.id)
                          }
                          className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                        >
                          Delete
                        </button>
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

export default TruckPosting;