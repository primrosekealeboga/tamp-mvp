import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoadPosting from "./pages/LoadPosting/LoadPosting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loads" element={<LoadPosting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;