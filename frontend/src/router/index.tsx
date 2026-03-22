import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, LoginPage, NotFoundPage } from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";

function RegisterPage() {
  return <div>Register — coming soon</div>;
}

function ForgotPasswordPage() {
  return <div>Forgot Password — coming soon</div>;
}

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [{ index: true, element: <HomePage /> }],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
