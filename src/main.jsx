import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TAMPProvider } from "./context/TAMPContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TAMPProvider>
      <App />
    </TAMPProvider>
  </StrictMode>
);