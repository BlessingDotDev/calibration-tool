import type {
  CalibrationPoint,
  UnknownSample,
} from "../types/calibration";

export type ValidationResult = {
  valid: boolean;
  errors: string[];
};

export function validateCalibrationData(
  data: CalibrationPoint[],
): ValidationResult {
  const errors: string[] = [];

  // Check minimum number of standards
  if (data.length < 2) {
    errors.push(
      "At least two calibration standards are required.",
    );
  }

  // Check individual values
  data.forEach((point, index) => {
    if (!Number.isFinite(point.concentration)) {
      errors.push(
        `Standard ${index + 1}: concentration must be a valid number.`,
      );
    }

    if (point.concentration < 0) {
      errors.push(
        `Standard ${index + 1}: concentration cannot be negative.`,
      );
    }

    if (!Number.isFinite(point.absorbance)) {
      errors.push(
        `Standard ${index + 1}: absorbance must be a valid number.`,
      );
    }

    if (point.absorbance < 0) {
      errors.push(
        `Standard ${index + 1}: absorbance cannot be negative.`,
      );
    }
  });

  // Check for duplicate concentrations
  const concentrations = data.map(
    (point) => point.concentration,
  );

  const uniqueConcentrations = new Set(concentrations);

  if (
    concentrations.length !==
    uniqueConcentrations.size
  ) {
    errors.push(
      "Calibration standards cannot contain duplicate concentrations.",
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateUnknownSamples(
  samples: UnknownSample[],
): ValidationResult {
  const errors: string[] = [];

  samples.forEach((sample, index) => {
    if (!sample.name.trim()) {
      errors.push(
        `Sample ${index + 1}: sample name is required.`,
      );
    }

    if (!Number.isFinite(sample.absorbance)) {
      errors.push(
        `Sample ${index + 1}: absorbance must be a valid number.`,
      );
    }

    if (sample.absorbance < 0) {
      errors.push(
        `Sample ${index + 1}: absorbance cannot be negative.`,
      );
    }

    if (!Number.isFinite(sample.dilutionFactor)) {
      errors.push(
        `Sample ${index + 1}: dilution factor must be a valid number.`,
      );
    }

    if (sample.dilutionFactor <= 0) {
      errors.push(
        `Sample ${index + 1}: dilution factor must be greater than zero.`,
      );
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}