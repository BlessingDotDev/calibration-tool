
import type { CalibrationPoint } from "../../types/calibration";

type CalibrationTableProps = {
  data: CalibrationPoint[];
  onChange: (
    id: number,
    field: "concentration" | "absorbance",
    value: number,
  ) => void;
  onRemove: (id: number) => void;
  onAdd: () => void;
};

function CalibrationTable({
  data,
  onChange,
  onRemove,
  onAdd,
}: CalibrationTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-125 text-left">
          <thead className="bg-white/5">
            <tr>
              <th className="px-5 py-4 text-sm font-medium text-white/60">
                #
              </th>

              <th className="px-5 py-4 text-sm font-medium text-white/60">
                Concentration
              </th>

              <th className="px-5 py-4 text-sm font-medium text-white/60">
                Absorbance
              </th>

              <th className="px-5 py-4 text-sm font-medium text-white/60">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((point, index) => (
              <tr
                key={point.id}
                className="border-t border-white/10"
              >
                <td className="px-5 py-4 text-sm text-white/40">
                  {index + 1}
                </td>

                <td className="px-5 py-4">
                  <input
                    type="number"
                    value={point.concentration}
                    onChange={(event) =>
                      onChange(
                        point.id,
                        "concentration",
                        Number(event.target.value),
                      )
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-secondary"
                  />
                </td>

                <td className="px-5 py-4">
                  <input
                    type="number"
                    step="any"
                    value={point.absorbance}
                    onChange={(event) =>
                      onChange(
                        point.id,
                        "absorbance",
                        Number(event.target.value),
                      )
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-secondary"
                  />
                </td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => onRemove(point.id)}
                    className="text-sm text-red-400 transition hover:text-red-300"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add button */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5"
        >
          + Add Standard
        </button>
      </div>
    </div>
  );
}

export default CalibrationTable;