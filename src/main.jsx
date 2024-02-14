import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'leaflet/dist/leaflet.css'
import { CountryDataProvider } from "./contexts/CountryDataContext";
import { ContainerStateProvider } from './contexts/ContainerStateContext';
import { PinProvider } from './contexts/PinContext';
import { ApiKeyProvider } from './contexts/ApiKeyContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiKeyProvider>
    <ContainerStateProvider>
    <CountryDataProvider>
    <PinProvider>
      <App />
    </PinProvider>
    </CountryDataProvider>
    </ContainerStateProvider>
    </ApiKeyProvider> 
  </React.StrictMode>,
)
