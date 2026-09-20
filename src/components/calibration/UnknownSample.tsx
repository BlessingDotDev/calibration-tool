import { useState } from "react";

import type { CalibrationPoint } from "../../types/calibration";
import type { RegressionResult } from "../../utils/regression";

type UnknownSampleProps = {
  data: CalibrationPoint[];
  regression: RegressionResult | null;
};

function UnknownSample({
  data,
  regression,
}: UnknownSampleProps) {
  const [absorbance, setAbsorbance] = useState("");

  const validData = data.filter(
    (point) =>
      Number.isFinite(point.concentration) &&
      Number.isFinite(point.absorbance),
  );

  const concentrations = validData.map(
    (point) => point.concentration,
  );

  const minConcentration =
    concentrations.length > 0
      ? Math.min(...concentrations)
      : null;

  const maxConcentration =
    concentrations.length > 0
      ? Math.max(...concentrations)
      : null;

  const concentration =
    regression &&
    absorbance !== "" &&
    regression.slope !== 0
      ? (Number(absorbance) - regression.intercept) /
        regression.slope
      : null;

  const canCalculate =
    regression !== null &&
    absorbance !== "" &&
    Number.isFinite(Number(absorbance)) &&
    regression.slope !== 0;

  const isWithinRange =
    concentration !== null &&
    minConcentration !== null &&
    maxConcentration !== null &&
    concentration >= minConcentration &&
    concentration <= maxConcentration;

  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-6">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Unknown Sample
        </h2>

        <p className="mt-1 text-sm text-white/50">
          Enter the absorbance of an unknown sample to
          calculate its concentration.
        </p>
      </div>

      {minConcentration !== null &&
        maxConcentration !== null && (
          <div className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-sm text-white/50">
              Calibration range
            </p>

            <p className="mt-1 text-sm font-medium text-white">
              {minConcentration} – {maxConcentration}
            </p>
          </div>
        )}

      <div className="mt-6">
        <label
          htmlFor="unknown-absorbance"
          className="mb-2 block text-sm font-medium text-white/70"
        >
          Absorbance
        </label>

        <input
          id="unknown-absorbance"
          type="number"
          step="any"
          value={absorbance}
          onChange={(event) =>
            setAbsorbance(event.target.value)
          }
          placeholder="e.g. 0.35"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none transition placeholder:text-white/30 focus:border-secondary"
        />
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-white/50">
          Calculated Concentration
        </p>

        {!regression && (
          <p className="mt-2 text-sm text-white/40">
            Create a valid calibration curve first.
          </p>
        )}

        {regression && absorbance === "" && (
          <p className="mt-2 text-sm text-white/40">
            Enter an absorbance value.
          </p>
        )}

        {canCalculate &&
          concentration !== null && (
            <>
              <p className="mt-2 text-2xl font-semibold text-secondary">
                {concentration.toFixed(4)}
              </p>

              <p
                className={`mt-2 text-sm ${
                  isWithinRange
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {isWithinRange
                  ? "Within calibration range"
                  : "Outside calibration range"}
              </p>
            </>
          )}
      </div>
    </div>
  );
}

export default UnknownSample;