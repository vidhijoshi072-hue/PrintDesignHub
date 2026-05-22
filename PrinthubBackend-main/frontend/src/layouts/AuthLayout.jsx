import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 -z-10 bg-hero-grid" />
      <Outlet />
    </main>
  );
}

export default AuthLayout;
