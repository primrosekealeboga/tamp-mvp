import { useState } from "react";
import { useTAMP } from "../../context/TAMPContext";

function Matchmaking() {
  const {
    loads,
    trucks,
    matchDecisions,
    handleMatchDecision,
  } = useTAMP();

  const [selectedLoadId, setSelectedLoadId] = useState("");

  const selectedLoad = loads.find(
    (load) => load.id === Number(selectedLoadId)
  );

  const matchingTrucks = selectedLoad
    ? trucks.filter((truck) => {
        return (
          truck.truckType.toLowerCase() ===
            selectedLoad.truckType.toLowerCase() &&
          Number(truck.capacity) >= Number(selectedLoad.weight) &&
          truck.currentLocation.toLowerCase() ===
            selectedLoad.pickup.toLowerCase() &&
          truck.destination.toLowerCase() ===
            selectedLoad.destination.toLowerCase() &&
          truck.status === "Available"
        );
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">
            Matchmaking
          </h1>

          <p className="mt-2 text-gray-500">
            Select a load to find compatible available trucks.
          </p>

          <div className="mt-6">
            <label className="mb-2 block font-medium">
              Select Load
            </label>

            <select
              value={selectedLoadId}
              onChange={(event) =>
                setSelectedLoadId(event.target.value)
              }
              className="w-full rounded-lg border p-3"
            >
              <option value="">Choose a load</option>

              {loads.map((load) => (
                <option key={load.id} value={load.id}>
                  {load.pickup} → {load.destination} |{" "}
                  {load.truckType} | {load.weight} tons
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedLoad && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">
              Selected Load
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm text-gray-500">Route</p>

                <p className="font-semibold">
                  {selectedLoad.pickup} →{" "}
                  {selectedLoad.destination}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Cargo</p>

                <p className="font-semibold">
                  {selectedLoad.cargoType}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Required Truck
                </p>

                <p className="font-semibold">
                  {selectedLoad.truckType}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Weight</p>

                <p className="font-semibold">
                  {selectedLoad.weight} tons
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedLoad && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Recommended Trucks
            </h2>

            {matchingTrucks.length === 0 ? (
              <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-5 text-yellow-800">
                No compatible trucks were found for this load.
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
                {matchingTrucks.map((truck) => {
                  const decisionKey = `${selectedLoad.id}-${truck.id}`;

                  const decision =
                    matchDecisions[decisionKey];

                  return (
                    <div
                      key={truck.id}
                      className="rounded-2xl bg-white p-6 shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {truck.registrationNumber}
                          </h3>

                          <p className="text-gray-500">
                            Driver: {truck.driverName}
                          </p>
                        </div>

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          Match Found
                        </span>
                      </div>

                      <div className="mt-5 space-y-2 text-gray-700">
                        <p>
                          <strong>Truck Type:</strong>{" "}
                          {truck.truckType}
                        </p>

                        <p>
                          <strong>Capacity:</strong>{" "}
                          {truck.capacity} tons
                        </p>

                        <p>
                          <strong>Current Location:</strong>{" "}
                          {truck.currentLocation}
                        </p>

                        <p>
                          <strong>Destination:</strong>{" "}
                          {truck.destination}
                        </p>

                        <p>
                          <strong>Status:</strong>{" "}
                          {truck.status}
                        </p>
                      </div>

                      <div className="mt-5 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                        Recommended because the truck type,
                        capacity, current location and destination
                        match the selected load.
                      </div>

                      {decision ? (
                        <div className="mt-5">
                          <div
                            className={`rounded-lg p-4 text-center font-medium ${
                              decision === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            Match {decision}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleMatchDecision(
                                selectedLoad.id,
                                truck.id,
                                null
                              )
                            }
                            className="mt-3 w-full rounded-lg border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-100"
                          >
                            Undo Decision
                          </button>
                        </div>
                      ) : (
                        <div className="mt-5 flex gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              handleMatchDecision(
                                selectedLoad.id,
                                truck.id,
                                "Accepted"
                              )
                            }
                            className="flex-1 rounded-lg bg-blue-700 py-2 font-medium text-white hover:bg-blue-800"
                          >
                            Accept
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleMatchDecision(
                                selectedLoad.id,
                                truck.id,
                                "Rejected"
                              )
                            }
                            className="flex-1 rounded-lg border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-100"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Matchmaking;