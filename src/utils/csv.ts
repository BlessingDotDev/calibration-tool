import Papa from "papaparse";
import { validateCalibrationData } from "./validation";

import type {
  CalibrationPoint,
  UnknownSample,
} from "../types/calibration";

export function exportCalibrationCSV(
  data: CalibrationPoint[],
) {
  const csvData = data.map((point, index) => ({
    Standard: index + 1,
    Concentration: point.concentration,
    Absorbance: point.absorbance,
  }));

  const csv = Papa.unparse(csvData);

  downloadCSV(csv, "plotsci-calibration-data.csv");
}

export function exportUnknownSamplesCSV(
  samples: UnknownSample[],
) {
  const csvData = samples.map((sample) => ({
    Sample: sample.name,
    Absorbance: sample.absorbance,
    DilutionFactor: sample.dilutionFactor,
  }));

  const csv = Papa.unparse(csvData);

  downloadCSV(csv, "plotsci-unknown-samples.csv");
}

function downloadCSV(
  csv: string,
  filename: string,
) {
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function importCalibrationCSV(
  file: File,
): Promise<CalibrationPoint[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        try {
          const rows = results.data as Record<
            string,
            string
          >[];

          if (rows.length === 0) {
            throw new Error(
              "The CSV file does not contain any data.",
            );
          }

          const firstRow = rows[0];

          if (
            !("Concentration" in firstRow) ||
            !("Absorbance" in firstRow)
          ) {
            throw new Error(
              "CSV must contain Concentration and Absorbance columns.",
            );
          }

          const calibrationData: CalibrationPoint[] =
            rows.map((row, index) => {
              const concentrationText =
                row.Concentration?.trim();

              const absorbanceText =
                row.Absorbance?.trim();

              if (!concentrationText) {
                throw new Error(
                  `Row ${index + 2}: concentration is empty.`,
                );
              }

              if (!absorbanceText) {
                throw new Error(
                  `Row ${index + 2}: absorbance is empty.`,
                );
              }

              const concentration =
                Number(concentrationText);

              const absorbance =
                Number(absorbanceText);

              if (!Number.isFinite(concentration)) {
                throw new Error(
                  `Row ${index + 2}: concentration must be a valid number.`,
                );
              }

              if (!Number.isFinite(absorbance)) {
                throw new Error(
                  `Row ${index + 2}: absorbance must be a valid number.`,
                );
              }

              return {
                id: Date.now() + index,
                concentration,
                absorbance,
              };
            });

          const validation =
            validateCalibrationData(
              calibrationData,
            );

          if (!validation.valid) {
            throw new Error(
              validation.errors.join("\n"),
            );
          }

          resolve(calibrationData);
        } catch (error) {
          reject(error);
        }
      },

      error: (error) => {
        reject(error);
      },
    });
  });
}