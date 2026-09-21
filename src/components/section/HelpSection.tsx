import {
  CircleHelp,
  Lightbulb,
  Bug,
} from "lucide-react";

import FeatureCard from "../ui/FeatureCard";

function HelpSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-24 sm:px-10 lg:px-20">

      <div className="mb-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
          How We Can Help
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Have something in mind?
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">

        <FeatureCard
          icon={<CircleHelp size={21} />}
          title="Need Help?"
          description="Having trouble using a PlotSci feature? Tell us what you're experiencing."
        />

        <FeatureCard
          icon={<Lightbulb size={21} />}
          title="Have an Idea?"
          description="Share your ideas and suggestions for making PlotSci more useful."
        />

        <FeatureCard
          icon={<Bug size={21} />}
          title="Found a Problem?"
          description="Let us know about bugs or unexpected behaviour so we can investigate."
        />

      </div>
    </section>
  );
}

export default HelpSection;