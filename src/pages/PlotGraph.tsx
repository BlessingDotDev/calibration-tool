import { useState } from "react";
import HeroSection from "../components/section/HeroSection";
import plotGraphImage from "../assets/project.jpg";

import type { CalibrationPoint, UnknownSample as UnknownSampleType, } from "../types/calibration";
import CalibrationTable from "../components/calibration/CalibrationTable";
import { calculateRegression } from "../utils/regression";
import RegressionResults from "../components/calibration/CalibrationResults";
import CalibrationChart from "../components/calibration/CalibrationChart";
import UnknownSample from "../components/calibration/UnknownSample";

import {
  validateCalibrationData,
  validateUnknownSamples,
} from "../utils/validation";
import { exportCalibrationCSV, importCalibrationCSV } from "../utils/csv";
import { generatePDFReport } from "../utils/report";
import PageTransition from "../components/animation/PageTransition";


function PlotGraph() {
  const [calibrationData, setCalibrationData] = useState<CalibrationPoint[]>([]);
  const [unknownSamples, setUnknownSamples] = useState<UnknownSampleType[]>([
    {
      id: 1,
      name: "Sample 1",
      absorbance: 0,
      dilutionFactor: 1,
    },
  ]);
  const [csvError, setCsvError] = useState<string | null>( null,);

  

  const handleChange = (
    id: number,
    field: "concentration" | "absorbance",
    value: number,
  ) => {
    setCalibrationData((currentData) => 
      currentData.map((point) => 
        point.id === id 
          ? { 
              ...point, [
              field]: value, 
            } 
          : point, 
      ), 
    );
  };

  const handleUnknownChange = (
    id: number,
    field: "name" | "absorbance" | "dilutionFactor",
    value: string | number,
  ) => {
    setUnknownSamples((currentSamples) =>
      currentSamples.map((sample) =>
        sample.id === id
          ? {
              ...sample,
              [field]: value,
            }
          : sample,
      ),
    );
  };

  const handleRemove = (id: number) => {
    setCalibrationData((currentData) => 
      currentData.filter((point) => point.id !== id)
    )
  };

  const handleRemoveUnknownSample = (id: number) => {
    setUnknownSamples((currentSamples) =>
      currentSamples.filter(
        (sample) => sample.id !== id,
      ),
    );
  };

  const handleAdd = () => {
    const newPoint: CalibrationPoint = {
      id: Date.now(),
      concentration: 0,
      absorbance: 0,
    };

    setCalibrationData((currentData) => [
      ...currentData,
      newPoint,
    ]);
  };

  const handleAddUnknownSample = () => {
    const newSample: UnknownSampleType = {
      id: Date.now(),
      name: `Sample ${unknownSamples.length + 1}`,
      absorbance: 0,
      dilutionFactor: 1,
    };

    setUnknownSamples((currentSamples) => [
      ...currentSamples,
      newSample,
    ]);
  };

  const handleImportCSV = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setCsvError(null);

    try {
      const importedData =
        await importCalibrationCSV(file);

      setCalibrationData(importedData);
    } catch (error) {
      setCsvError(
        error instanceof Error
          ? error.message
          : "Failed to import CSV file.",
      );
    }

    event.target.value = "";
  };

  const regression = calculateRegression(calibrationData);

  const calibrationValidation =
  validateCalibrationData(calibrationData);

  const unknownValidation =
  validateUnknownSamples(unknownSamples);

  return (
    <PageTransition>
      <HeroSection
        headerTitle="PlotSci"
        title="Plot Your Science"
        description="Create accurate calibration curves, analyse your data, and visualise scientific results with ease."
        backgroundImage={plotGraphImage}
        className="min-h-[40vh] py-4"
      >
      </HeroSection>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold">
          Calibration Curve
        </h1>

        <p className="mt-2 text-white/60">
          Enter your calibration standards to generate a
          calibration curve.
        </p>

        {!calibrationValidation.valid && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/5 p-5">
            <h2 className="font-semibold text-red-400">
              Calibration Data Issues
            </h2>

            <ul className="mt-3 space-y-1 text-sm text-red-300">
              {calibrationValidation.errors.map(
                (error, index) => (
                  <li key={index}>• {error}</li>
                ),
              )}
            </ul>
          </div>
        )}

        <div className="mt-8">
          <CalibrationTable 
            data={calibrationData}
            onChange={handleChange}
            onRemove={handleRemove}
            onAdd={handleAdd} 

          />
        </div>

        <div className="mt-4 flex justify-end">

          {csvError && (
            <div className="mb-4 rounded-xl border border-red-400/20 bg-red-400/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-red-400">
                    CSV Import Failed
                  </h3>

                  <p className="mt-1 whitespace-pre-line text-sm text-red-300">
                    {csvError}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCsvError(null)}
                  className="text-sm text-white/40 transition hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <label className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5">
            Import Calibration CSV

            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleImportCSV}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() =>
              exportCalibrationCSV(calibrationData)
            }
            disabled={!calibrationValidation.valid}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Export Calibration CSV
          </button>

          <button
            type="button"
            onClick={async () =>
              await generatePDFReport({
                calibrationData,
                regression,
                unknownSamples,
              })
            }
            disabled={
              !calibrationValidation.valid ||
              !unknownValidation.valid ||
              !regression
            }
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Generate PDF Report
          </button>
        </div>

      

        <div className="mt-8">
          <RegressionResults result={regression} />
        </div>

        <CalibrationChart
          data={calibrationData}
          regression={regression}
        />

        <div className="mt-8">
          <UnknownSample
            data={calibrationData}
            samples={unknownSamples}
            regression={regression}
            onChange={handleUnknownChange}
            onAdd={handleAddUnknownSample}
            onRemove={handleRemoveUnknownSample}
          />
        </div>
        
     </section>

    </PageTransition>

    
  );
}

export default PlotGraph;
