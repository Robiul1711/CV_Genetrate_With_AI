import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { PrimeReactProvider } from "primereact/api";
import LangaugesProvider from "./providers/LangaugesProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slide, ToastContainer } from "react-toastify";
import AuthProvider from "./providers/AuthProvider";
import EmailProvider from "./providers/EmailProvider";
import { Toaster } from "react-hot-toast";
import { ResumeProvider } from "./providers/ResumeContext";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <PrimeReactProvider>
    <Toaster position="top-center" reverseOrder={false} />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <EmailProvider>
          <LangaugesProvider>
            <ResumeProvider>
              <RouterProvider router={router} />
            </ResumeProvider>

            <ToastContainer
              position="top-center"
              draggable
              transition={Slide}
            />
          </LangaugesProvider>
        </EmailProvider>
      </AuthProvider>
    </QueryClientProvider>
  </PrimeReactProvider>
  // </StrictMode>
);
