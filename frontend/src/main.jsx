import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutsContextProvider } from "./context/WorkoutsContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <WorkoutsContextProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </WorkoutsContextProvider>
    </React.StrictMode>
);
