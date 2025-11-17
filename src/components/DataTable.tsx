/**
 * fileoverview A responsive table component responsible for displaying 
 * a list of earthquake records. It integrates with the SelectionContext 
 * to highlight the currently selected row and provides click handlers 
 * for user interaction and row selection toggling.
 */
import React from 'react';
import { useSelection } from '../context/SelectionContext';
import type { EarthquakeRecord } from '../utils/dataUtils'; 

interface DataTableProps {
    data: EarthquakeRecord[]; // Data passed via Prop Drilling
}

const numericKeys: (keyof EarthquakeRecord)[] = ['mag', 'latitude', 'longitude', 'depth'];
const headerMap: Record<string, string> = {
    id: 'ID',
    time: 'Time (UTC)',
    latitude: 'Lat.',
    longitude: 'Lon.',
    mag: 'Mag.',
    depth: 'Depth (km)',
    place: 'Location Details',
};

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const { selectedId, setSelectedId } = useSelection(); 

    // Dynamically get all headers from the first data object
    const headers = data.length > 0 
        ? Object.keys(data[0]).filter(key => key !== 'id') 
        : [];

    const handleRowInteraction = (id: number | null) => {
        // Update the selection state using the Context hook
        setSelectedId(id);
    };

    const handleRowClick = (id: number) => {
        // Toggle selection on click
        setSelectedId(id === selectedId ? null : id);
    }

    // --- NEW FORMATTING UTILITY FUNCTION ---
    const formatCellValue = (key: keyof EarthquakeRecord, value: any) => {
        // 1. Handle Time/Date Objects (Critical Fix for the reported error)
        if (key === 'time' && value instanceof Date) {
            // Format the Date object to a readable string
            return value.toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
        }
        
        // 2. Handle Numeric Keys (as originally implemented)
        if (numericKeys.includes(key) && typeof value === 'number') {
            return value.toFixed(2);
        }

        // 3. Default (for strings like 'place' or if time is already a string)
        return value;
    };


    return (
        <div className="h-full overflow-y-auto">
            <table className="min-w-full table-auto text-sm text-left text-gray-700">
                
                {/* Table Headers */}
                <thead className="text-xs uppercase bg-gray-100 sticky top-0 shadow-sm">
                    <tr>
                        {headers.map((key) => (
                            <th key={key} scope="col" className="px-3 py-2 whitespace-nowrap">
                                {headerMap[key] || key}
                            </th>
                        ))}
                    </tr>
                </thead>
                
                {/* Table Body */}
                <tbody>
                    {data.map((row) => (
                        <tr
                            key={row.id}
                            className={`border-b transition-all duration-150 cursor-pointer ${
                                row.id === selectedId 
                                    ? 'bg-blue-100 hover:bg-blue-200 font-semibold' 
                                    : 'bg-white hover:bg-gray-50'
                            }`}
                            onClick={() => handleRowClick(row.id)}
                            onMouseEnter={() => handleRowInteraction(row.id)}
                            onMouseLeave={() => handleRowInteraction(null)}
                        >
                            {headers.map((key) => (
                                <td key={key} className="px-3 py-2 whitespace-nowrap">
                                    {/* USE THE NEW FORMATTING FUNCTION */}
                                    {formatCellValue(key as keyof EarthquakeRecord, row[key])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;