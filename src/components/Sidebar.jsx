import {
  LayoutDashboard,
  MapPin,
  Package,
  Route,
  Truck,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Load Posting",
      path: "/loads",
      icon: Package,
    },
    {
      name: "Truck Posting",
      path: "/trucks",
      icon: Truck,
    },
    {
      name: "Matchmaking",
      path: "/matching",
      icon: Route,
    },
    {
      name: "Tracking",
      path: "/tracking",
      icon: MapPin,
    },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 flex-col overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-950 text-white shadow-2xl lg:flex">
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-950/40">
            <Truck size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              TAMP
            </h1>

            <p className="mt-1 text-xs text-blue-200">
              Logistics Platform
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Main Menu
        </p>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-950/30"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                        isActive
                          ? "bg-white/15"
                          : "bg-white/5 group-hover:bg-white/10"
                      }`}
                    >
                      <Icon size={19} />
                    </span>

                    <span>{item.name}</span>

                    {isActive && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-blue-200" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
              <Truck size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Fleet Status
              </p>

              <p className="mt-1 text-xs text-slate-400">
                System operational
              </p>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;