import {
  linearRegression,
  linearRegressionLine,
  rSquared,
} from "simple-statistics";

import type { CalibrationPoint } from "../types/calibration";

export type RegressionResult = {
  slope: number;
  intercept: number;
  rSquared: number;
  equation: string;
};

export function calculateRegression(
  data: CalibrationPoint[],
): RegressionResult | null {
  // Only use valid calibration points
  const validData = data.filter(
    (point) =>
      Number.isFinite(point.concentration) &&
      Number.isFinite(point.absorbance),
  );

  // A linear regression requires at least 2 points
  if (validData.length < 2) {
    return null;
  }

  // All X values cannot be the same
  const concentrations = validData.map(
    (point) => point.concentration,
  );

  const uniqueConcentrations = new Set(concentrations);

  if (uniqueConcentrations.size < 2) {
    return null;
  }

  const points = validData.map((point) => [
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
    equation: `y = ${regression.m.toFixed(4)}x ${
      regression.b >= 0 ? "+" : "-"
    } ${Math.abs(regression.b).toFixed(4)}`,
  };
}