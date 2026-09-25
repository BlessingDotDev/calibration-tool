import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface LegalLayoutProps {
  title: string;
  description: string;
  lastUpdated: string;
  children: React.ReactNode;
}

function LegalLayout({
  title,
  description,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <main className="min-h-screen max-w-5xl mx-auto bg-surface rounded-2xl">
      <div className="px-6 py-16">

        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to PlotSci
        </Link>

        <header className="mb-12 border-b border-border pb-8">
          <p className="mb-3 text-sm font-medium text-primary">
            PlotSci
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            {description}
          </p>

          <p className="mt-5 text-sm text-muted">
            Last updated: {lastUpdated}
          </p>
        </header>

        <article className="space-y-10">
          {children}
        </article>

      </div>
    </main>
  );
}

export default LegalLayout;