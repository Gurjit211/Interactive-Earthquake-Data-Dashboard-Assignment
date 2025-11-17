/**
 * fileoverview The entry point of the React application. 
 * It sets up StrictMode and mounts the root application component (App) 
 * to the DOM element with the ID 'root', while also importing global 
 * styles (Tailwind CSS) for the application.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './context/index.css' // <-- UPDATED PATH
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)