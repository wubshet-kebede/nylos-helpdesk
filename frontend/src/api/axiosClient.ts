import axios, { type AxiosError } from "axios";
import { type ApiErrorResponse } from "./types";
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5231/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});
// REQUEST INTERCEPTOR: Pre-process requests before they leave
axiosClient.interceptors.request.use(
  (config) => {
    // You can inspect or mutate headers here if needed (e.g. CSRF tokens or correlation IDs)
    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR: Centralize session handling and error parsing
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;
    const errorData = error.response?.data;

    if (status === 401) {
      // Session expired or unauthenticated -> Redirect to login
      // Prevents endless unauthorized state loops
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    // Extract ASP.NET ProblemDetails structure cleanly
    const formattedError = {
      status: status || 500,
      title: errorData?.title || "An unexpected error occurred",
      detail: errorData?.detail || error.message || "Server error",
      validationErrors: errorData?.errors || null,
    };

    return Promise.reject(formattedError);
  },
);
