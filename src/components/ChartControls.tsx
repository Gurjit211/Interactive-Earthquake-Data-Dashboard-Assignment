/**
 *  A control panel component that allows users to select
 * the data keys (latitude, longitude, depth, mag) for the X and Y axes
 * of a chart, updating the selection via the `useChartStore` (Zustand).
 */
import React from 'react';
import { useChartStore } from '../store/useChartStore';
import type { NumericAxisKey } from '../store/useChartStore';


const axisOptions: NumericAxisKey[] = ['latitude', 'longitude', 'depth', 'mag'];

const ChartControls: React.FC = () => {
  // Get state and setters from Zustand store
  const { xAxisKey, yAxisKey, setXAxisKey, setYAxisKey } = useChartStore();

  const handleXChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Cast the event value to the correct type before storing
    setXAxisKey(event.target.value as NumericAxisKey);
  };

  const handleYChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYAxisKey(event.target.value as NumericAxisKey);
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4 items-center">
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <label htmlFor="xAxis" className="font-semibold text-gray-700 whitespace-nowrap">
          X-Axis:
        </label>
        <select
          id="xAxis"
          value={xAxisKey}
          onChange={handleXChange}
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
        >
          {axisOptions.map((key) => (
            <option key={key} value={key}>
              {key.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <label htmlFor="yAxis" className="font-semibold text-gray-700 whitespace-nowrap">
          Y-Axis:
        </label>
        <select
          id="yAxis"
          value={yAxisKey}
          onChange={handleYChange}
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
        >
          {axisOptions
            .filter((key) => key !== xAxisKey) // Prevent selecting the same axis for X and Y
            .map((key) => (
              <option key={key} value={key}>
                {key.toUpperCase()}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default ChartControls;