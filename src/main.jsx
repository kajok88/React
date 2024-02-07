import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import 'leaflet/dist/leaflet.css'
import { CountryDataProvider } from "./components/CountryDataContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CountryDataProvider>
      <App />
    </CountryDataProvider>
  </React.StrictMode>,
)
