/**
 * fileoverview Utility functions for defining the EarthquakeRecord 
 * data structure and handling the fetching and robust parsing of 
 * the raw USGS earthquake CSV data using PapaParse, ensuring correct 
 * type conversion (especially preventing Date objects in time fields).
 */
import Papa from 'papaparse'; 

// Full data structure definition (Time MUST be a string)
export interface EarthquakeRecord {
    id: number;
    time: string; // <-- Must remain a string
    latitude: number;
    longitude: number;
    depth: number;
    mag: number;
    magType: string;
    nst: number | null;
    gap: number | null;
    dmin: number | null;
    rms: number;
    net: string;
    updated: string; // <-- Must remain a string
    place: string;
    type: string;
    horizontalError: number | null;
    depthError: number | null;
    magError: number | null;
    magNst: number | null;
    status: string;
    locationSource: string;
    magSource: string;
}

/**
 * Parses CSV text into an array of EarthquakeRecord objects.
 * @param csvText The raw text content of the CSV file.
 * @returns An array of parsed EarthquakeRecord objects.
 */
export const parseCsv = (csvText: string): EarthquakeRecord[] => {
    const { data } = Papa.parse(csvText, {
        header: true,
        dynamicTyping: true, 
        skipEmptyLines: true,
        
        // CRITICAL FIX: Explicitly ensure 'time' and 'updated' remain strings
        transform: (value, field) => {
            if (field === 'time' || field === 'updated') {
                return String(value); // Force to string to prevent Date conversion
            }
            return value;
        },
    });

    // Final mapping step to ensure types and create a guaranteed unique ID
    return (data as any[]).map((record, index) => ({
        ...record,
        id: index + 1, // Simple unique ID
        
        // Explicit type conversions
        time: String(record.time), 
        updated: String(record.updated),
        latitude: parseFloat(record.latitude),
        longitude: parseFloat(record.longitude),
        depth: parseFloat(record.depth),
        mag: parseFloat(record.mag),
        
    }) as EarthquakeRecord);
};