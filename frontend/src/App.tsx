import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./router";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
      retry: 1, // Retry failed queries once before throwing
      refetchOnWindowFocus: false, // Prevents background refetches when switching browser tabs
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className:
              "!rounded-2xl !border !border-emerald-200/80 !bg-white !px-4 !py-4 !shadow-xl !shadow-emerald-900/10 !text-slate-900",
            style: {
              maxWidth: "380px",
            },
            success: {
              className:
                "!rounded-2xl !border !border-emerald-200 !bg-white !px-4 !py-4 !shadow-xl !shadow-emerald-900/10",
              iconTheme: {
                primary: "#10b981",
                secondary: "#ffffff",
              },
            },
            error: {
              className:
                "!rounded-2xl !border !border-rose-200 !bg-white !px-4 !py-4 !shadow-xl !shadow-rose-900/10",
              iconTheme: {
                primary: "#f43f5e",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
