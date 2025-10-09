import { API_HOST, API_PROTOCOL, API_VERSION } from "@/constants";

const protocol = API_PROTOCOL ?? "http";
const host = API_HOST ?? "localhost:3000";
const defaultVersion = API_VERSION ?? "v1";

export const API_BASE_URL = `${protocol}://${host}`;
export const API_VERSION_PATH = `/${defaultVersion}`;

/**
 * Build API URLs with optional versioning
 * @param path Endpoint path
 * @param version Include version? Pass `false` to exclude or a string to override default
 * @example apiPath("tasks") → https://api.tasky.com/v1/tasks
 * @example apiPath("auth/signin", false) → https://api.tasky.com/auth/signin
 * @example apiPath("tasks", "v2") → https://api.tasky.com/v2/tasks
 */
export const apiPath = (path: string = "", version: string | false = defaultVersion): string => {
  const versionPath = version ? `/${version}` : "";
  return `${API_BASE_URL}${versionPath}/${path.replace(/^\/+/, "")}`;
};
