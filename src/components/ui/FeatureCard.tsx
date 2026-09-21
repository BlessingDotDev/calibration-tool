import type { ReactNode } from "react";
import clsx from "clsx";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
};

function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <article
      className={clsx(
        "group rounded-2xl border border-border bg-surface p-7",
        "transition duration-300",
        "hover:-translate-y-1 hover:border-secondary/40",
        className
      )}
    >
      <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
        {icon}
      </div>

      <h3 className="mb-3 text-lg font-semibold text-text">
        {title}
      </h3>

      <p className="text-sm leading-6 text-text/65">
        {description}
      </p>
    </article>
  );
}

export default FeatureCard;