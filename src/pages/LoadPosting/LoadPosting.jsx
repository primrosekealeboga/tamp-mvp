import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Edit3,
  MapPin,
  Package,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Truck,
  Weight,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
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

    setLoadData((previousData) => ({
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
      !loadData.pickup.trim() ||
      !loadData.destination.trim() ||
      !loadData.cargoType.trim() ||
      !loadData.weight ||
      !loadData.truckType ||
      !loadData.pickupDate
    ) {
      showMessage(
        "Please complete all the load details before submitting.",
        "error"
      );
      return;
    }

    if (Number(loadData.weight) <= 0) {
      showMessage(
        "Load weight must be greater than zero.",
        "error"
      );
      return;
    }

    const cleanedLoadData = {
      ...loadData,
      pickup: loadData.pickup.trim(),
      destination: loadData.destination.trim(),
      cargoType: loadData.cargoType.trim(),
      weight: Number(loadData.weight),
    };

    if (isEditing) {
      updateLoad(editLoadId, cleanedLoadData);

      showMessage(
        "Load details updated successfully.",
        "success"
      );

      setIsEditing(false);
      setEditLoadId(null);
    } else {
      addLoad(cleanedLoadData);

      showMessage(
        "New load posted successfully.",
        "success"
      );
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

    setMessage({
      text: "",
      type: "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (loadId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this load?"
    );

    if (!shouldDelete) {
      return;
    }

    deleteLoad(loadId);

    if (editLoadId === loadId) {
      setLoadData(emptyLoadData);
      setEditLoadId(null);
      setIsEditing(false);
    }

    showMessage(
      "Load deleted successfully.",
      "success"
    );
  };

  const handleCancelEdit = () => {
    setLoadData(emptyLoadData);
    setEditLoadId(null);
    setIsEditing(false);

    setMessage({
      text: "",
      type: "",
    });
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

  const totalWeight = loads.reduce(
    (total, load) => total + Number(load.weight || 0),
    0
  );

  const uniqueRoutes = new Set(
    loads.map(
      (load) =>
        `${load.pickup.toLowerCase()}-${load.destination.toLowerCase()}`
    )
  ).size;

  const inputClassName =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pl-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

  const selectClassName =
    "w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pl-11 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Navbar />

        <main className="p-5 sm:p-6 lg:p-8">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-900 px-6 py-8 text-white shadow-xl sm:px-8">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-200">
                  <Package size={17} />
                  Load Management
                </div>

                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Post and manage transport loads
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  Create transport requests, update load details and
                  prepare each shipment for truck matchmaking.
                </p>
              </div>

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/10 backdrop-blur">
                <Package size={36} />
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Loads
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {loads.length}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Package size={23} />
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Weight
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {totalWeight}
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

            <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Active Routes
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {uniqueRoutes}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <MapPin size={23} />
                </div>
              </div>
            </article>
          </section>

          {/* Form */}
          <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    isEditing
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {isEditing ? (
                    <Edit3 size={23} />
                  ) : (
                    <Plus size={23} />
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {isEditing
                      ? "Edit Load Details"
                      : "Create New Load"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {isEditing
                      ? "Update the selected transportation request."
                      : "Complete the form to add a load to the platform."}
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
                {/* Pickup */}
                <div>
                  <label
                    htmlFor="pickup"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Pickup Location
                  </label>

                  <div className="relative">
                    <MapPin
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="pickup"
                      type="text"
                      name="pickup"
                      value={loadData.pickup}
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
                      value={loadData.destination}
                      onChange={handleChange}
                      placeholder="Example: Durban"
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* Cargo */}
                <div>
                  <label
                    htmlFor="cargoType"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Cargo Type
                  </label>

                  <div className="relative">
                    <Package
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="cargoType"
                      type="text"
                      name="cargoType"
                      value={loadData.cargoType}
                      onChange={handleChange}
                      placeholder="Example: Steel"
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label
                    htmlFor="weight"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Weight in tons
                  </label>

                  <div className="relative">
                    <Weight
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="weight"
                      type="number"
                      name="weight"
                      value={loadData.weight}
                      onChange={handleChange}
                      placeholder="Example: 20"
                      min="1"
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
                    Required Truck Type
                  </label>

                  <div className="relative">
                    <Truck
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      id="truckType"
                      name="truckType"
                      value={loadData.truckType}
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

                {/* Pickup Date */}
                <div>
                  <label
                    htmlFor="pickupDate"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Pickup Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="pickupDate"
                      type="date"
                      name="pickupDate"
                      value={loadData.pickupDate}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 md:col-span-2 sm:flex-row">
                  <button
                    type="submit"
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 ${
                      isEditing
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-orange-200 hover:from-amber-600 hover:to-orange-600"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-200 hover:from-blue-700 hover:to-indigo-700"
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <Edit3 size={19} />
                        Update Load
                      </>
                    ) : (
                      <>
                        <Plus size={19} />
                        Submit Load
                      </>
                    )}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <RotateCcw size={19} />
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>

          {/* Posted Loads */}
          <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-5 border-b border-slate-100 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                    <Package size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Posted Loads
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {loads.length} transportation request
                      {loads.length === 1 ? "" : "s"} currently
                      listed
                    </p>
                  </div>
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
                  placeholder="Search by route, cargo or truck..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {filteredLoads.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                  <Package size={34} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-800">
                  {loads.length === 0
                    ? "No loads posted yet"
                    : "No matching loads found"}
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  {loads.length === 0
                    ? "Complete the form above to create your first transportation request."
                    : "Try changing your search phrase to find another load."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-left">
                  <thead>
                    <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-6 py-4 font-semibold">
                        Route
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Cargo
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Weight
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Truck Type
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Pickup Date
                      </th>

                      <th className="px-6 py-4 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredLoads.map((load) => (
                      <tr
                        key={load.id}
                        className="transition hover:bg-blue-50/40"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                              <MapPin size={18} />
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                {load.pickup}
                              </p>

                              <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                                <ArrowRight size={14} />
                                {load.destination}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-violet-100 px-3 py-1.5 text-sm font-medium text-violet-700">
                            {load.cargoType}
                          </span>
                        </td>

                        <td className="px-6 py-5 font-medium text-slate-700">
                          {load.weight} tons
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-slate-700">
                            <Truck
                              size={17}
                              className="text-slate-400"
                            />

                            {load.truckType}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-slate-600">
                            <CalendarDays
                              size={17}
                              className="text-slate-400"
                            />

                            {load.pickupDate ||
                              "Not provided"}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(load)
                              }
                              className="flex items-center gap-2 rounded-xl bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-200"
                            >
                              <Edit3 size={16} />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(load.id)
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

export default LoadPosting;