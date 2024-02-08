import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import 'leaflet/dist/leaflet.css'
import { CountryDataProvider } from "./contexts/CountryDataContext";
import { ContainerStateProvider } from './contexts/ContainerStateContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContainerStateProvider>
    <CountryDataProvider>
      <App />
    </CountryDataProvider>
    </ContainerStateProvider>
  </React.StrictMode>,
)
