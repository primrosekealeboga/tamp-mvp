import {
  Bell,
  Search,
  Settings,
  UserCircle2,
} from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="flex h-20 items-center justify-between px-6 lg:px-8">
        {/* Left Side */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 lg:flex">
            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Notifications */}
          <button className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-blue-100">
            <Bell
              size={20}
              className="text-slate-700"
            />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Settings */}
          <button className="rounded-xl bg-slate-100 p-3 transition hover:bg-blue-100">
            <Settings
              size={20}
              className="text-slate-700"
            />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <UserCircle2 size={26} />
            </div>

            <div className="hidden text-left md:block">
              <p className="font-semibold text-slate-900">
                Kealeboga
              </p>

              <p className="text-xs text-slate-500">
                Logistics Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;