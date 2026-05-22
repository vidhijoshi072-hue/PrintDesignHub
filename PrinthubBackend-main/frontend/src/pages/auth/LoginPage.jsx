import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../hooks/useAppState";
import { loginUser } from "../../services/authService";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, quickLogin } = useAppState();
  const [form, setForm] = useState({ email: "", password: "", role: "designer" });
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.redirectTo || (form.role === "designer" ? "/designer-dashboard" : "/company-dashboard");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(form);
      const user = {
        name:
          data.user?.firstName && data.user?.lastName
            ? `${data.user.firstName} ${data.user.lastName}`.trim()
            : form.email.split("@")[0],
        email: data.user?.email || form.email,
        role: form.role
      };
      if (data.accessToken) {
        localStorage.setItem("pdh_token", data.accessToken);
      }
      login(user);
      navigate(redirectTo);
    } catch (error) {
      quickLogin(form.role);
      toast("Backend login unavailable, demo session started", {
        icon: "i"
      });
      navigate(redirectTo);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="surface w-full max-w-md rounded-[36px] p-8 shadow-soft">
      <span className="tag-pill">Welcome back</span>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Sign in to PrintDesignHub</h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        Access saved collections, portfolio uploads, and your marketplace dashboard.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
          <input
            type="email"
            className="input-base"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="you@company.com"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
          <input
            type="password"
            className="input-base"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Role</label>
          <div className="grid grid-cols-2 gap-3">
            {["designer", "company"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setForm((current) => ({ ...current, role }))}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium capitalize transition ${
                  form.role === role
                    ? "border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-100"
                    : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="button-primary w-full" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        New to the platform?{" "}
        <Link to="/signup" className="font-semibold text-brand-700">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
