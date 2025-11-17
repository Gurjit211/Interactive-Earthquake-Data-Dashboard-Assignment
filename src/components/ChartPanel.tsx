/**
 * fileoverview The primary component responsible for rendering the
 * interactive ScatterChart using the Recharts library. It utilizes 
 * state from Zustand (for axis selection) and React Context (for 
 * point selection) to visualize the data and update global state 
 * upon clicking a data point.
 */
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

import type { EarthquakeRecord } from '../utils/dataUtils'; 
import { useChartStore } from '../store/useChartStore';
import { useSelection } from '../context/SelectionContext';
import ChartControls from './ChartControls';

interface ChartPanelProps {
    data: EarthquakeRecord[]; // Data via Props
}

const ChartPanel: React.FC<ChartPanelProps> = ({ data }) => {
    // 1. Get axis variables from Zustand (External State)
    const { xAxisKey, yAxisKey } = useChartStore();
    
    // 2. Get selection state and setter from React Context
    const { selectedId, setSelectedId } = useSelection();

    // Prepare data: filter out incomplete records and determine selection status
    const chartData = data
        .filter(d => typeof d[xAxisKey] === 'number' && typeof d[yAxisKey] === 'number')
        .map(d => ({
            ...d,
            xValue: d[xAxisKey],
            yValue: d[yAxisKey],
            // Z-axis can be used for dot size (e.g., Magnitude)
            zValue: d.mag,
            // Add a flag to indicate if this point is selected
            isSelected: d.id === selectedId,
        }));

    const handlePointClick = (payload: any) => {
        if (payload.payload && payload.payload.id) {
            const id = payload.payload.id;
            // Reverse Interaction: Clicking a chart point updates the Context state
            setSelectedId(id === selectedId ? null : id); 
        }
    };

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const record = payload[0].payload;
            return (
                <div className="p-3 bg-white border border-gray-300 rounded shadow-md text-sm">
                    <p className="font-bold text-base">{record.place}</p>
                    <p>Magnitude: <span className="font-semibold text-red-600">{record.mag.toFixed(2)}</span></p>
                    <p>{xAxisKey} (X): {record.xValue.toFixed(2)}</p>
                    <p>{yAxisKey} (Y): {record.yValue.toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };
    
    return (
        <div className="flex flex-col h-full">
            <ChartControls />
            <div className="flex-grow min-h-0"> {/* ensures chart respects parent height */}
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            type="number" 
                            dataKey="xValue" 
                            name={xAxisKey.toUpperCase()} 
                            label={{ value: xAxisKey.toUpperCase(), position: 'bottom' }} 
                            domain={['auto', 'auto']}
                            tickFormatter={(value) => value.toFixed(1)}
                        />
                        <YAxis 
                            type="number" 
                            dataKey="yValue" 
                            name={yAxisKey.toUpperCase()} 
                            label={{ value: yAxisKey.toUpperCase(), angle: -90, position: 'left' }}
                            domain={['auto', 'auto']}
                            tickFormatter={(value) => value.toFixed(1)}
                        />
                        <ZAxis type="number" dataKey="zValue" range={[50, 400]} name="Magnitude" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                        <Legend verticalAlign="top" height={36} />

                        <Scatter 
                            name={`Earthquakes (${xAxisKey} vs ${yAxisKey})`} 
                            data={chartData} 
                            fill="#8884d8" 
                            onClick={handlePointClick}
                        >
                            {/* FIX: Use Recharts <Cell /> component for conditional styling */}
                            {chartData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    // Emphasize the selected point via size and color
                                    fill={entry.isSelected ? '#FF6347' : (entry.zValue > 4 ? '#E60000' : '#8884d8')}
                                    r={entry.isSelected ? 8 : (entry.zValue > 4 ? 6 : 4)}
                                    stroke={entry.isSelected ? '#333' : 'none'}
                                    strokeWidth={2}
                                />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartPanel;