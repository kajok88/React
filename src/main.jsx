import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import 'leaflet/dist/leaflet.css'
import { CountryDataProvider } from "./contexts/CountryDataContext";
import { ContainerStateProvider } from './contexts/ContainerStateContext';
import { PinProvider } from './contexts/PinContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContainerStateProvider>
    <CountryDataProvider>
    <PinProvider>
      <App />
      </PinProvider>
    </CountryDataProvider>
    </ContainerStateProvider>
  </React.StrictMode>,
)
