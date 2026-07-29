import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoadPosting from "./pages/LoadPosting/LoadPosting";
import TruckPosting from "./pages/TruckPosting/TruckPosting";
import Matchmaking from "./pages/Matchmaking/Matchmaking";
import Tracking from "./Pages/Tracking/Tracking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loads" element={<LoadPosting />} />
        <Route path="/trucks" element={<TruckPosting />} />
        <Route path="/matching" element={<Matchmaking />} />
        <Route path="/tracking" element={<Tracking />} />
       
       {/* Temporary Admin Page */}
        <Route
    path="/admin"
    element={
      <div className="min-h-screen bg-slate-100 p-10">
        <h1 className="text-3xl font-bold">
          Admin Console
        </h1>

        <p className="mt-2 text-gray-600">
          The TAMP administration workspace is under development.
        </p>
      </div>
    }
  /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;