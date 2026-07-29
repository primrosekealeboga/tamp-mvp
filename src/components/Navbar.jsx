import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CheckCircle2,
  LogOut,
  Search,
  Settings,
  ShieldCheck,
  Truck,
  UserCircle2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] =
    useState(false);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showSettings, setShowSettings] =
    useState(false);

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const navbarRef = useRef(null);

  const currentUser =
    JSON.parse(
      localStorage.getItem("tampCurrentUser")
    ) || null;

  const displayName =
    currentUser?.fullName || "TAMP User";

  const displayRole =
    currentUser?.role || "Platform User";

  const notifications = [
    {
      id: 1,
      title: "Compliance review",
      message:
        "Your compliance status is pending verification.",
      time: "10 minutes ago",
    },
    {
      id: 2,
      title: "New match available",
      message:
        "A suitable truck and load match has been identified.",
      time: "35 minutes ago",
    },
    {
      id: 3,
      title: "Tracking update",
      message:
        "A delivery route status was updated.",
      time: "1 hour ago",
    },
  ];

  const searchablePages = [
    {
      name: "Dashboard",
      description: "View platform overview",
      path: "/dashboard",
    },
    {
      name: "Load Posting",
      description: "Create and manage freight loads",
      path: "/loads",
    },
    {
      name: "Truck Posting",
      description: "Register and manage trucks",
      path: "/trucks",
    },
    {
      name: "Matchmaking",
      description: "View recommended matches",
      path: "/matching",
    },
    {
      name: "Tracking",
      description: "Track active transport routes",
      path: "/tracking",
    },
    {
      name: "Admin Console",
      description: "Manage users and compliance",
      path: "/admin",
    },
  ];

  const searchResults = searchablePages.filter(
    (page) => {
      const searchValue =
        searchTerm.trim().toLowerCase();

      return (
        searchValue &&
        (page.name
          .toLowerCase()
          .includes(searchValue) ||
          page.description
            .toLowerCase()
            .includes(searchValue))
      );
    }
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setShowSearchResults(false);
        setShowNotifications(false);
        setShowSettings(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const closeAllMenus = () => {
    setShowSearchResults(false);
    setShowNotifications(false);
    setShowSettings(false);
    setShowProfileMenu(false);
  };

  const openPage = (path) => {
    closeAllMenus();
    setSearchTerm("");
    navigate(path);
  };

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

  const getRoleLabel = (role) => {
    switch (role) {
      case "Freight Owner":
        return "Freight Owner";

      case "Transporter":
        return "Transport Operator";

      case "Admin":
        return "Logistics Administrator";

      default:
        return "Platform User";
    }
  };

  const getRoleIcon = (role) => {
    if (role === "Admin") {
      return <ShieldCheck size={24} />;
    }

    if (role === "Transporter") {
      return <Truck size={24} />;
    }

    return <UserCircle2 size={26} />;
  };

  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-lg"
    >
      <div className="flex h-20 items-center justify-between px-6 lg:px-8">
        {/* Left Side */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, {displayName}! Here's
            what's happening today.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden lg:block">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
              <Search
                size={18}
                className="text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(
                    event.target.value
                  );

                  setShowSearchResults(true);
                  setShowNotifications(false);
                  setShowSettings(false);
                  setShowProfileMenu(false);
                }}
                onFocus={() =>
                  setShowSearchResults(true)
                }
                placeholder="Search pages..."
                className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setShowSearchResults(false);
                  }}
                  className="text-slate-400 transition hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {showSearchResults &&
              searchTerm && (
                <div className="absolute right-0 top-14 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map(
                        (page) => (
                          <button
                            key={page.path}
                            type="button"
                            onClick={() =>
                              openPage(page.path)
                            }
                            className="w-full rounded-xl px-4 py-3 text-left transition hover:bg-slate-50"
                          >
                            <p className="font-semibold text-slate-900">
                              {page.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {
                                page.description
                              }
                            </p>
                          </button>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <Search
                        size={28}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        No results found
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Try another page name.
                      </p>
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifications(
                  (previousValue) =>
                    !previousValue
                );

                setShowSettings(false);
                setShowProfileMenu(false);
                setShowSearchResults(false);
              }}
              className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-blue-100"
              aria-label="Notifications"
            >
              <Bell
                size={20}
                className="text-slate-700"
              />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-14 w-96 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Notifications
                    </h3>

                    <p className="text-xs text-slate-500">
                      Recent platform updates
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {notifications.length} New
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {notifications.map(
                    (notification) => (
                      <button
                        key={notification.id}
                        type="button"
                        className="flex w-full gap-3 p-4 text-left transition hover:bg-slate-50"
                      >
                        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                          <Bell size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {
                              notification.title
                            }
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {
                              notification.message
                            }
                          </p>

                          <p className="mt-2 text-xs font-medium text-blue-600">
                            {notification.time}
                          </p>
                        </div>
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowNotifications(false)
                  }
                  className="w-full border-t border-slate-200 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowSettings(
                  (previousValue) =>
                    !previousValue
                );

                setShowNotifications(false);
                setShowProfileMenu(false);
                setShowSearchResults(false);
              }}
              className="rounded-xl bg-slate-100 p-3 transition hover:bg-blue-100"
              aria-label="Settings"
            >
              <Settings
                size={20}
                className="text-slate-700"
              />
            </button>

            {showSettings && (
              <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                <div className="border-b border-slate-200 px-5 py-4">
                  <h3 className="font-bold text-slate-900">
                    Settings
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Platform preferences
                  </p>
                </div>

                <div className="space-y-2 p-3">
                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        "Notification settings saved."
                      );
                      setShowSettings(false);
                    }}
                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Notification Preferences
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        "Privacy settings opened."
                      );
                      setShowSettings(false);
                    }}
                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Privacy and Security
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        "Display settings opened."
                      );
                      setShowSettings(false);
                    }}
                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Display Preferences
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowProfileMenu(
                  (previousValue) =>
                    !previousValue
                );

                setShowNotifications(false);
                setShowSettings(false);
                setShowSearchResults(false);
              }}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                {getRoleIcon(displayRole)}
              </div>

              <div className="hidden text-left md:block">
                <p className="max-w-40 truncate font-semibold text-slate-900">
                  {displayName}
                </p>

                <p className="text-xs text-slate-500">
                  {getRoleLabel(displayRole)}
                </p>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-16 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                <div className="border-b border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      {getRoleIcon(
                        displayRole
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-bold text-slate-900">
                        {displayName}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {currentUser?.email ||
                          "No email available"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 size={15} />
                    {currentUser?.complianceStatus ||
                      "Pending Verification"}
                  </div>
                </div>

                <div className="p-3">
                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        "Profile editing will be added next."
                      );
                      setShowProfileMenu(false);
                    }}
                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    View Profile
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;