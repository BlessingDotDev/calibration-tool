import { useState } from "react";
import HeroSection from "../components/section/HeroSection";
import plotGraphImage from "../assets/project.jpg";

import type { CalibrationPoint, UnknownSample as UnknownSampleType, } from "../types/calibration";
import CalibrationTable from "../components/calibration/CalibrationTable";
import { calculateRegression } from "../utils/regression";
import RegressionResults from "../components/calibration/CalibrationResults";
import CalibrationChart from "../components/calibration/CalibrationChart";
import UnknownSample from "../components/calibration/UnknownSample";

function PlotGraph() {
  const [calibrationData, setCalibrationData] = useState<CalibrationPoint[]>([
    {
      id: 1,
      concentration: 0,
      absorbance: 0.02,
    },
    {
      id: 2,
      concentration: 2,
      absorbance: 0.15,
    },
    {
      id: 3,
      concentration: 4,
      absorbance: 0.31,
    },
    {
      id: 4,
      concentration: 6,
      absorbance: 0.46,
    },
    {
      id: 5,
      concentration: 8,
      absorbance: 0.61,
    },
  ]);
  const [unknownSamples, setUnknownSamples] = useState<
    UnknownSampleType[]
  >([
    {
      id: 1,
      name: "Sample 1",
      absorbance: 0,
      dilutionFactor: 1,
    },
]);

  const regression = calculateRegression(calibrationData);

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

  return (
    <>
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

        <div className="mt-8">
          <CalibrationTable 
            data={calibrationData}
            onChange={handleChange}
            onRemove={handleRemove}
            onAdd={handleAdd} 

          />
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

    </>

    
  );
}

export default PlotGraph;
