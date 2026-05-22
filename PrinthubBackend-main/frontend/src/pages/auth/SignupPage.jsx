import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../../hooks/useAppState";
import { registerUser } from "../../services/authService";

function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAppState();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "designer"
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await registerUser(form);
      const user = {
        name: form.name,
        email: data.user?.email || form.email,
        role: form.role
      };
      login(user);
      toast.success("Account created");
      navigate(form.role === "designer" ? "/designer-dashboard" : "/company-dashboard");
    } catch (error) {
      login({
        name: form.name || "Demo Account",
        email: form.email || "demo@printdesignhub.com",
        role: form.role
      });
      toast("Backend registration unavailable, demo account created locally", {
        icon: "i"
      });
      navigate(form.role === "designer" ? "/designer-dashboard" : "/company-dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="surface w-full max-w-lg rounded-[36px] p-8 shadow-soft">
      <span className="tag-pill">Create account</span>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Join the marketplace</h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        Sign up as a designer to sell your work or as a company to save and purchase label assets.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Full name</label>
          <input
            className="input-base"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder="Aarav Packaging Studio"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
          <input
            type="email"
            className="input-base"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="hello@studio.com"
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
            placeholder="Create a strong password"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Role selection</label>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { id: "designer", title: "Designer", copy: "Upload and sell label design portfolios." },
              { id: "company", title: "Company", copy: "Browse, save, and purchase design assets." }
            ].map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setForm((current) => ({ ...current, role: role.id }))}
                className={`rounded-[24px] border p-4 text-left transition ${
                  form.role === role.id
                    ? "border-brand-200 bg-brand-50 dark:border-brand-500/20 dark:bg-brand-500/10"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <p className="font-semibold text-slate-950 dark:text-white">{role.title}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{role.copy}</p>
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="button-primary w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-brand-700">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
