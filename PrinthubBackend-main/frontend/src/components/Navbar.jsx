import { Menu, Palette, Search, Upload } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppState } from "../hooks/useAppState";
import CartIcon from "./CartIcon";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Browse Designs", to: "/browse" },
  { label: "Upload Design", to: "/upload" },
  { label: "Designer", to: "/designer-dashboard" },
  { label: "Company", to: "/company-dashboard" }
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAppState();

  return (
    <header className="sticky top-0 z-40 border-b border-[#ead9c8] bg-[rgba(246,235,221,0.86)] backdrop-blur-xl dark:border-stone-800 dark:bg-[rgba(23,19,18,0.84)]">
      <div className="content-shell flex min-h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d97757] via-[#c084fc] to-[#7c3aed] text-white shadow-card">
            <Palette size={20} />
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight text-slate-950 dark:text-white">
              PrintDesignHub
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Curated Printed Label Editions</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-[#9a3412] dark:bg-stone-900 dark:text-amber-100"
                    : "text-stone-600 hover:bg-white hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-900 dark:hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/browse" className="inline-flex items-center gap-2 rounded-full border border-[#dbc0aa] bg-[#fff8f0] px-4 py-2 text-sm font-medium text-[#5b3a2b] hover:border-[#b98869] hover:text-[#7a4328] dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-200">
            <Search size={16} />
            Browse Designs
          </Link>
          <CartIcon />
          <ThemeToggle />
          {currentUser ? (
            <>
              <span className="rounded-full bg-[#fff8f1] px-4 py-2 text-sm text-[#5b3a2b] dark:bg-stone-900 dark:text-stone-200">
                {currentUser.name}
              </span>
              <button type="button" onClick={logout} className="button-primary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="button-secondary">
                Login
              </Link>
              <Link to="/signup" className="button-primary">
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-stone-700 dark:border-stone-700 dark:text-stone-200 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      </div>

      {open ? (
        <div className="content-shell pb-4 lg:hidden">
          <div className="surface space-y-3 rounded-3xl p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 hover:bg-white dark:text-stone-100 dark:hover:bg-stone-900"
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link to="/browse" className="button-secondary flex-1" onClick={() => setOpen(false)}>
                Browse Designs
              </Link>
              <Link to="/cart" className="button-secondary flex-1" onClick={() => setOpen(false)}>
                Cart
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/upload" className="button-primary flex-1" onClick={() => setOpen(false)}>
                <Upload size={16} className="mr-2" />
                Upload Design
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
