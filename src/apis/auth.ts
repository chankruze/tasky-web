import axiosInstance from "@/lib/axios";

interface SignupPayload {
  user: {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

/**
 * Sign up a new user
 */
export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/signup", payload);
  return response.data;
};

/**
 * Sign in an existing user
 */
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/signin", payload);
  return response.data;
};
