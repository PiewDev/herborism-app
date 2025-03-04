import React, { useState } from 'react';
import statesConfig from '../../json/statesConfig.json';
import { downloadPDF, getWeightedPlants } from '../../findPlants.js';
import './SearchPlants.css';

function SearchPlants() {
  const [bioma, setBioma] = useState('');
  const [clima, setClima] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [light, setLight] = useState('');
  const [momentOfDay, setMomentOfDay] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [selectedPlants, setSelectedPlants] = useState([]);

  const groupedPlants = Object.values(
    selectedPlants.reduce((acc, plant) => {
      const existingPlant = acc[plant.name];
  
      if (existingPlant) {
        existingPlant.quantity += 1;
      } else {
        acc[plant.name] = { ...plant, quantity: 1 };
      }
  
      return acc;
    }, {})
  );  

  const handleFindPlants = () => {
    const conditions = {
      baseTerrain: bioma,
      climate: clima,
      temperature: temperatura,
      light: light,
      momentOfDay: momentOfDay,
    };
    const results = getWeightedPlants(conditions, cantidad, true);
    setSelectedPlants(results);
  };

  return (
    <div className="dark-theme">
      <div className="form-container">
        <div className="input-group">
          <label htmlFor="bioma">Bioma</label>
          <select id="bioma" onChange={(e) => setBioma(e.target.value)} value={bioma}>
            <option value="">Selecciona un bioma</option>
            {statesConfig.biomes.map((biome) => (
              <option key={biome} value={biome}>
                {biome}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="clima">Clima</label>
          <select id="clima" onChange={(e) => setClima(e.target.value)} value={clima}>
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
          <select id="temperatura" onChange={(e) => setTemperatura(e.target.value)} value={temperatura}>
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
          <select id="light" onChange={(e) => setLight(e.target.value)} value={light}>
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
          <select id="momentOfDay" onChange={(e) => setMomentOfDay(e.target.value)} value={momentOfDay}>
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
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setCantidad("");
              } else {
                setCantidad(Math.max(1, Number(value)));
              }
            }}
          />
        </div>
      </div>
        <button className="search-button" onClick={handleFindPlants}>
          Buscar Plantas
        </button>
      <div className={`plant-list ${selectedPlants.length > 0 ? 'show' : ''}`}>
        <table className="plant-table">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Nombre</th>
              <th>Rareza</th>
              <th>Descripción</th>
              <th>Usos</th>
            </tr>
          </thead>
          <tbody>
             {groupedPlants.map((plant, index) => (
              <tr key={`${plant.name}-${index}`}>
                <td>{plant.quantity}</td>
                <td>{plant.name}</td>
                <td>{plant.rarity}</td>
                <td>{plant.description}</td>
                <td>{plant.uses}</td>
              </tr>
             ))}
          </tbody>
        </table>
        {selectedPlants.length > 0 && (
          <button className="download-button" onClick={() => downloadPDF(groupedPlants.map(plant => ({          
            "Cantidad": plant.quantity,
            "Nombre": plant.name,
            "Rareza": plant.rarity,
            "Descripción": plant.description,
            "Uso": plant.uses
          })))}>
            Descargar PDF
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchPlants;
