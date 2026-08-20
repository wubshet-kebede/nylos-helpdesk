import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import WorkspaceLayout from "./layouts/WorkspaceLayout";
import TicketListPage from "./pages/ticket/TicketListPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import MyWorkPage from "./pages/mywork/MyWorkPage";
export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "app",
        element: <WorkspaceLayout />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "tickets",
            element: <TicketListPage />,
          },
          {
            path: "my-work",
            element: <MyWorkPage />,
          },
        ],
      },
    ],
  },
]);
