function AboutIntro() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 sm:px-10 lg:px-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

        {/* Heading */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            Our Purpose
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Turning scientific data into clear results.
          </h2>
        </div>

        {/* Description */}
        <div className="space-y-5 text-base leading-7 text-text/70">
          <p>
            PlotSci is a simple scientific data analysis platform built
            to make everyday laboratory calculations easier to understand
            and work with.
          </p>

          <p>
            From entering experimental data to generating calibration
            curves, PlotSci brings essential tools together in a clean
            and focused workspace.
          </p>
        </div>

      </div>
    </section>
  );
}

export default AboutIntro;