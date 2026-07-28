import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

   
    const handleLogin = () => {
    // Clear previous errors
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (email.trim() === "") {
    setEmailError("Email is required");
    isValid = false;
  }

    if (password.trim() === "") {
    setPasswordError("Password is required");
    isValid = false;
  }

    if (isValid) {
    navigate("/dashboard");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Truck Asset Matchmaking Platform
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Sign in to continue
        </p>

        <form className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 mt-1"
            />

            {emailError && (
            <p className="text-red-500 text-sm mt-1">
            {emailError}
            </p>
     )}

          </div>

          <div>
            <label className="block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 mt-1"
            />
            {passwordError && (
            <p className="text-red-500 text-sm mt-1">
            {passwordError}
            </p>
          )}
          
          </div>

          <button
             type="button"
             onClick={handleLogin}
             className="w-full bg-blue-700 text-white rounded-lg py-3 hover:bg-blue-800"
          >
          Login
        </button>
        </form>
      </div>
    </div>
  );
}

export default Login;