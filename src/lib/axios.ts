import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { toast } from "react-toastify";
import { evolve } from "ramda";
import { apiPath } from "@/config/api";
import { convertKeysToCamelCase, convertKeysToSnakeCase } from "@/utils/convertCase";
import { getAccessToken, clearTokens } from "@/utils/token";
import routes from "@/routes";

/**
 * ==========================
 * Axios Configuration
 * ==========================
 */

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: apiPath("", false),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  /**
   * 🧾 Request Interceptor
   * 1. Converts keys → snake_case
   * 2. Adds Authorization header if token exists
   */
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();

      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }

      return evolve({
        data: convertKeysToSnakeCase,
        params: convertKeysToSnakeCase,
      })(config) as InternalAxiosRequestConfig;
    },
    (error) => Promise.reject(error)
  );

  /**
   * 📥 Response Interceptor
   * 1. Converts response keys → camelCase
   * 2. Handles error responses (401, 404, etc.)
   */ instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.data) {
        response.data = convertKeysToCamelCase(response.data);
      }

      const successMessage = response.data?.message || response.data?.notice;
      if (successMessage) toast.success(successMessage);

      return response;
    },
    (error: AxiosError<{ error?: string; message?: string }>) => {
      const status = error.response?.status;

      if (status === 401) {
        clearTokens();

        if (window.location.pathname !== routes.auth.login) {
          toast.error("Session expired. Please sign in again.");
          setTimeout(() => (window.location.href = routes.auth.login), 1500);
        }
      } else if (status === 403) {
        toast.error("Access denied. You don't have permission to perform this action.");
      } else if (status === 404) {
        toast.error("Requested resource not found.");
      } else if (status === 500) {
        toast.error("Something went wrong on the server.");
      } else {
        const message =
          error.response?.data?.error || error.message || "An unexpected error occurred.";
        toast.error(message);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * ==========================
 * Public API
 * ==========================
 */

// Singleton instance (default)
const axiosInstance = createAxiosInstance();
export default axiosInstance;

// Optional factory export (if you ever need isolated instances)
export { createAxiosInstance };
