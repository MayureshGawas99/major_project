import "./App.css";
import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { SnackbarProvider } from "notistack";
import Pagenotfound from "./pages/Pagenotfound";

export const MapContext = createContext();
function App() {
  const [mapstate, setMapstate] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  });
  const [cords, setCords] = useState({ lat: 19.146342, lng: 72.931738 });
  const [time, setTime] = useState(120);

  return (
    <BrowserRouter>
      <MapContext.Provider
        value={{
          mapstate,
          setMapstate,
          cords,
          setCords,
          time,
          setTime,
        }}
      >
        <div className="root">
          <Navbar />
          <SnackbarProvider />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<Pagenotfound />} />
          </Routes>
        </div>
      </MapContext.Provider>
    </BrowserRouter>
  );
}

export default App;
