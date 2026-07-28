import { useState } from "react";

function TruckPosting() {
  const [truckData, setTruckData] = useState({
    registrationNumber: "",
    truckType: "",
    capacity: "",
    currentLocation: "",
    availableDate: "",
    driverName: "",
    destination: "",
  });

  const [trucks, setTrucks] = useState([]);

  const handleSubmit = () => {
    if (
      !truckData.registrationNumber.trim() ||
      !truckData.truckType.trim() ||
      !truckData.capacity ||
      !truckData.currentLocation.trim() ||
      !truckData.driverName.trim() ||
      !truckData.destination.trim() ||
      !truckData.availableDate
    ) {
      alert("Please complete all truck details.");
      return;
    }

    const newTruck = {
      ...truckData,
      id: Date.now(),
      status: "Available",
    };

    setTrucks([...trucks, newTruck]);

    alert("Truck registered successfully!");

    setTruckData({
      registrationNumber: "",
      truckType: "",
      capacity: "",
      currentLocation: "",
      availableDate: "",
      driverName: "",
      destination: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">
            Register Available Truck
          </h1>

          <p className="mt-2 text-gray-500">
            Add the truck’s capacity, location and availability.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Registration Number
              </label>

              <input
                type="text"
                placeholder="Example: AB 12 CD GP"
                value={truckData.registrationNumber}
                onChange={(e) =>
                  setTruckData({
                    ...truckData,
                    registrationNumber: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Truck Type
              </label>

              <select
                value={truckData.truckType}
                onChange={(e) =>
                  setTruckData({
                    ...truckData,
                    truckType: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              >
                <option value="">Select truck type</option>
                <option value="Flatbed">Flatbed</option>
                <option value="Refrigerated">Refrigerated</option>
                <option value="Tanker">Tanker</option>
                <option value="Box Truck">Box Truck</option>
                <option value="Tipper">Tipper</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Capacity in tons
              </label>

              <input
                type="number"
                min="1"
                placeholder="Example: 20"
                value={truckData.capacity}
                onChange={(e) =>
                  setTruckData({
                    ...truckData,
                    capacity: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Current Location
              </label>

              <input
                type="text"
                placeholder="Example: Johannesburg"
                value={truckData.currentLocation}
                onChange={(e) =>
                  setTruckData({
                    ...truckData,
                    currentLocation: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-medium">
                Available Date
              </label>

              <input
                type="date"
                value={truckData.availableDate}
                onChange={(e) =>
                  setTruckData({
                    ...truckData,
                    availableDate: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
               <label className="mb-2 block font-medium">
               Driver Name
           </label>

         <input
              type="text"
              placeholder="Enter driver name"
              value={truckData.driverName}
              onChange={(e) =>
              setTruckData({
              ...truckData,
             driverName: e.target.value,
         })
      }
           className="w-full rounded-lg border p-3"
  />
           </div>

           <div>
  <label className="mb-2 block font-medium">
    Destination
  </label>

  <input
    type="text"
    placeholder="Enter destination"
    value={truckData.destination}
    onChange={(e) =>
      setTruckData({
        ...truckData,
        destination: e.target.value,
      })
    }
    className="w-full rounded-lg border p-3"
  />
</div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 w-full rounded-lg bg-blue-700 py-3 font-medium text-white transition hover:bg-blue-800"
          >
            Register Truck
          </button>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">
            Registered Trucks
          </h2>

          {trucks.length === 0 ? (
            <p className="mt-4 text-gray-500">
              No trucks have been registered yet.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border p-3">Registration</th>
                    <th className="border p-3">Type</th>
                    <th className="border p-3">Capacity</th>
                    <th className="border p-3">Location</th>
                    <th className="border p-3">Available</th>
                    <th className="border p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {trucks.map((truck) => (
                    <tr key={truck.id}>
                      <td className="border p-3">
                        {truck.registrationNumber}
                      </td>
                      <td className="border p-3">{truck.truckType}</td>
                      <td className="border p-3">
                        {truck.capacity} tons
                      </td>
                      <td className="border p-3">
                        {truck.currentLocation}
                      </td>
                      <td className="border p-3">
                        {truck.availableDate}
                      </td>
                      <td className="border p-3">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          {truck.status}
                        </span>
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