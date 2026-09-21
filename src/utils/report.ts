import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

import type {
  CalibrationPoint,
  UnknownSample,
} from "../types/calibration";

import type { RegressionResult } from "./regression";

type GenerateReportOptions = {
  calibrationData: CalibrationPoint[];
  regression: RegressionResult | null;
  unknownSamples: UnknownSample[];
};

function addNewPageIfNeeded(
  pdf: jsPDF,
  y: number,
  requiredSpace: number,
): number {
  const pageHeight =
    pdf.internal.pageSize.getHeight();

  if (y + requiredSpace > pageHeight - 20) {
    pdf.addPage();

    return 20;
  }

  return y;
}

async function captureCalibrationChart(): Promise<
  string | null
> {
  const chartElement =
    document.getElementById("calibration-chart");

  if (!chartElement) {
    console.error(
      "Calibration chart element was not found.",
    );

    return null;
  }

  try {
    // Make sure the browser has finished rendering
    // the Recharts SVG before capturing it.
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve();
        });
      });
    });

    const width = chartElement.offsetWidth;
    const height = chartElement.offsetHeight;

    if (width === 0 || height === 0) {
      console.error(
        "Calibration chart has no visible dimensions.",
      );

      return null;
    }

    const image = await toPng(chartElement, {
      width,
      height,
      pixelRatio: 2,
      backgroundColor: "#111111",
      cacheBust: true,
    });

    return image;
  } catch (error) {
    console.error(
      "Failed to capture calibration chart:",
      error,
    );

    return null;
  }
}

export async function generatePDFReport({
  calibrationData,
  regression,
  unknownSamples,
}: GenerateReportOptions) {
  const pdf = new jsPDF();

  const pageWidth =
    pdf.internal.pageSize.getWidth();

  // Capture the chart before creating the report.
  const chartImage =
    await captureCalibrationChart();

  // --------------------------------------------------
  // Header
  // --------------------------------------------------

  pdf.setFontSize(22);
  pdf.setFont("helvetica", "bold");

  pdf.text("PlotSci", 20, 25);

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");

  pdf.text(
    "Calibration Curve Report",
    20,
    34,
  );

  // --------------------------------------------------
  // Report information
  // --------------------------------------------------

  const currentDate = new Date();

  pdf.setFontSize(10);

  pdf.text(
    `Generated: ${currentDate.toLocaleString()}`,
    20,
    45,
  );

  // --------------------------------------------------
  // Regression Results
  // --------------------------------------------------

  pdf.setFontSize(15);
  pdf.setFont("helvetica", "bold");

  pdf.text(
    "Regression Results",
    20,
    60,
  );

  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");

  if (regression) {
    pdf.text(
      `Slope: ${regression.slope.toFixed(4)}`,
      20,
      70,
    );

    pdf.text(
      `Intercept: ${regression.intercept.toFixed(4)}`,
      20,
      78,
    );

    pdf.text(
      `R²: ${regression.rSquared.toFixed(4)}`,
      20,
      86,
    );

    pdf.text(
      `Equation: ${regression.equation}`,
      20,
      94,
    );
  } else {
    pdf.text(
      "Regression could not be calculated.",
      20,
      70,
    );
  }

  // --------------------------------------------------
  // Calibration Standards
  // --------------------------------------------------

  let y = 112;

  pdf.setFontSize(15);
  pdf.setFont("helvetica", "bold");

  pdf.text(
    "Calibration Standards",
    20,
    y,
  );

  y += 12;

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");

  pdf.text("Standard", 20, y);
  pdf.text("Concentration", 70, y);
  pdf.text("Absorbance", 140, y);

  pdf.setFont("helvetica", "normal");

  y += 8;

  calibrationData.forEach((point, index) => {
    y = addNewPageIfNeeded(pdf, y, 10);

    pdf.text(
      `${index + 1}`,
      20,
      y,
    );

    pdf.text(
      point.concentration.toString(),
      70,
      y,
    );

    pdf.text(
      point.absorbance.toString(),
      140,
      y,
    );

    y += 8;
  });

  // --------------------------------------------------
  // Calibration Chart
  // --------------------------------------------------

  if (chartImage) {
    y = addNewPageIfNeeded(pdf, y, 115);

    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "Calibration Curve",
      20,
      y,
    );

    y += 8;

    const chartWidth = 170;
    const chartHeight = 90;

    pdf.addImage(
      chartImage,
      "PNG",
      20,
      y,
      chartWidth,
      chartHeight,
    );

    y += chartHeight + 10;
  }

  // --------------------------------------------------
  // Unknown Samples
  // --------------------------------------------------

  y = addNewPageIfNeeded(pdf, y, 50);

  pdf.setFontSize(15);
  pdf.setFont("helvetica", "bold");

  pdf.text(
    "Unknown Samples",
    20,
    y,
  );

  y += 12;

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");

  pdf.text("Sample", 20, y);
  pdf.text("Absorbance", 70, y);
  pdf.text("Dilution", 120, y);

  pdf.setFont("helvetica", "normal");

  y += 8;

  unknownSamples.forEach((sample) => {
    y = addNewPageIfNeeded(pdf, y, 10);

    pdf.text(
      sample.name,
      20,
      y,
    );

    pdf.text(
      sample.absorbance.toString(),
      70,
      y,
    );

    pdf.text(
      sample.dilutionFactor.toString(),
      120,
      y,
    );

    y += 8;
  });

  // --------------------------------------------------
  // Footer
  // --------------------------------------------------

  const pageCount =
    pdf.getNumberOfPages();

  for (
    let page = 1;
    page <= pageCount;
    page++
  ) {
    pdf.setPage(page);

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");

    pdf.text(
      `PlotSci • Page ${page} of ${pageCount}`,
      pageWidth / 2,
      285,
      {
        align: "center",
      },
    );
  }

  // --------------------------------------------------
  // Save
  // --------------------------------------------------

  pdf.save(
    "plotsci-calibration-report.pdf",
  );
}