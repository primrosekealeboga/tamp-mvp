import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  MapPin,
  Navigation,
  Package,
  Route,
  Search,
  ShieldCheck,
  Truck,
  UserRound,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useTAMP } from "../../context/TAMPContext";

function Tracking() {
  const {
    loads = [],
    trucks = [],
    matchDecisions = {}, 
  } = useTAMP();

  const [selectedShipmentId, setSelectedShipmentId] =
    useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const acceptedShipments = useMemo(() => {
    const shipments = [];

    Object.entries(matchDecisions).forEach(
      ([decisionKey, decision]) => {
        if (decision !== "Accepted") {
          return;
        }

        const [loadId, truckId] = decisionKey
          .split("-")
          .map(Number);

        const load = loads.find(
          (currentLoad) => currentLoad.id === loadId
        );

        const truck = trucks.find(
          (currentTruck) => currentTruck.id === truckId
        );

        if (load && truck) {
          shipments.push({
            id: decisionKey,
            load,
            truck,
          });
        }
      }
    );

    return shipments;
  }, [loads, trucks, matchDecisions]);

  const filteredShipments = acceptedShipments.filter(
  (shipment) => {
    const searchValue = searchTerm.toLowerCase().trim();

    const registrationNumber =
      shipment.truck?.registrationNumber ?? "";

    const driverName =
      shipment.truck?.driverName ?? "";

    const pickup =
      shipment.load?.pickup ?? "";

    const destination =
      shipment.load?.destination ?? "";

    const cargoType =
      shipment.load?.cargoType ?? "";

    return (
      registrationNumber
        .toLowerCase()
        .includes(searchValue) ||
      driverName
        .toLowerCase()
        .includes(searchValue) ||
      pickup
        .toLowerCase()
        .includes(searchValue) ||
      destination
        .toLowerCase()
        .includes(searchValue) ||
      cargoType
        .toLowerCase()
        .includes(searchValue)
    );
  }
);

  const selectedShipment =
    acceptedShipments.find(
      (shipment) =>
        shipment.id === selectedShipmentId
    ) ||
    acceptedShipments[0] ||
    null;

  const getTrackingStage = (truckStatus) => {
    switch (truckStatus) {
      case "Assigned":
        return 1;

      case "In Transit":
        return 2;

      case "Delivered":
        return 3;

      default:
        return 0;
    }
  };

  const trackingStage = selectedShipment
    ? getTrackingStage(
        selectedShipment.truck.status
      )
    : 0;

  const totalShipments = acceptedShipments.length;

  const inTransitShipments =
    acceptedShipments.filter(
      (shipment) =>
        shipment.truck.status === "In Transit"
    ).length;

  const assignedShipments =
    acceptedShipments.filter(
      (shipment) =>
        shipment.truck.status === "Assigned"
    ).length;

  const deliveredShipments =
    acceptedShipments.filter(
      (shipment) =>
        shipment.truck.status === "Delivered"
    ).length;

  const trackingSteps = [
    {
      title: "Match Accepted",
      description:
        "The truck was approved for this load.",
      icon: ShieldCheck,
    },
    {
      title: "Truck Assigned",
      description:
        "The vehicle and driver are assigned.",
      icon: Truck,
    },
    {
      title: "In Transit",
      description:
        "The shipment is travelling to its destination.",
      icon: Navigation,
    },
    {
      title: "Delivered",
      description:
        "The load has reached its destination.",
      icon: CheckCircle2,
    },
  ];

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
                  <Navigation size={17} />
                  Shipment Tracking
                </div>

                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Track every accepted shipment
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  Monitor matched trucks, routes, drivers and
                  delivery progress from one central tracking
                  workspace.
                </p>
              </div>

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/10 backdrop-blur">
                <MapPin size={38} />
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Shipments
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {totalShipments}
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
                    Assigned
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {assignedShipments}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <Truck size={23} />
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    In Transit
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {inTransitShipments}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <Navigation size={23} />
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Delivered
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {deliveredShipments}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <CheckCircle2 size={23} />
                </div>
              </div>
            </article>
          </section>

          {acceptedShipments.length === 0 ? (
            <section className="mt-6 flex flex-col items-center justify-center rounded-3xl border border-amber-200 bg-amber-50 px-6 py-16 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-100 text-amber-700">
                <AlertTriangle size={34} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                No accepted shipments yet
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                Accept a truck recommendation on the Matchmaking
                page. The accepted load and truck will then appear
                here automatically.
              </p>
            </section>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[380px_1fr]">
              {/* Shipment List */}
              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Active Shipments
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Select a shipment to view its progress.
                  </p>

                  <div className="relative mt-5">
                    <Search
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(event.target.value)
                      }
                      placeholder="Search shipments..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="max-h-[680px] space-y-3 overflow-y-auto p-4">
                  {filteredShipments.length === 0 ? (
                    <div className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">
                      No shipments match your search.
                    </div>
                  ) : (
                    filteredShipments.map((shipment) => {
                      const isSelected =
                        selectedShipment?.id === shipment.id;

                      return (
                        <button
                          key={shipment.id}
                          type="button"
                          onClick={() =>
                            setSelectedShipmentId(
                              shipment.id
                            )
                          }
                          className={`w-full rounded-2xl border p-4 text-left transition ${
                            isSelected
                              ? "border-blue-400 bg-blue-50 shadow-sm"
                              : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-bold text-slate-900">
                                {
                                  shipment.truck
                                    .registrationNumber
                                }
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                {
                                  shipment.load
                                    .cargoType
                                }
                              </p>
                            </div>

                            <Truck
                              size={20}
                              className={
                                isSelected
                                  ? "text-blue-700"
                                  : "text-slate-400"
                              }
                            />
                          </div>

                          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                            <MapPin
                              size={15}
                              className="text-blue-600"
                            />

                            {shipment.load.pickup}
                          </div>

                          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                            <ArrowRight
                              size={15}
                              className="text-slate-400"
                            />

                            {
                              shipment.load
                                .destination
                            }
                          </div>

                          <div className="mt-4">
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                              {
                                shipment.truck
                                  .status
                              }
                            </span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </section>

              {/* Tracking Details */}
              {selectedShipment && (
                <div className="space-y-6">
                  <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5 sm:px-8">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                            Shipment Details
                          </p>

                          <h2 className="mt-2 text-2xl font-bold text-slate-900">
                            {
                              selectedShipment.truck
                                .registrationNumber
                            }
                          </h2>
                        </div>

                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                          <Circle
                            size={10}
                            fill="currentColor"
                          />

                          {
                            selectedShipment.truck
                              .status
                          }
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 sm:p-8 xl:grid-cols-4">
                      <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <UserRound size={16} />
                          Driver
                        </div>

                        <p className="mt-3 font-bold text-slate-900">
                          {
                            selectedShipment.truck
                              .driverName
                          }
                        </p>
                      </article>

                      <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Package size={16} />
                          Cargo
                        </div>

                        <p className="mt-3 font-bold text-slate-900">
                          {
                            selectedShipment.load
                              .cargoType
                          }
                        </p>
                      </article>

                      <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Truck size={16} />
                          Truck Type
                        </div>

                        <p className="mt-3 font-bold text-slate-900">
                          {
                            selectedShipment.truck
                              .truckType
                          }
                        </p>
                      </article>

                      <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <CalendarDays size={16} />
                          Pickup Date
                        </div>

                        <p className="mt-3 font-bold text-slate-900">
                          {selectedShipment.load.pickupDate ||
                            "Not specified"}
                        </p>
                      </article>
                    </div>

                    <div className="border-t border-slate-100 p-6 sm:p-8">
                      <div className="rounded-2xl bg-slate-950 p-5 text-white">
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-slate-400">
                              Pickup
                            </p>

                            <p className="mt-2 font-bold">
                              {
                                selectedShipment.load
                                  .pickup
                              }
                            </p>
                          </div>

                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600">
                            <ArrowRight size={20} />
                          </div>

                          <div className="text-right">
                            <p className="text-xs uppercase tracking-wider text-slate-400">
                              Destination
                            </p>

                            <p className="mt-2 font-bold">
                              {
                                selectedShipment.load
                                  .destination
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Tracking Timeline */}
                  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                        <Route size={21} />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          Tracking Progress
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          Current delivery journey and milestones.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      {trackingSteps.map(
                        (step, index) => {
                          const StepIcon = step.icon;

                          const isCompleted =
                            index <= trackingStage;

                          const isLast =
                            index ===
                            trackingSteps.length - 1;

                          return (
                            <div
                              key={step.title}
                              className="relative flex gap-4"
                            >
                              {!isLast && (
                                <div
                                  className={`absolute left-[21px] top-11 h-full w-0.5 ${
                                    index <
                                    trackingStage
                                      ? "bg-emerald-400"
                                      : "bg-slate-200"
                                  }`}
                                />
                              )}

                              <div
                                className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-white ${
                                  isCompleted
                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100"
                                    : "bg-slate-200 text-slate-500"
                                }`}
                              >
                                <StepIcon size={19} />
                              </div>

                              <div
                                className={`pb-10 ${
                                  isLast
                                    ? "pb-0"
                                    : ""
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <h3 className="font-bold text-slate-900">
                                    {step.title}
                                  </h3>

                                  {isCompleted && (
                                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                      Completed
                                    </span>
                                  )}
                                </div>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                  {
                                    step.description
                                  }
                                </p>

                                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                                  <Clock3 size={14} />

                                  {isCompleted
                                    ? "Progress confirmed"
                                    : "Awaiting update"}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </section>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Tracking;