import { createBrowserRouter } from "react-router-dom";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import ManagerPanel from "./pages/ManagerPanel";
import SupportPanel from "./pages/SupportPanel";
import Reports from "./pages/Reports";
import RequestForm from "./pages/RequestForm";

const router = createBrowserRouter(
  [
    // 🔐 Rutas públicas (login/register)
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
  path: "/menu",
  element: <Menu />
},

    // 🔒 Rutas privadas
    {
      path: "/app",
      element: <MainLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "admin", element: <AdminPanel /> },
        { path: "manager", element: <ManagerPanel /> },
        { path: "support", element: <SupportPanel /> },
        { path: "reports", element: <Reports /> },
        { path: "request", element: <RequestForm /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
