import {
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { CalibrationPoint } from "../../types/calibration";
import type { RegressionResult } from "../../utils/regression";

type CalibrationChartProps = {
  data: CalibrationPoint[];
  regression: RegressionResult | null;
};

function CalibrationChart({
  data,
  regression,
}: CalibrationChartProps) {
  if (!regression || data.length < 2) {
    return (
      <div className="rounded-2xl border border-white/10 bg-surface p-6">
        <h2 className="text-lg font-semibold text-white">
          Calibration Curve
        </h2>

        <p className="mt-2 text-sm text-white/50">
          Add at least two valid calibration standards to
          display the calibration curve.
        </p>
      </div>
    );
  }

  const validData = data.filter(
    (point) =>
      Number.isFinite(point.concentration) &&
      Number.isFinite(point.absorbance),
  );

  const minX = Math.min(
    ...validData.map((point) => point.concentration),
  );

  const maxX = Math.max(
    ...validData.map((point) => point.concentration),
  );

  const regressionLine = [
    {
      concentration: minX,
      absorbance:
        regression.slope * minX + regression.intercept,
    },
    {
      concentration: maxX,
      absorbance:
        regression.slope * maxX + regression.intercept,
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Calibration Curve
        </h2>

        <p className="mt-1 text-sm text-white/50">
          Absorbance versus concentration with linear
          regression.
        </p>
      </div>

      <div 
        id="calibration-chart"
        className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
            />

            <XAxis
              type="number"
              dataKey="concentration"
              name="Concentration"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              axisLine={{
                stroke: "rgba(255,255,255,0.15)",
              }}
              tickLine={false}
              label={{
                value: "Concentration",
                position: "insideBottom",
                offset: -10,
                fill: "rgba(255,255,255,0.5)",
              }}
            />

            <YAxis
              type="number"
              dataKey="absorbance"
              name="Absorbance"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              axisLine={{
                stroke: "rgba(255,255,255,0.15)",
              }}
              tickLine={false}
              label={{
                value: "Absorbance",
                angle: -90,
                position: "insideLeft",
                fill: "rgba(255,255,255,0.5)",
              }}
            />

            <Tooltip
              cursor={{
                strokeDasharray: "3 3",
              }}
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
              }}
              labelStyle={{
                color: "rgba(255,255,255,0.6)",
              }}
            />

            <Scatter
              name="Calibration Standards"
              data={validData}
              fill="#ffffff"
            />

            <Line
              type="linear"
              data={regressionLine}
              dataKey="absorbance"
              stroke="#ffffff"
              strokeWidth={2}
              dot={false}
              name="Regression"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-secondary">
          {regression.equation}
        </span>

        <span className="text-white/60">
          R² = {regression.rSquared.toFixed(4)}
        </span>
      </div>
    </div>
  );
}

export default CalibrationChart;