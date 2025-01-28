import React, { useState } from "react";
import plantsData from "./json/plants.json";
import statesConfig from "./json/statesConfig.json";
import weightConfig from "./json/weightConfig.json";
import findPlants from "./findPlants";
import "./App.css";

function App() {
  const [bioma, setBioma] = useState("");
  const [clima, setClima] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [light, setLight] = useState("");
  const [momentOfDay, setMomentOfDay] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [selectedPlants, setSelectedPlants] = useState([]);

  // Agrupar plantas por nombre y contar cantidad
  const groupedPlants = selectedPlants.reduce((acc, plant) => {
    const key = plant.name;
    acc[key] = acc[key] || { plant, quantity: 0 };
    acc[key].quantity += 1;
    return acc;
  }, {});

  const handleFindPlants = () => {

    const conditions = {
      baseTerrain: bioma,


      climate: clima,
      temperature: temperatura,
      light: light,
      momentOfDay: momentOfDay,
    };
    const results = findPlants.getWeightedPlants(conditions, cantidad, true);
    setSelectedPlants(results);
  };

  return (
    <div className="container dark-theme">
      <h1>Buscador de Plantas</h1>

      <div className="form-container">
        <div className="input-group">
          <label htmlFor="bioma">Bioma</label>
          <select
            id="bioma"
            onChange={(e) => setBioma(e.target.value)}
            value={bioma}
          >
            <option value="">Selecciona un bioma</option>
            {statesConfig.biomes.map((biome) => (<option key={biome} value={biome}>
                {biome}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="clima">Clima</label>
          <select
            id="clima"
            onChange={(e) => setClima(e.target.value)}
            value={clima}
          >
            <option value="">Selecciona un clima</option>
            {statesConfig.climates.map((climate) => (
              <option key={climate} value={climate}>
                {climate}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="temperatura">Temperatura</label>
          <select
            id="temperatura"
            onChange={(e) => setTemperatura(e.target.value)}
            value={temperatura}
          >
            <option value="">Selecciona una temperatura</option>
            {statesConfig.temperatures.map((temp) => (
              <option key={temp} value={temp}>
                {temp}
              </option>
            ))}
          </select>
        </div>

          <div className="input-group">
            <label htmlFor="light">Luz</label>
            <select
              id="light"
              onChange={(e) => setLight(e.target.value)}
              value={light}
            >
              <option value="">Selecciona una cantidad de luz</option>
              {statesConfig.lights.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="momentOfDay">Momento del día</label>
            <select
              id="momentOfDay"
              onChange={(e) => setMomentOfDay(e.target.value)}
              value={momentOfDay}
            >
              <option value="">Selecciona un momento del día</option>
              {statesConfig.momentOfDays.map((moment) => (
                <option key={moment} value={moment}>
                  {moment}
                </option>
              ))}
            </select>
          </div>

        <div className="input-group">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
          />
        </div>

        <button className="search-button" onClick={handleFindPlants}>
          Buscar Plantas
        </button>
      </div>

      <div className="plant-list">
        <table className="plant-table">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Nombre</th>
              <th>Rareza</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedPlants).map(({ plant, quantity }, index) => (
              <tr key={`${plant.name}-${index}`}>
                <td>{quantity}</td>
                <td>{plant.name}</td>
                <td>{plant.rarity}</td>
                <td>{plant.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
