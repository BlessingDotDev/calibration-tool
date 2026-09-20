import { linearRegression, linearRegressionLine, rSquared } from "simple-statistics";

import type { CalibrationPoint } from "../types/calibration";

export type RegressionResult = {
  slope: number;
  intercept: number;
  rSquared: number;
  equation: string;
};

export function calculateRegression(
  data: CalibrationPoint[],
): RegressionResult {
  const points = data.map((point) => [
    point.concentration,
    point.absorbance,
  ]);

  const regression = linearRegression(points);

  const line = linearRegressionLine(regression);

  const r2 = rSquared(points, line);

  return {
    slope: regression.m,
    intercept: regression.b,
    rSquared: r2,
    equation: `y = ${regression.m.toFixed(4)}x + ${regression.b.toFixed(4)}`,
  };
}