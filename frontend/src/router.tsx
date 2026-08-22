import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import WorkspaceLayout from "./layouts/WorkspaceLayout";
import TicketListPage from "./pages/ticket/TicketListPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import MyWorkPage from "./pages/mywork/MyWorkPage";
import CreatedByMePage from "./pages/createdbyme/CreatedByMePage";
import TicketDetailPage from "./pages/ticket/TicketDetailPage";

// Root wrapper element to guarantee AuthProvider surrounds all routes
function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
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
              {
                path: "created-by-me",
                element: <CreatedByMePage />,
              },
              { path: "tickets/:id", element: <TicketDetailPage /> },
            ],
          },
        ],
      },
    ],
  },
]);
