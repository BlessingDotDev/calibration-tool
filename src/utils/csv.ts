import Papa from "papaparse";

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