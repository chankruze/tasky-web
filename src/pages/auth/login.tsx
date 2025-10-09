import { useState } from "react";
import { useLogin } from "@/hooks/react-query/useAuthApi";
import routes from "@/routes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin({ redirectTo: routes.tasks.index });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Log In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loginMutation.isPending ? "Logging in..." : "Log In"}
        </button>

        {loginMutation.isError && (
          <p className="mt-4 text-center text-red-500">
            {(loginMutation.error as any)?.response?.data?.error || "Something went wrong"}
          </p>
        )}
      </form>
    </div>
  );
}
