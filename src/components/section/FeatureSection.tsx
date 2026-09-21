import {
  ChartNoAxesCombined,
  FlaskConical,
  FileChartColumn,
} from "lucide-react";

import FeatureCard from "../ui/FeatureCard";

function FeatureSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-24 sm:px-10 lg:px-20">

      {/* Section heading */}
      <div className="mb-12 max-w-2xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
          What We Do
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Built around your scientific workflow.
        </h2>

        <p className="mt-4 text-base leading-7 text-text/65">
          PlotSci focuses on the essential tools you need to work with
          experimental data without unnecessary complexity.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-5 md:grid-cols-3">

        <FeatureCard
          icon={<FlaskConical size={22} />}
          title="Scientific Data"
          description="Work with experimental measurements in a clean and structured environment."
        />

        <FeatureCard
          icon={<ChartNoAxesCombined size={22} />}
          title="Calibration Curves"
          description="Create clear calibration curves and visualize relationships between your data points."
        />

        <FeatureCard
          icon={<FileChartColumn size={22} />}
          title="Clear Results"
          description="Turn calculations and experimental data into results that are easier to understand."
        />

      </div>
    </section>
  );
}

export default FeatureSection;