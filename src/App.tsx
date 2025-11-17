/**
 * fileoverview Main application component that sets up the global
 * state providers (Context, Zustand), fetches the core earthquake
 * data from the CSV file, and manages the overall responsive,
 * two-panel layout for the Chart and DataTable components.
 */
import React, { useState, useEffect } from 'react';

import { parseCsv } from './utils/dataUtils'; 
import type { EarthquakeRecord } from './utils/dataUtils';

import DataTable from './components/DataTable';
import ChartPanel from './components/ChartPanel';

// Essential Imports for State Management
import { SelectionProvider } from './context/SelectionContext';
import { useChartStore } from './store/useChartStore'; 

// Data URL assumes 'all_month.csv' is in the public folder
const DATA_URL = '/all_month.csv'; 

function App() {
    const [data, setData] = useState<EarthquakeRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // GET THE ZUSTAND STATE for display in the header
    const { xAxisKey, yAxisKey } = useChartStore(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                // --- CRITICAL DATA FETCHING LOGIC ---
                const response = await fetch(DATA_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} (Is 'all_month.csv' in the public folder?)`);
                }
                const csvText = await response.text();
                const parsedData = parseCsv(csvText) as EarthquakeRecord[];
                setData(parsedData);
            } catch (e) {
                console.error("Failed to fetch or parse data:", e);
                // Display a helpful error to the user
                setError(`Failed to load data. Details: ${(e as Error).message}`);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, []); 

    // --- LOADING / ERROR STATES ---
    if (isLoading) {
        return <div className="min-h-screen p-4 text-center text-xl bg-gray-50">✨ **Loading Geographic Data...**</div>;
    }

    if (error) {
        return <div className="min-h-screen p-4 text-center text-red-600 bg-gray-50">🛑 **Error:** {error}</div>;
    }

    // --- RENDER DASHBOARD ---
    return (
        <SelectionProvider>
            <div className="min-h-screen bg-gray-50 p-4">
                <h1 className="text-3xl font-bold mb-4 text-center">🌍 USGS Earthquake Data Dashboard</h1>
                {/* Parent container has fixed height constraint (h-[80vh]) */}
                <div className="flex flex-col lg:flex-row h-[80vh] space-y-4 lg:space-y-0 lg:space-x-4">
                    
                    {/* Chart Panel Container (lg:w-3/5) */}
                    <div className="lg:w-3/5 bg-white p-4 rounded-lg shadow-lg flex flex-col h-full">
                        <h2 className="text-xl font-semibold mb-2 flex-shrink-0">
                            Interactive Chart ({xAxisKey.toUpperCase()} vs {yAxisKey.toUpperCase()})
                        </h2>
                        {/* FIX: The ChartPanel must receive a constrained height from its wrapper.
                          We use flex-grow to ensure this <div> takes all remaining height.
                        */}
                        <div className="flex-grow min-h-0">
                            <ChartPanel data={data} />
                        </div>
                    </div>
                    
                    {/* Data Panel Container (lg:w-2/5) */}
                    <div className="lg:w-2/5 bg-white p-4 rounded-lg shadow-lg flex flex-col h-full">
                        <h2 className="text-xl font-semibold mb-2 flex-shrink-0">Data Table ({data.length} Records)</h2>
                        <DataTable data={data} />
                    </div>
                </div>
            </div>
        </SelectionProvider>
    );
}

export default App;