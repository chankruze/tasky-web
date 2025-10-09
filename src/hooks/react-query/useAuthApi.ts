import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signup, login } from "@/apis/auth";
import { saveTokens } from "@/utils/token";

export function useSignup({ redirectTo }: { redirectTo?: string } = {}) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      saveTokens(data.accessToken, data.refreshToken);
      if (redirectTo) navigate(redirectTo);
    },
  });
}

export function useLogin({ redirectTo }: { redirectTo?: string } = {}) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      saveTokens(data.accessToken, data.refreshToken);
      if (redirectTo) navigate(redirectTo);
    },
  });
}
