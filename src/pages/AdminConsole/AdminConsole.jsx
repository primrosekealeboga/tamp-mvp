import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Search,
  ShieldCheck,
  Truck,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";

import Sidebar from "../Components/Sidebar";

function AdminConsole() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [users, setUsers] = useState(() => {
    const registeredUsers =
      JSON.parse(
        localStorage.getItem("tampUsers")
      ) || [];

    return registeredUsers.map((user) => ({
      ...user,
      complianceStatus:
        user.complianceStatus ||
        "Pending Verification",
    }));
  });

  const mockActivities = [
    {
      id: 1,
      user: "Freight Owner",
      action: "Posted a new cargo load",
      time: "10 minutes ago",
      status: "Completed",
    },
    {
      id: 2,
      user: "Transporter",
      action: "Registered an available truck",
      time: "25 minutes ago",
      status: "Completed",
    },
    {
      id: 3,
      user: "Administrator",
      action: "Reviewed a compliance profile",
      time: "1 hour ago",
      status: "Reviewed",
    },
    {
      id: 4,
      user: "Freight Owner",
      action: "Accepted a recommended match",
      time: "2 hours ago",
      status: "Completed",
    },
  ];

  const mockFlags = [
    {
      id: "FLAG-001",
      type: "Compliance",
      description:
        "Transporter document verification is pending.",
      priority: "Medium",
      status: "Open",
    },
    {
      id: "FLAG-002",
      type: "Dispute",
      description:
        "Delivery status disputed by freight owner.",
      priority: "High",
      status: "Under Review",
    },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue =
        searchTerm.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        user.fullName
          ?.toLowerCase()
          .includes(searchValue) ||
        user.email
          ?.toLowerCase()
          .includes(searchValue) ||
        user.companyName
          ?.toLowerCase()
          .includes(searchValue) ||
        user.role
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        user.complianceStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, statusFilter]);

  const totalUsers = users.length;

  const approvedUsers = users.filter(
    (user) =>
      user.complianceStatus === "Approved"
  ).length;

  const pendingUsers = users.filter(
    (user) =>
      user.complianceStatus ===
      "Pending Verification"
  ).length;

  const transporterCount = users.filter(
    (user) => user.role === "Transporter"
  ).length;

  const updateComplianceStatus = (
    userId,
    newStatus
  ) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            complianceStatus: newStatus,
          }
        : user
    );

    setUsers(updatedUsers);

    localStorage.setItem(
      "tampUsers",
      JSON.stringify(updatedUsers)
    );

    const currentUser = JSON.parse(
      localStorage.getItem("tampCurrentUser")
    );

    if (currentUser?.id === userId) {
      localStorage.setItem(
        "tampCurrentUser",
        JSON.stringify({
          ...currentUser,
          complianceStatus: newStatus,
        })
      );
    }
  };

  const metricCards = [
    {
      title: "Registered Users",
      value: totalUsers,
      description: "All platform profiles",
      icon: Users,
      iconStyle:
        "bg-blue-100 text-blue-700",
    },
    {
      title: "Approved Profiles",
      value: approvedUsers,
      description: "Compliance approved",
      icon: UserCheck,
      iconStyle:
        "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Pending Verification",
      value: pendingUsers,
      description: "Require admin review",
      icon: ShieldCheck,
      iconStyle:
        "bg-amber-100 text-amber-700",
    },
    {
      title: "Transporters",
      value: transporterCount,
      description: "Registered operators",
      icon: Truck,
      iconStyle:
        "bg-violet-100 text-violet-700",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        {/* Header */}
        <section className="border-b border-slate-200 bg-white px-6 py-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                  <ShieldCheck size={18} />
                  Administrator Workspace
                </div>

                <h1 className="mt-2 text-3xl font-bold text-slate-900">
                  Admin Console
                </h1>

                <p className="mt-2 text-slate-500">
                  Manage users, compliance,
                  platform activity and flagged
                  matters.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                System Operational
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-10">
          {/* KPI Cards */}
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {metricCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {card.title}
                      </p>

                      <p className="mt-3 text-3xl font-bold text-slate-900">
                        {card.value}
                      </p>
                    </div>

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconStyle}`}
                    >
                      <Icon size={23} />
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-500">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </section>

          {/* User Management */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    User and Compliance Management
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Review registered profiles and
                    update verification status.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(
                          event.target.value
                        )
                      }
                      placeholder="Search users..."
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:w-64"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(
                        event.target.value
                      )
                    }
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="All">
                      All statuses
                    </option>

                    <option value="Approved">
                      Approved
                    </option>

                    <option value="Pending Verification">
                      Pending Verification
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <Users
                  size={45}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 font-semibold text-slate-800">
                  No users found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Register accounts from the login
                  page or adjust your search.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                        User
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                        Role
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                        Company
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                        Compliance
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {user.fullName}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {user.role}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {user.companyName ||
                            "Not provided"}
                        </td>

                        <td className="px-6 py-5">
                          <ComplianceBadge
                            status={
                              user.complianceStatus
                            }
                          />
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateComplianceStatus(
                                  user.id,
                                  "Approved"
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                            >
                              <CheckCircle2
                                size={15}
                              />
                              Approve
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateComplianceStatus(
                                  user.id,
                                  "Pending Verification"
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                            >
                              <AlertTriangle
                                size={15}
                              />
                              Pending
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateComplianceStatus(
                                  user.id,
                                  "Rejected"
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                            >
                              <XCircle
                                size={15}
                              />
                              Reject
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

          <div className="grid gap-8 xl:grid-cols-2">
            {/* Audit Activity */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <Activity size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Audit Activity
                    </h2>

                    <p className="text-sm text-slate-500">
                      Recent platform actions
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {mockActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-5"
                  >
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />

                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-800">
                        {activity.action}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {activity.user} •{" "}
                        {activity.time}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Disputes and Flags */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-700">
                    <AlertTriangle size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Disputes and Flags
                    </h2>

                    <p className="text-sm text-slate-500">
                      Matters requiring attention
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-5">
                {mockFlags.map((flag) => (
                  <div
                    key={flag.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-slate-900">
                            {flag.id}
                          </span>

                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                            {flag.type}
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {flag.description}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          flag.priority === "High"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {flag.priority}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs font-semibold text-slate-500">
                        Status: {flag.status}
                      </span>

                      <button
                        type="button"
                        className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                      >
                        Review Matter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function ComplianceBadge({ status }) {
  const styles = {
    Approved:
      "bg-emerald-50 text-emerald-700",
    "Pending Verification":
      "bg-amber-50 text-amber-700",
    Rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          status === "Approved"
            ? "bg-emerald-500"
            : status === "Rejected"
              ? "bg-red-500"
              : "bg-amber-500"
        }`}
      />

      {status}
    </span>
  );
}

export default AdminConsole;