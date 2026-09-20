import type { RegressionResult } from "../../utils/regression";

type RegressionResultsProps = {
  result: RegressionResult | null;
};

function RegressionResults({
  result,
}: RegressionResultsProps) {
  if (!result) {
    return (
      <div className="rounded-2xl border border-white/10 bg-surface p-6">
        <h2 className="text-lg font-semibold text-white">
          Regression Results
        </h2>

        <p className="mt-2 text-sm text-white/50">
          Add at least two valid calibration standards to
          calculate the regression.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-6">
      <h2 className="text-lg font-semibold text-white">
        Regression Results
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm text-white/50">
            Slope
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {result.slope.toFixed(4)}
          </p>
        </div>

        <div>
          <p className="text-sm text-white/50">
            Intercept
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {result.intercept.toFixed(4)}
          </p>
        </div>

        <div>
          <p className="text-sm text-white/50">
            R²
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {result.rSquared.toFixed(4)}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-white/50">
          Calibration Equation
        </p>

        <p className="mt-2 font-mono text-lg text-secondary">
          {result.equation}
        </p>
      </div>
    </div>
  );
}

export default RegressionResults;