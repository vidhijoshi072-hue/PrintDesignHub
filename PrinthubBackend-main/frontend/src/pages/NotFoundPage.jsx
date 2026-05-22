import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

function NotFoundPage() {
  return (
    <PageTransition>
      <section className="content-shell flex min-h-screen flex-col items-center justify-center py-16 text-center">
        <span className="tag-pill">404</span>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300">
          The route you requested does not exist in this PrintDesignHub frontend.
        </p>
        <Link to="/" className="button-primary mt-8">
          Back to home
        </Link>
      </section>
    </PageTransition>
  );
}

export default NotFoundPage;
