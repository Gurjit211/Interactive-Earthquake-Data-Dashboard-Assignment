// src/store/useChartStore.ts (Ensure this file is correct)
import { create } from 'zustand';

// 1. Export this type so ChartControls can use it
export type NumericAxisKey = 'mag' | 'latitude' | 'longitude' | 'depth';

interface ChartState {
  xAxisKey: NumericAxisKey;
  yAxisKey: NumericAxisKey;
  setXAxisKey: (key: NumericAxisKey) => void;
  setYAxisKey: (key: NumericAxisKey) => void;
}

// 2. Export the hook so ChartControls can call it
export const useChartStore = create<ChartState>((set) => ({
  xAxisKey: 'longitude',
  yAxisKey: 'latitude',
  setXAxisKey: (key) => set({ xAxisKey: key }),
  setYAxisKey: (key) => set({ yAxisKey: key }),
}));