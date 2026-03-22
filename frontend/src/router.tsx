import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage, LoginPage, NotFoundPage } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
