import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { PrimeReactProvider } from "primereact/api";
import LangaugesProvider from "./providers/LangaugesProvider";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <PrimeReactProvider>
      <LangaugesProvider>
      <RouterProvider router={router} />

      </LangaugesProvider>
    </PrimeReactProvider>
  // </StrictMode>
);
