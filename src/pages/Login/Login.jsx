import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Truck,
  UserRound,
  UsersRound,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "Freight Owner",
  });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    password: "",
    confirmPassword: "",
    role: "Freight Owner",
  });

  const [showLoginPassword, setShowLoginPassword] =
    useState(false);

  const [showRegisterPassword, setShowRegisterPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const roles = [
    {
      name: "Freight Owner",
      description: "Post loads and review matching trucks.",
      icon: Building2,
    },
    {
      name: "Transporter",
      description: "Register trucks and manage transport jobs.",
      icon: Truck,
    },
    {
      name: "Admin",
      description: "Manage users, compliance and activity.",
      icon: ShieldCheck,
    },
  ];

  const showMessage = (text, type) => {
    setMessage({
      text,
      type,
    });
  };

  const clearMessage = () => {
    if (message.text) {
      setMessage({
        text: "",
        type: "",
      });
    }
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    clearMessage();
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;

    setRegisterData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    clearMessage();
  };

  const handleRoleSelection = (
    role,
    formType
  ) => {
    if (formType === "login") {
      setLoginData((previousData) => ({
        ...previousData,
        role,
      }));
    } else {
      setRegisterData((previousData) => ({
        ...previousData,
        role,
      }));
    }

    clearMessage();
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const email = loginData.email.trim().toLowerCase();
    const password = loginData.password.trim();

    if (!email || !password || !loginData.role) {
      showMessage(
        "Please enter your email, password and select a role.",
        "error"
      );

      return;
    }

    const storedUsers =
      JSON.parse(
        localStorage.getItem("tampUsers")
      ) || [];

    const matchedUser = storedUsers.find(
      (user) =>
        user.email.toLowerCase() === email &&
        user.password === password &&
        user.role === loginData.role
    );

    if (!matchedUser) {
      showMessage(
        "No matching account was found. Check your details and selected role, or create an account.",
        "error"
      );

      return;
    }

    const loggedInUser = {
      id: matchedUser.id,
      fullName: matchedUser.fullName,
      email: matchedUser.email,
      companyName: matchedUser.companyName,
      role: matchedUser.role,
      complianceStatus:
        matchedUser.complianceStatus,
    };

    localStorage.setItem(
      "tampCurrentUser",
      JSON.stringify(loggedInUser)
    );

    showMessage(
      `Welcome back, ${matchedUser.fullName}.`,
      "success"
    );

    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const fullName =
      registerData.fullName.trim();

    const email =
      registerData.email
        .trim()
        .toLowerCase();

    const companyName =
      registerData.companyName.trim();

    const password =
      registerData.password.trim();

    const confirmPassword =
      registerData.confirmPassword.trim();

    if (
      !fullName ||
      !email ||
      !companyName ||
      !password ||
      !confirmPassword ||
      !registerData.role
    ) {
      showMessage(
        "Please complete all registration fields.",
        "error"
      );

      return;
    }

    if (!email.includes("@")) {
      showMessage(
        "Please enter a valid email address.",
        "error"
      );

      return;
    }

    if (password.length < 6) {
      showMessage(
        "Password must contain at least 6 characters.",
        "error"
      );

      return;
    }

    if (password !== confirmPassword) {
      showMessage(
        "Passwords do not match.",
        "error"
      );

      return;
    }

    const storedUsers =
      JSON.parse(
        localStorage.getItem("tampUsers")
      ) || [];

    const accountExists = storedUsers.some(
      (user) =>
        user.email.toLowerCase() === email
    );

    if (accountExists) {
      showMessage(
        "An account with this email address already exists.",
        "error"
      );

      return;
    }

    const newUser = {
      id: Date.now(),
      fullName,
      email,
      companyName,
      password,
      role: registerData.role,
      complianceStatus:
        registerData.role === "Admin"
          ? "Approved"
          : "Pending Verification",
      rating: 0,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [
      ...storedUsers,
      newUser,
    ];

    localStorage.setItem(
      "tampUsers",
      JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
      "tampCurrentUser",
      JSON.stringify({
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        companyName: newUser.companyName,
        role: newUser.role,
        complianceStatus:
          newUser.complianceStatus,
      })
    );

    showMessage(
      "Account created successfully. Redirecting to your dashboard.",
      "success"
    );

    setRegisterData({
      fullName: "",
      email: "",
      companyName: "",
      password: "",
      confirmPassword: "",
      role: "Freight Owner",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 700);
  };

  const inputClassName =
    "w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-[1.05fr_1fr]">
        {/* Left Side */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
                <Truck size={25} />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  TAMP
                </h1>

                <p className="text-sm text-blue-200">
                  Logistics Platform
                </p>
              </div>
            </div>

            <div className="mt-20">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                Truck Asset Matchmaking
              </p>

              <h2 className="mt-5 max-w-lg text-4xl font-bold leading-tight">
                Connect freight owners with the right transporters.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-slate-300">
                Register your profile, choose your platform role
                and access a workspace designed for your transport
                responsibilities.
              </p>
            </div>
          </div>

          <div className="relative grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <Building2
                size={21}
                className="text-blue-200"
              />

              <p className="mt-3 text-sm font-semibold">
                Freight Owners
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <Truck
                size={21}
                className="text-blue-200"
              />

              <p className="mt-3 text-sm font-semibold">
                Transporters
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <ShieldCheck
                size={21}
                className="text-blue-200"
              />

              <p className="mt-3 text-sm font-semibold">
                Administrators
              </p>
            </div>
          </div>
        </section>

        {/* Authentication Form */}
        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-lg">
            <div className="lg:hidden">
              <div className="flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Truck size={24} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    TAMP
                  </h1>

                  <p className="text-sm text-slate-500">
                    Logistics Platform
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center lg:mt-0 lg:text-left">
              <h2 className="text-3xl font-bold text-slate-900">
                {activeTab === "login"
                  ? "Welcome back"
                  : "Create your profile"}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {activeTab === "login"
                  ? "Sign in using your registered account and role."
                  : "Register a simulated TAMP account to continue."}
              </p>
            </div>

            {/* Tabs */}
            <div className="mt-7 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  clearMessage();
                }}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  activeTab === "login"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("register");
                  clearMessage();
                }}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  activeTab === "register"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Register
              </button>
            </div>

            {message.text && (
              <div
                className={`mt-5 flex items-start gap-3 rounded-2xl border p-4 ${
                  message.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0"
                  />
                ) : (
                  <AlertCircle
                    size={20}
                    className="mt-0.5 shrink-0"
                  />
                )}

                <p className="text-sm">
                  {message.text}
                </p>
              </div>
            )}

            {activeTab === "login" ? (
              <form
                onSubmit={handleLogin}
                className="mt-6 space-y-5"
              >
                <div>
                  <label
                    htmlFor="loginEmail"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="loginEmail"
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      placeholder="Enter your email"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="loginPassword"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="loginPassword"
                      type={
                        showLoginPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="Enter your password"
                      className={`${inputClassName} pr-12`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowLoginPassword(
                          (previousValue) =>
                            !previousValue
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                      aria-label="Toggle password visibility"
                    >
                      {showLoginPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <RoleSelection
                  roles={roles}
                  selectedRole={loginData.role}
                  onSelect={(role) =>
                    handleRoleSelection(
                      role,
                      "login"
                    )
                  }
                />

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Lock size={18} />
                  Login to TAMP
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleRegister}
                className="mt-6 space-y-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <UserRound
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={registerData.fullName}
                        onChange={handleRegisterChange}
                        placeholder="Your full name"
                        className={inputClassName}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="companyName"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Company Name
                    </label>

                    <div className="relative">
                      <Building2
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="companyName"
                        type="text"
                        name="companyName"
                        value={registerData.companyName}
                        onChange={handleRegisterChange}
                        placeholder="Company or organisation"
                        className={inputClassName}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="registerEmail"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="registerEmail"
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      placeholder="Enter your email"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="registerPassword"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="registerPassword"
                        type={
                          showRegisterPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        placeholder="Minimum 6 characters"
                        className={`${inputClassName} pr-12`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowRegisterPassword(
                            (previousValue) =>
                              !previousValue
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                        aria-label="Toggle password visibility"
                      >
                        {showRegisterPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Confirm Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        name="confirmPassword"
                        value={
                          registerData.confirmPassword
                        }
                        onChange={handleRegisterChange}
                        placeholder="Repeat your password"
                        className={`${inputClassName} pr-12`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (previousValue) =>
                              !previousValue
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                        aria-label="Toggle password visibility"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <RoleSelection
                  roles={roles}
                  selectedRole={registerData.role}
                  onSelect={(role) =>
                    handleRoleSelection(
                      role,
                      "register"
                    )
                  }
                />

                <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-800">
                  <UsersRound
                    size={20}
                    className="mt-0.5 shrink-0"
                  />

                  <p className="text-sm leading-6">
                    This is a front-end registration simulation.
                    Your account is stored locally in this browser
                    for demonstration purposes.
                  </p>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700"
                >
                  <UserRound size={18} />
                  Create TAMP Profile
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function RoleSelection({
  roles,
  selectedRole,
  onSelect,
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-slate-700">
        Select Your Role
      </legend>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {roles.map((role) => {
          const RoleIcon = role.icon;

          const isSelected =
            selectedRole === role.name;

          return (
            <button
              key={role.name}
              type="button"
              onClick={() =>
                onSelect(role.name)
              }
              className={`rounded-2xl border p-4 text-left transition ${
                isSelected
                  ? "border-blue-500 bg-blue-50 ring-4 ring-blue-100"
                  : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
              }`}
            >
              <RoleIcon
                size={21}
                className={
                  isSelected
                    ? "text-blue-700"
                    : "text-slate-400"
                }
              />

              <p className="mt-3 text-sm font-bold text-slate-900">
                {role.name}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {role.description}
              </p>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default Login;