🌍 Interactive Earthquake Data Dashboard
This single-page application (SPA) visualizes recent earthquake data from the USGS API, presenting it in an interactive, responsive dashboard featuring a scatter plot and a detailed data table.
Core Requirements Met
Requirement	Status	Implementation Details
Responsive UI	✅	Two-panel layout (lg:w-3/5 Chart, lg:w-2/5 Table) using Tailwind CSS for a clean, desktop-optimized view.
Chart Panel	✅	Implemented using Recharts. Displays a scatter plot with dynamic axis controls.
Data Panel	✅	Scrollable, detailed table showing all records.
Data Management	✅	Fetches and parses the raw CSV data upon initialization, handling loading/error states.
Bidirectional Interaction	✅	Selection is linked: clicking a table row highlights the chart point, and clicking a chart point highlights the table row.
🚀 Getting Started
Follow these steps to set up and run the project locally.
Installation
1.	Clone the Repository: (Assume this project is checked into your local Git repository)
2.	Install Dependencies: Navigate to the project root and install the necessary packages.
3.	npm install
Running the Application
1.	Place Data: Ensure the source data file, all_month.csv, is placed in the project's public/ directory. (The application is configured to fetch /all_month.csv).
2.	Start Development Server:
3.	npm run dev
4.	The application will open in your browser (typically at http://localhost:5173/).
📦 External Dependencies and Purpose
The following dependencies were used to build this project:
Dependency	Purpose
react / react-dom	Core library for building the user interface.
typescript / @types/*	For type-safe development.
tailwindcss	Utility-first CSS framework for rapid and responsive styling.
recharts	Primary library used for creating the interactive Scatter Chart visualization.
zustand	External State Library used to manage application-wide configurations (X/Y Axis selection).
🏛️ State Handling Approaches
The application successfully demonstrates the three required state management patterns for data sharing:
1.	Props Pattern (Data Flow): The raw earthquake data is fetched in the root App.tsx and passed down as a prop to both the <ChartPanel /> and <DataTable /> components.
2.	React Context (Selection State): SelectionContext.tsx manages the single source of truth for the user's focus: the selectedId. This context links the table row highlight with the chart point emphasis.
3.	External State Library (Zustand - Configuration State): useChartStore.ts manages the configuration state for the visualization: xAxisKey and yAxisKey, allowing for dynamic chart updates via the controls.
✨ Additional Features
1.	Dynamic Chart Titles: The chart title in App.tsx dynamically updates to reflect the currently selected axes.
2.	Visual Magnitude Cue: In ChartPanel.tsx, points representing higher magnitude earthquakes (Mag > 4.0) are rendered with a darker color and larger size for immediate visibility.
3.	Tooltips: A custom tooltip provides detailed information (magnitude, place, x/y values) upon hovering over any data point.
AI Tool Utilization (Gemini)
This project was built collaboratively with an AI assistant. The AI was used for:
1.	Boilerplate Generation: Creating the initial component structures and implementing the core logic for state management (Context and Zustand).
2.	Data Parsing Logic: Writing and refining the complex CSV parsing logic to correctly handle the structure, type conversion, and cleaning of the USGS dataset.
3.	Debugging and Troubleshooting: The AI was crucial in diagnosing and resolving all module resolution errors and the critical recharts dimension warnings by implementing a robust, cascading flex/h-full layout structure in the React components.

