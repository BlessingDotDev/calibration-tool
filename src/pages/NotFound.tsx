import { Link } from "react-router-dom";
import { ArrowLeft, House } from "lucide-react";

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="mb-3 text-sm font-medium">
          404 ERROR
        </p>

        <h1 className="text-6xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mt-5 text-muted leading-7">
          Sorry, the page you're looking for doesn't exist or may
          have been moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3"
          >
            <House size={18} />
            Go Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-3"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}

export default NotFound;