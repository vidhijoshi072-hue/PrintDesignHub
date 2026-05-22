import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/80 py-12 dark:border-slate-800">
      <div className="content-shell grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">PrintDesignHub</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
            A marketplace for professional printed label designs where designers publish premium
            packaging concepts and manufacturing companies source them faster.
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">© PrintDesignHub</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Marketplace
          </h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300">
            <Link to="/browse">Browse Designs</Link>
            <Link to="/upload">Upload Design</Link>
            <Link to="/designer-dashboard">Designer Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Company
          </h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300">
            <Link to="/company-dashboard">Saved Designs</Link>
            <Link to="/cart">Shopping Cart</Link>
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Create Account</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
