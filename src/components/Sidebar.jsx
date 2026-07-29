import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Route,
  ShieldCheck,
  Truck,
  UserRound,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const currentUser =
    JSON.parse(
      localStorage.getItem("tampCurrentUser")
    ) || null;

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      roles: [
        "Freight Owner",
        "Transporter",
        "Admin",
      ],
    },
    {
      name: "Load Posting",
      path: "/loads",
      icon: Package,
      roles: ["Freight Owner"],
    },
    {
      name: "Truck Posting",
      path: "/trucks",
      icon: Truck,
      roles: ["Transporter"],
    },
    {
      name: "Matchmaking",
      path: "/matching",
      icon: Route,
      roles: [
        "Freight Owner",
        "Transporter",
      ],
    },
    {
      name: "Tracking",
      path: "/tracking",
      icon: MapPin,
      roles: [
        "Freight Owner",
        "Transporter",
      ],
    },
    {
      name: "Admin Console",
      path: "/admin",
      icon: ShieldCheck,
      roles: ["Admin"],
    },
  ];

  const userRole =
    currentUser?.role || "Freight Owner";

  const visibleNavigationItems =
    navigationItems.filter((item) =>
      item.roles.includes(userRole)
    );

  const handleLogout = () => {
    const shouldLogout = window.confirm(
      "Are you sure you want to log out?"
    );

    if (!shouldLogout) {
      return;
    }

    localStorage.removeItem("tampCurrentUser");
    navigate("/");
  };

  const getInitials = (fullName) => {
    if (!fullName) {
      return "TU";
    }

    return fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  };

  const getRoleStyles = (role) => {
    switch (role) {
      case "Freight Owner":
        return "bg-blue-500/20 text-blue-200";

      case "Transporter":
        return "bg-emerald-500/20 text-emerald-200";

      case "Admin":
        return "bg-violet-500/20 text-violet-200";

      default:
        return "bg-slate-500/20 text-slate-200";
    }
  };

  return (
    <aside
      className={`sticky top-0 hidden h-screen flex-shrink-0 flex-col overflow-y-auto overflow-x-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-950 text-white shadow-2xl transition-all duration-300 lg:flex ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo and Toggle */}
      <div
        className={`flex items-center border-b border-white/10 py-6 ${
          isCollapsed
            ? "justify-center px-3"
            : "justify-between px-6"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-950/40">
            <Truck size={24} />
          </div>

          {!isCollapsed && (
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                TAMP
              </h1>

              <p className="mt-1 text-xs text-blue-200">
                Logistics Platform
              </p>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            type="button"
            onClick={() =>
              setIsCollapsed(true)
            }
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {isCollapsed && (
        <div className="flex justify-center border-b border-white/10 py-3">
          <button
            type="button"
            onClick={() =>
              setIsCollapsed(false)
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Expand sidebar"
            title="Expand sidebar"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Current User */}
      <div
        className={
          isCollapsed
            ? "px-3 pt-5"
            : "px-4 pt-5"
        }
      >
        <div
          className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur ${
            isCollapsed
              ? "flex justify-center p-3"
              : "p-4"
          }`}
        >
          <div
            className={`flex items-center ${
              isCollapsed
                ? "justify-center"
                : "gap-3"
            }`}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white"
              title={
                currentUser?.fullName ||
                "TAMP User"
              }
            >
              {getInitials(
                currentUser?.fullName
              )}
            </div>

            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {currentUser?.fullName ||
                    "TAMP User"}
                </p>

                <p className="mt-1 truncate text-xs text-slate-400">
                  {currentUser?.companyName ||
                    currentUser?.email ||
                    "Logistics account"}
                </p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="mt-4 flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getRoleStyles(
                  userRole
                )}`}
              >
                {userRole === "Admin" ? (
                  <ShieldCheck size={13} />
                ) : userRole ===
                  "Transporter" ? (
                  <Truck size={13} />
                ) : (
                  <UserRound size={13} />
                )}

                {userRole}
              </span>

              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  currentUser?.complianceStatus ===
                  "Approved"
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                }`}
                title={
                  currentUser?.complianceStatus ||
                  "Pending Verification"
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div
        className={`flex-1 py-6 ${
          isCollapsed ? "px-3" : "px-4"
        }`}
      >
        {!isCollapsed && (
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Main Menu
          </p>
        )}

        <nav className="space-y-2">
          {visibleNavigationItems.map(
            (item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  title={
                    isCollapsed
                      ? item.name
                      : undefined
                  }
                  className={({ isActive }) =>
                    `group flex items-center rounded-xl py-3 text-sm font-medium transition duration-200 ${
                      isCollapsed
                        ? "justify-center px-2"
                        : "gap-3 px-4"
                    } ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-950/30"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                          isActive
                            ? "bg-white/15"
                            : "bg-white/5 group-hover:bg-white/10"
                        }`}
                      >
                        <Icon size={19} />
                      </span>

                      {!isCollapsed && (
                        <>
                          <span>
                            {item.name}
                          </span>

                          {isActive && (
                            <span className="ml-auto h-2 w-2 rounded-full bg-blue-200" />
                          )}
                        </>
                      )}
                    </>
                  )}
                </NavLink>
              );
            }
          )}
        </nav>
      </div>

      {/* Compliance Status */}
      <div
        className={
          isCollapsed
            ? "px-3 pb-4"
            : "px-4 pb-4"
        }
      >
        <div
          className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur ${
            isCollapsed
              ? "flex justify-center p-3"
              : "p-4"
          }`}
          title={
            isCollapsed
              ? currentUser?.complianceStatus ||
                "Pending Verification"
              : undefined
          }
        >
          <div
            className={`flex items-center ${
              isCollapsed
                ? "justify-center"
                : "gap-3"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                currentUser?.complianceStatus ===
                "Approved"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-amber-500/20 text-amber-300"
              }`}
            >
              <ShieldCheck size={20} />
            </div>

            {!isCollapsed && (
              <div>
                <p className="text-sm font-semibold text-white">
                  Compliance
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {currentUser?.complianceStatus ||
                    "Pending Verification"}
                </p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${
                  currentUser?.complianceStatus ===
                  "Approved"
                    ? "w-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                    : "w-1/2 bg-gradient-to-r from-amber-400 to-orange-400"
                }`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Logout */}
      <div
        className={`mt-auto border-t border-white/10 p-4 ${
          isCollapsed
            ? "flex justify-center"
            : ""
        }`}
      >
        <button
          type="button"
          onClick={handleLogout}
          title={
            isCollapsed
              ? "Logout"
              : undefined
          }
          className={`group flex items-center rounded-xl py-3 text-sm font-semibold text-slate-300 transition hover:bg-red-500/15 hover:text-red-200 ${
            isCollapsed
              ? "justify-center px-3"
              : "w-full gap-3 px-4"
          }`}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 transition group-hover:bg-red-500/20">
            <LogOut size={18} />
          </span>

          {!isCollapsed && (
            <span>Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;