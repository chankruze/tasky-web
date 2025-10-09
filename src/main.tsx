import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import queryClient from "@/utils/queryClient";
import "./tailwind.css";
import App from "./App.tsx";
import routes from "@/routes.ts";
import { LoginPage, SignupPage, ErrorPage, RequireAuth } from "@/pages";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path={routes.auth.login} element={<LoginPage />} />
          <Route path={routes.auth.register} element={<SignupPage />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth redirectTo={routes.auth.login} />}>
            <Route path={routes.root} element={<App />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<ErrorPage homeUrl={routes.root} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={1500} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
