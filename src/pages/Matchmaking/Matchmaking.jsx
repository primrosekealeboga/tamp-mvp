import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  CheckCircle2,
  CircleGauge,
  MapPin,
  Package,
  RotateCcw,
  Scale,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRound,
  XCircle,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
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

  const selectedLoadDecisions = selectedLoad
    ? matchingTrucks.map((truck) => {
        const decisionKey = `${selectedLoad.id}-${truck.id}`;

        return matchDecisions[decisionKey];
      })
    : [];

  const acceptedMatches = selectedLoadDecisions.filter(
    (decision) => decision === "Accepted"
  ).length;

  const rejectedMatches = selectedLoadDecisions.filter(
    (decision) => decision === "Rejected"
  ).length;

  const pendingMatches =
    matchingTrucks.length -
    acceptedMatches -
    rejectedMatches;

  const calculateMatchScore = (truck) => {
    if (!selectedLoad) {
      return 0;
    }

    let score = 0;

    if (
      truck.truckType.toLowerCase() ===
      selectedLoad.truckType.toLowerCase()
    ) {
      score += 30;
    }

    if (
      Number(truck.capacity) >=
      Number(selectedLoad.weight)
    ) {
      score += 25;
    }

    if (
      truck.currentLocation.toLowerCase() ===
      selectedLoad.pickup.toLowerCase()
    ) {
      score += 20;
    }

    if (
      truck.destination.toLowerCase() ===
      selectedLoad.destination.toLowerCase()
    ) {
      score += 20;
    }

    if (truck.status === "Available") {
      score += 5;
    }

    return score;
  };

  const getScoreStyles = (score) => {
    if (score >= 90) {
      return {
        badge: "bg-emerald-100 text-emerald-700",
        bar: "bg-emerald-500",
        label: "Excellent match",
      };
    }

    if (score >= 75) {
      return {
        badge: "bg-blue-100 text-blue-700",
        bar: "bg-blue-500",
        label: "Strong match",
      };
    }

    return {
      badge: "bg-amber-100 text-amber-700",
      bar: "bg-amber-500",
      label: "Compatible match",
    };
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
                  <Sparkles size={17} />
                  Intelligent Matchmaking
                </div>

                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Match every load with the right truck
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  Select a transport load and review compatible,
                  available trucks based on route, capacity,
                  vehicle type and status.
                </p>
              </div>

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/10 backdrop-blur">
                <SearchCheck size={38} />
              </div>
            </div>
          </section>

          {/* Overview Statistics */}
          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Available Loads
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

            <article className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Compatible Trucks
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {matchingTrucks.length}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <Truck size={23} />
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Accepted
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {acceptedMatches}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <CheckCircle2 size={23} />
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Pending Review
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {pendingMatches}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <CircleGauge size={23} />
                </div>
              </div>
            </article>
          </section>

          {/* Load Selection */}
          <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Package size={23} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Select a Load
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose the transportation request you want to
                    match.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {loads.length === 0 ? (
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
                  <AlertTriangle
                    size={21}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="font-semibold">
                      No loads are available
                    </p>

                    <p className="mt-1 text-sm">
                      Create a load on the Load Posting page before
                      using matchmaking.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="selectedLoad"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Transportation Load
                  </label>

                  <div className="relative">
                    <Package
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      id="selectedLoad"
                      value={selectedLoadId}
                      onChange={(event) =>
                        setSelectedLoadId(event.target.value)
                      }
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pl-11 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">
                        Choose a load to begin matching
                      </option>

                      {loads.map((load) => (
                        <option
                          key={load.id}
                          value={load.id}
                        >
                          {load.pickup} →{" "}
                          {load.destination} |{" "}
                          {load.truckType} |{" "}
                          {load.weight} tons
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Selected Load */}
          {selectedLoad && (
            <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-5 border-b border-slate-100 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                    <Package size={23} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Selected Load
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Review the transport requirements before
                      choosing a truck.
                    </p>
                  </div>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                  <ShieldCheck size={16} />
                  Ready for matching
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 sm:p-8 xl:grid-cols-4">
                <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <MapPin size={17} />
                    Route
                  </div>

                  <p className="mt-3 font-bold text-slate-900">
                    {selectedLoad.pickup}
                  </p>

                  <div className="my-2 flex items-center gap-2 text-sm text-slate-400">
                    <ArrowRight size={15} />
                    Destination
                  </div>

                  <p className="font-semibold text-slate-700">
                    {selectedLoad.destination}
                  </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <Package size={17} />
                    Cargo
                  </div>

                  <p className="mt-4 text-lg font-bold text-slate-900">
                    {selectedLoad.cargoType}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Transportation cargo type
                  </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <Truck size={17} />
                    Required Truck
                  </div>

                  <p className="mt-4 text-lg font-bold text-slate-900">
                    {selectedLoad.truckType}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Required vehicle category
                  </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <Scale size={17} />
                    Load Weight
                  </div>

                  <p className="mt-4 text-lg font-bold text-slate-900">
                    {selectedLoad.weight} tons
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Minimum truck capacity
                  </p>
                </article>
              </div>
            </section>
          )}

          {/* Recommendations */}
          {selectedLoad && (
            <section className="mt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
                    <SearchCheck size={17} />
                    Recommendations
                  </div>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    Compatible Trucks
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Trucks that satisfy all current load
                    requirements.
                  </p>
                </div>

                {matchingTrucks.length > 0 && (
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                    <span className="font-bold text-slate-900">
                      {matchingTrucks.length}
                    </span>{" "}
                    match
                    {matchingTrucks.length === 1 ? "" : "es"} found
                  </div>
                )}
              </div>

              {matchingTrucks.length === 0 ? (
                <div className="mt-5 flex flex-col items-center justify-center rounded-3xl border border-amber-200 bg-amber-50 px-6 py-14 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-100 text-amber-700">
                    <AlertTriangle size={34} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    No compatible trucks found
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                    A truck must match the required type, capacity,
                    pickup location, destination and have an
                    Available status.
                  </p>
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-1 gap-6 xl:grid-cols-2">
                  {matchingTrucks.map((truck, index) => {
                    const decisionKey = `${selectedLoad.id}-${truck.id}`;

                    const decision =
                      matchDecisions[decisionKey];

                    const score = calculateMatchScore(truck);
                    const scoreStyles =
                      getScoreStyles(score);

                    const spareCapacity =
                      Number(truck.capacity) -
                      Number(selectedLoad.weight);

                    return (
                      <article
                        key={truck.id}
                        className={`relative overflow-hidden rounded-3xl border bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl ${
                          decision === "Accepted"
                            ? "border-emerald-300"
                            : decision === "Rejected"
                              ? "border-red-300"
                              : "border-slate-200"
                        }`}
                      >
                        {index === 0 && (
                          <div className="absolute right-0 top-0 flex items-center gap-2 rounded-bl-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                            <Award size={15} />
                            Best Match
                          </div>
                        )}

                        <div className="p-6 sm:p-7">
                          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                                <Truck size={27} />
                              </div>

                              <div>
                                <h3 className="text-xl font-bold text-slate-900">
                                  {truck.registrationNumber}
                                </h3>

                                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                                  <UserRound size={16} />
                                  {truck.driverName}
                                </div>
                              </div>
                            </div>

                            <span
                              className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${scoreStyles.badge}`}
                            >
                              <Sparkles size={15} />
                              {score}% Match
                            </span>
                          </div>

                          {/* Match score */}
                          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-semibold text-slate-700">
                                Compatibility score
                              </span>

                              <span className="font-medium text-slate-500">
                                {scoreStyles.label}
                              </span>
                            </div>

                            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className={`h-full rounded-full ${scoreStyles.bar}`}
                                style={{
                                  width: `${score}%`,
                                }}
                              />
                            </div>
                          </div>

                          {/* Truck details */}
                          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 p-4">
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Truck size={16} />
                                Truck Type
                              </div>

                              <p className="mt-2 font-bold text-slate-900">
                                {truck.truckType}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 p-4">
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Scale size={16} />
                                Capacity
                              </div>

                              <p className="mt-2 font-bold text-slate-900">
                                {truck.capacity} tons
                              </p>

                              <p className="mt-1 text-xs text-emerald-600">
                                {spareCapacity} tons spare
                              </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 p-4">
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <MapPin size={16} />
                                Current Location
                              </div>

                              <p className="mt-2 font-bold text-slate-900">
                                {truck.currentLocation}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 p-4">
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <ArrowRight size={16} />
                                Destination
                              </div>

                              <p className="mt-2 font-bold text-slate-900">
                                {truck.destination}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-800">
                            <ShieldCheck
                              size={20}
                              className="mt-0.5 shrink-0"
                            />

                            <p className="text-sm leading-6">
                              This truck matches the vehicle type,
                              required capacity, pickup location,
                              destination and availability status.
                            </p>
                          </div>

                          {/* Decision */}
                          {decision ? (
                            <div className="mt-6">
                              <div
                                className={`flex items-center justify-center gap-2 rounded-2xl p-4 font-semibold ${
                                  decision === "Accepted"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {decision === "Accepted" ? (
                                  <CheckCircle2 size={20} />
                                ) : (
                                  <XCircle size={20} />
                                )}

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
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                              >
                                <RotateCcw size={18} />
                                Undo Decision
                              </button>
                            </div>
                          ) : (
                            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleMatchDecision(
                                    selectedLoad.id,
                                    truck.id,
                                    "Accepted"
                                  )
                                }
                                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:from-emerald-600 hover:to-green-700"
                              >
                                <CheckCircle2 size={19} />
                                Accept Match
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
                                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-700 transition hover:bg-red-100"
                              >
                                <XCircle size={19} />
                                Reject Match
                              </button>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default Matchmaking;