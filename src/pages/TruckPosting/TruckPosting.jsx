import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CircleGauge,
  Hash,
  MapPin,
  PackageCheck,
  Plus,
  Search,
  Trash2,
  Truck,
  UserRound,
  Weight,
  Wrench,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
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

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const showMessage = (text, type) => {
    setMessage({
      text,
      type,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTruckData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (message.text) {
      setMessage({
        text: "",
        type: "",
      });
    }
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
      showMessage(
        "Please complete all the truck details before registering.",
        "error"
      );

      return;
    }

    if (Number(truckData.capacity) <= 0) {
      showMessage(
        "Truck capacity must be greater than zero.",
        "error"
      );

      return;
    }

    const registrationExists = trucks.some(
      (truck) =>
        truck.registrationNumber.toLowerCase() ===
        truckData.registrationNumber.trim().toLowerCase()
    );

    if (registrationExists) {
      showMessage(
        "A truck with this registration number already exists.",
        "error"
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

    showMessage(
      "Truck registered successfully.",
      "success"
    );
  };

  const handleDelete = (truckId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this truck?"
    );

    if (!shouldDelete) {
      return;
    }

    deleteTruck(truckId);

    showMessage(
      "Truck deleted successfully.",
      "success"
    );
  };

  const filteredTrucks = trucks.filter((truck) => {
    const searchValue = searchTerm.toLowerCase().trim();

    return (
      truck.registrationNumber
        .toLowerCase()
        .includes(searchValue) ||
      truck.driverName
        .toLowerCase()
        .includes(searchValue) ||
      truck.truckType
        .toLowerCase()
        .includes(searchValue) ||
      truck.currentLocation
        .toLowerCase()
        .includes(searchValue) ||
      truck.destination
        .toLowerCase()
        .includes(searchValue) ||
      truck.status
        .toLowerCase()
        .includes(searchValue)
    );
  });

  const availableTrucks = trucks.filter(
    (truck) => truck.status === "Available"
  ).length;

  const trucksInTransit = trucks.filter(
    (truck) => truck.status === "In Transit"
  ).length;

  const totalCapacity = trucks.reduce(
    (total, truck) =>
      total + Number(truck.capacity || 0),
    0
  );

  const inputClassName =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pl-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

  const selectClassName =
    "w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pl-11 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

  const getStatusStyles = (status) => {
    switch (status) {
      case "Available":
        return "bg-emerald-100 text-emerald-700";

      case "Assigned":
        return "bg-blue-100 text-blue-700";

      case "In Transit":
        return "bg-indigo-100 text-indigo-700";

      case "Maintenance":
        return "bg-amber-100 text-amber-800";

      case "Unavailable":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Navbar />

        <main className="p-5 sm:p-6 lg:p-8">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-900 px-6 py-8 text-white shadow-xl sm:px-8">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-200">
                  <Truck size={17} />
                  Fleet Management
                </div>

                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Register and manage your fleet
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  Add trucks, track availability and prepare your
                  fleet for load matchmaking and transportation.
                </p>
              </div>

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/10 backdrop-blur">
                <Truck size={38} />
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Trucks
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {trucks.length}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Truck size={23} />
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Available
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {availableTrucks}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <PackageCheck size={23} />
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    In Transit
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {trucksInTransit}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                  <ArrowRight size={23} />
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Capacity
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {totalCapacity}

                    <span className="ml-1 text-base font-medium text-slate-400">
                      tons
                    </span>
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <Weight size={23} />
                </div>
              </div>
            </article>
          </section>

          {/* Registration Form */}
          <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Plus size={23} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Register New Truck
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter the vehicle and driver information below.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {message.text && (
                <div
                  className={`mb-6 flex items-start gap-3 rounded-2xl border p-4 ${
                    message.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0"
                    />
                  ) : (
                    <AlertCircle
                      size={21}
                      className="mt-0.5 shrink-0"
                    />
                  )}

                  <div>
                    <p className="font-semibold">
                      {message.type === "success"
                        ? "Success"
                        : "Action required"}
                    </p>

                    <p className="mt-1 text-sm">
                      {message.text}
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                {/* Registration */}
                <div>
                  <label
                    htmlFor="registrationNumber"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Registration Number
                  </label>

                  <div className="relative">
                    <Hash
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="registrationNumber"
                      type="text"
                      name="registrationNumber"
                      value={truckData.registrationNumber}
                      onChange={handleChange}
                      placeholder="Example: GP 123-456"
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* Driver */}
                <div>
                  <label
                    htmlFor="driverName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Driver Name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="driverName"
                      type="text"
                      name="driverName"
                      value={truckData.driverName}
                      onChange={handleChange}
                      placeholder="Example: Thabo Mokoena"
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* Truck Type */}
                <div>
                  <label
                    htmlFor="truckType"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Truck Type
                  </label>

                  <div className="relative">
                    <Truck
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      id="truckType"
                      name="truckType"
                      value={truckData.truckType}
                      onChange={handleChange}
                      className={selectClassName}
                    >
                      <option value="">
                        Select truck type
                      </option>

                      <option value="Flatbed">
                        Flatbed
                      </option>

                      <option value="Refrigerated">
                        Refrigerated
                      </option>

                      <option value="Tanker">
                        Tanker
                      </option>

                      <option value="Curtain Side">
                        Curtain Side
                      </option>

                      <option value="Box Truck">
                        Box Truck
                      </option>
                    </select>
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <label
                    htmlFor="capacity"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Capacity in Tons
                  </label>

                  <div className="relative">
                    <Weight
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="capacity"
                      type="number"
                      name="capacity"
                      value={truckData.capacity}
                      onChange={handleChange}
                      placeholder="Example: 30"
                      min="1"
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* Current Location */}
                <div>
                  <label
                    htmlFor="currentLocation"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Current Location
                  </label>

                  <div className="relative">
                    <MapPin
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="currentLocation"
                      type="text"
                      name="currentLocation"
                      value={truckData.currentLocation}
                      onChange={handleChange}
                      placeholder="Example: Johannesburg"
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* Destination */}
                <div>
                  <label
                    htmlFor="destination"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Destination
                  </label>

                  <div className="relative">
                    <ArrowRight
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="destination"
                      type="text"
                      name="destination"
                      value={truckData.destination}
                      onChange={handleChange}
                      placeholder="Example: Durban"
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="status"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Truck Status
                  </label>

                  <div className="relative">
                    <CircleGauge
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      id="status"
                      name="status"
                      value={truckData.status}
                      onChange={handleChange}
                      className={selectClassName}
                    >
                      <option value="Available">
                        Available
                      </option>

                      <option value="Assigned">
                        Assigned
                      </option>

                      <option value="In Transit">
                        In Transit
                      </option>

                      <option value="Maintenance">
                        Maintenance
                      </option>

                      <option value="Unavailable">
                        Unavailable
                      </option>
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <div className="border-t border-slate-100 pt-6 md:col-span-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Plus size={19} />
                    Register Truck
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Registered Trucks */}
          <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-5 border-b border-slate-100 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                  <Truck size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Registered Trucks
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {trucks.length} truck
                    {trucks.length === 1 ? "" : "s"} currently
                    registered
                  </p>
                </div>
              </div>

              <div className="relative w-full lg:max-w-md">
                <Search
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search trucks, drivers or locations..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {filteredTrucks.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                  <Truck size={35} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-800">
                  {trucks.length === 0
                    ? "No trucks registered yet"
                    : "No matching trucks found"}
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  {trucks.length === 0
                    ? "Complete the form above to register the first truck in your fleet."
                    : "Try another registration, driver, location or status."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1150px] text-left">
                  <thead>
                    <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-6 py-4 font-semibold">
                        Truck
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Driver
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Capacity
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Route
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredTrucks.map((truck) => (
                      <tr
                        key={truck.id}
                        className="transition hover:bg-blue-50/40"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                              <Truck size={20} />
                            </div>

                            <div>
                              <p className="font-bold text-slate-900">
                                {truck.registrationNumber}
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                {truck.truckType}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-slate-700">
                            <UserRound
                              size={17}
                              className="text-slate-400"
                            />

                            {truck.driverName}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Weight
                              size={17}
                              className="text-slate-400"
                            />

                            {truck.capacity} tons
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div>
                            <div className="flex items-center gap-2 font-medium text-slate-800">
                              <MapPin
                                size={16}
                                className="text-blue-600"
                              />

                              {truck.currentLocation}
                            </div>

                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                              <ArrowRight size={15} />
                              {truck.destination}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${getStatusStyles(
                              truck.status
                            )}`}
                          >
                            {truck.status ===
                            "Maintenance" ? (
                              <Wrench size={14} />
                            ) : (
                              <CircleGauge size={14} />
                            )}

                            {truck.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(truck.id)
                              }
                              className="flex items-center gap-2 rounded-xl bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                            >
                              <Trash2 size={16} />
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
          </section>
        </main>
      </div>
    </div>
  );
}

export default TruckPosting;