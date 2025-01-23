import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio"; // Asegúrate de que Inicio.jsx esté en src/pages/

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route path="/inicio" element={<Inicio />} />
          {/* Puedes añadir más rutas aquí si lo necesitas */}
          <Route path="*" element={<h1>404: Página no encontrada</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
