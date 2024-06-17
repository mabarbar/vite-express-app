import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TripsContextProvider } from "./context/TripsContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <TripsContextProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </TripsContextProvider>
    </React.StrictMode>
);
