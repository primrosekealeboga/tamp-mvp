import {
  Activity,
  CheckCircle2,
  MapPin,
  Package,
  Truck,
  Users,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useTAMP } from "../../context/TAMPContext";

function Dashboard() {
  const {
    loads,
    trucks,
    matchDecisions,
  } = useTAMP();

  const availableTrucks = trucks.filter(
    (truck) => truck.status === "Available"
  ).length;

  const deliveriesInProgress = trucks.filter(
    (truck) =>
      truck.status === "Assigned" ||
      truck.status === "In Transit"
  ).length;

  const acceptedMatches = Object.values(matchDecisions).filter(
    (decision) => decision === "Accepted"
  ).length;

  const activeDrivers = trucks.filter(
    (truck) =>
      truck.status !== "Maintenance" &&
      truck.status !== "Unavailable"
  ).length;

  const dashboardCards = [
    {
      title: "Total Trucks",
      value: trucks.length,
      description: "Registered fleet vehicles",
      icon: Truck,
      iconStyle: "bg-blue-100 text-blue-700",
      borderStyle: "border-blue-200",
    },
    {
      title: "Active Loads",
      value: loads.length,
      description: "Loads ready for transport",
      icon: Package,
      iconStyle: "bg-violet-100 text-violet-700",
      borderStyle: "border-violet-200",
    },
    {
      title: "Successful Matches",
      value: acceptedMatches,
      description: "Accepted truck and load matches",
      icon: CheckCircle2,
      iconStyle: "bg-emerald-100 text-emerald-700",
      borderStyle: "border-emerald-200",
    },
    {
      title: "Available Trucks",
      value: availableTrucks,
      description: "Trucks available for matching",
      icon: Activity,
      iconStyle: "bg-cyan-100 text-cyan-700",
      borderStyle: "border-cyan-200",
    },
    {
      title: "Deliveries In Progress",
      value: deliveriesInProgress,
      description: "Assigned or in-transit trucks",
      icon: MapPin,
      iconStyle: "bg-orange-100 text-orange-700",
      borderStyle: "border-orange-200",
    },
    {
      title: "Active Drivers",
      value: activeDrivers,
      description: "Drivers currently operational",
      icon: Users,
      iconStyle: "bg-rose-100 text-rose-700",
      borderStyle: "border-rose-200",
    },
  ];

  const acceptanceRate =
    Object.keys(matchDecisions).length > 0
      ? Math.round(
          (acceptedMatches /
            Object.keys(matchDecisions).length) *
            100
        )
      : 0;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Navbar />

        <main className="p-5 sm:p-6 lg:p-8">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-900 px-6 py-8 text-white shadow-xl sm:px-8">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-200">
                Truck Asset Matchmaking Platform
              </p>

              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                Dashboard Overview
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Monitor your trucks, loads, drivers and active
                matchmaking activity from one central dashboard.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                  {trucks.length} trucks registered
                </div>

                <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                  {loads.length} loads posted
                </div>

                <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                  {acceptanceRate}% acceptance rate
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Platform Summary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Live statistics from your shared application data.
                </p>
              </div>

              <span className="w-fit rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                System operational
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {dashboardCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className={`group rounded-2xl border ${card.borderStyle} bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          {card.title}
                        </p>

                        <p className="mt-3 text-4xl font-bold text-slate-900">
                          {card.value}
                        </p>
                      </div>

                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconStyle} transition duration-300 group-hover:scale-110`}
                      >
                        <Icon size={24} />
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <p className="text-sm text-slate-500">
                        {card.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Matchmaking Performance
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Overview of truck and load matching decisions.
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <CheckCircle2 size={22} />
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-600">
                    Acceptance rate
                  </span>

                  <span className="font-bold text-slate-900">
                    {acceptanceRate}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                    style={{
                      width: `${acceptanceRate}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Total decisions
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {Object.keys(matchDecisions).length}
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-sm text-emerald-700">
                    Accepted matches
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-800">
                    {acceptedMatches}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-sm text-blue-700">
                    Available trucks
                  </p>

                  <p className="mt-2 text-2xl font-bold text-blue-800">
                    {availableTrucks}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 p-6 text-white shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Truck size={24} />
              </div>

              <h2 className="mt-5 text-xl font-bold">
                Fleet Readiness
              </h2>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Your platform currently has {availableTrucks} truck
                {availableTrucks === 1 ? "" : "s"} ready for new
                load assignments.
              </p>

              <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-100">
                    Available fleet
                  </span>

                  <span className="text-2xl font-bold">
                    {availableTrucks}/{trucks.length}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;