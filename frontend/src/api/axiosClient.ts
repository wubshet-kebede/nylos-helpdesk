import axios, { type AxiosError } from "axios";
import toast from "react-hot-toast";
import { type ApiErrorResponse } from "./types";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5231/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toUpperCase();

    if (["POST", "PUT", "DELETE", "PATCH"].includes(method || "")) {
      if (!response.config.url?.includes("/auth/refresh")) {
        const successMsg =
          response.data?.message || "Operation completed successfully";
        toast.success(successMsg);
      }
    }

    return response;
  },

  async (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;
    const errorData = error.response?.data;
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };
    const requestUrl = originalRequest?.url || "";

    const isAuthCheck = requestUrl.includes("/auth/me");
    const isRefreshCall = requestUrl.includes("/auth/refresh");
    const isLoginCall = requestUrl.includes("/auth/login");

    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthCheck &&
      !isRefreshCall &&
      !isLoginCall
    ) {
      originalRequest._retry = true;

      try {
        // Execute refresh endpoint
        await axiosClient.post("/auth/refresh");

        // Explicitly re-apply original headers and config
        return axiosClient.request(originalRequest);
      } catch (refreshError) {
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    let errorMessage =
      errorData?.detail ||
      errorData?.title ||
      error.message ||
      "An unexpected error occurred";

    if (errorData?.errors && Object.keys(errorData.errors).length > 0) {
      const firstErrorKey = Object.keys(errorData.errors)[0];
      const firstErrorMsg = errorData.errors[firstErrorKey]?.[0];

      if (firstErrorMsg) {
        errorMessage = firstErrorMsg;
      }
    }

    if (!(status === 401 && (isAuthCheck || isRefreshCall))) {
      toast.error(errorMessage);
    }

    const formattedError = {
      status: status || 500,
      title: errorData?.title || "An unexpected error occurred",
      detail: errorMessage,
      validationErrors: errorData?.errors || null,
    };

    return Promise.reject(formattedError);
  },
);
