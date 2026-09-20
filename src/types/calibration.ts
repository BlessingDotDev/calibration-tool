export type CalibrationPoint = {
  id: number;
  concentration: number;
  absorbance: number;
}

export type UnknownSample = {
  id: number;
  name: string;
  absorbance: number;
};