import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoadPosting from "./pages/LoadPosting/LoadPosting";
import TruckPosting from "./pages/TruckPosting/TruckPosting";
import Matchmaking from "./pages/Matchmaking/Matchmaking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loads" element={<LoadPosting />} />
        <Route path="/trucks" element={<TruckPosting />} />
        <Route path="/matching" element={<Matchmaking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;