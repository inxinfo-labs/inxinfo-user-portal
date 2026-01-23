import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Providers from "./providers";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/bootstrap/bootstrap.min.css";
import "../styles/theme.css";
import "../styles/animations.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Providers>
    <App />
  </Providers>
);
