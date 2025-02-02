import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PlantTable from "./components/PlantTable/PlantTable.jsx";
import PotionsList from "./components/PotionsList/PotionsList.jsx";
import SearchPlants from "./components/SearchPlants/SearchPlants.jsx";
import "./App.css";



function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/searchPlants">Buscador de Plantas</Link>
          </div>

          <div className="navbar-buttons">
            <Link to="/plants">Ver Lista de Plantas</Link>
            <Link to="/potions">Ver Lista de Potions</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<SearchPlants />} />
          <Route path="/searchPlants" element={<SearchPlants />} />
          <Route path="/plants" element={<PlantTable />} />
          <Route path="/potions" element={<PotionsList />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;