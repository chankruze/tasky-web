import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signup, login } from "@/apis/auth";
import useAuthStore from "@/stores/useAuthStore";

export function useSignup({ redirectTo }: { redirectTo?: string } = {}) {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: signup,
    onSuccess: ({ accessToken, refreshToken }) => {
      setAuth({ accessToken, refreshToken });
      if (redirectTo) navigate(redirectTo);
    },
  });
}

export function useLogin({ redirectTo }: { redirectTo?: string } = {}) {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken, refreshToken }) => {
      setAuth({ accessToken, refreshToken });
      if (redirectTo) navigate(redirectTo);
    },
  });
}
