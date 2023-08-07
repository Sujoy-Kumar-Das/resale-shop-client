import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContext from "./contexts/authContext/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import BuyNowContext from "./contexts/BuyNowContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContext>
    <BuyNowContext>
      <React.StrictMode>
        <App />
        <Toaster />
      </React.StrictMode>
    </BuyNowContext>
  </AuthContext>
);
