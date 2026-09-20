import type {
  CalibrationPoint,
  UnknownSample as UnknownSampleType,
} from "../../types/calibration";
import type { RegressionResult } from "../../utils/regression";

type UnknownSampleProps = {
  data: CalibrationPoint[];
  samples: UnknownSampleType[];
  regression: RegressionResult | null;
  onChange: (
    id: number,
    field: "name" | "absorbance",
    value: string | number,
  ) => void;
  onAdd: () => void;
  onRemove: (id: number) => void;
};

function UnknownSample({
  data,
  samples,
  regression,
  onChange,
  onAdd,
  onRemove,
}: UnknownSampleProps) {
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

  const calculateConcentration = (
    absorbance: number,
  ): number | null => {
    if (!regression || regression.slope === 0) {
      return null;
    }

    return (
      (absorbance - regression.intercept) /
      regression.slope
    );
  };

  const isWithinRange = (
    concentration: number | null,
  ) => {
    if (
      concentration === null ||
      minConcentration === null ||
      maxConcentration === null
    ) {
      return false;
    }

    return (
      concentration >= minConcentration &&
      concentration <= maxConcentration
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white">
          Unknown Samples
        </h2>

        <p className="mt-1 text-sm text-white/50">
          Enter sample absorbance values to calculate their
          concentrations.
        </p>

        {minConcentration !== null &&
          maxConcentration !== null && (
            <div className="mt-4 inline-flex rounded-lg border border-white/10 bg-white/5 px-4 py-2">
              <span className="text-sm text-white/50">
                Calibration range:
              </span>

              <span className="ml-2 text-sm font-medium text-white">
                {minConcentration} – {maxConcentration}
              </span>
            </div>
          )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-white/5">
            <tr>
              <th className="px-5 py-4 text-sm font-medium text-white/60">
                #
              </th>

              <th className="px-5 py-4 text-sm font-medium text-white/60">
                Sample
              </th>

              <th className="px-5 py-4 text-sm font-medium text-white/60">
                Absorbance
              </th>

              <th className="px-5 py-4 text-sm font-medium text-white/60">
                Concentration
              </th>

              <th className="px-5 py-4 text-sm font-medium text-white/60">
                Status
              </th>

              <th className="px-5 py-4 text-sm font-medium text-white/60">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {samples.map((sample, index) => {
              const concentration =
                calculateConcentration(sample.absorbance);

              const withinRange =
                isWithinRange(concentration);

              return (
                <tr
                  key={sample.id}
                  className="border-t border-white/10"
                >
                  <td className="px-5 py-4 text-sm text-white/40">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4">
                    <input
                      type="text"
                      value={sample.name}
                      onChange={(event) =>
                        onChange(
                          sample.id,
                          "name",
                          event.target.value,
                        )
                      }
                      placeholder={`Sample ${index + 1}`}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none transition placeholder:text-white/30 focus:border-secondary"
                    />
                  </td>

                  <td className="px-5 py-4">
                    <input
                      type="number"
                      step="any"
                      value={sample.absorbance}
                      onChange={(event) =>
                        onChange(
                          sample.id,
                          "absorbance",
                          Number(event.target.value),
                        )
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-secondary"
                    />
                  </td>

                  <td className="px-5 py-4">
                    {concentration !== null ? (
                      <span className="font-medium text-secondary">
                        {concentration.toFixed(4)}
                      </span>
                    ) : (
                      <span className="text-white/30">
                        —
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {concentration !== null ? (
                      <span
                        className={
                          withinRange
                            ? "text-sm text-green-400"
                            : "text-sm text-yellow-400"
                        }
                      >
                        {withinRange
                          ? "Within range"
                          : "Outside range"}
                      </span>
                    ) : (
                      <span className="text-sm text-white/30">
                        —
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => onRemove(sample.id)}
                      className="text-sm text-red-400 transition hover:text-red-300"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5"
        >
          + Add Sample
        </button>
      </div>
    </div>
  );
}

export default UnknownSample;