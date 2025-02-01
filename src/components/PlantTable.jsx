import React, { useState } from 'react';
import plantsData from '../json/plants.json';
import './PlantTable.css';

function PlantTable() {
  const [searchTerm, setSearchTerm] = useState('');

  const sortedPlants = [...plantsData].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  const filteredPlants = sortedPlants.filter((plant) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const name = plant.name.toLowerCase();
    const description = plant.description ? plant.description.toLowerCase() : '';

    const nameWords = name.split(/\s+/);
    const descriptionWords = description.split(/\s+/);

    const nameMatch = nameWords.some(word => word.startsWith(lowerCaseSearchTerm));
    const descriptionMatch = descriptionWords.some(word => word.startsWith(lowerCaseSearchTerm));
    
    
    return nameMatch || descriptionMatch;
  }
    
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="plant-table-container">
      <div className='search-container'>
        <input
          className='search-bar'
          type="text"
          placeholder="Search by name..."
          onChange={handleSearchChange}
        />
      </div>
    
      <div className='plant-list'>
        <table className="plant-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Biome</th>
              <th>Rarity</th>
              <th>Light</th>
              <th>Moment of Day</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlants.map((plant) => (
              <tr key={plant.name}>
                <td data-label="Name">{plant.name}</td>
                <td data-label="Description">{plant.description}</td>
                <td data-label="Biome">{plant.baseTerrain}</td>
                <td data-label="Rarity">{plant.rarity}</td>
                <td data-label="Light">{plant.light}</td>
                <td data-label="Moment of Day">{plant.momentOfDay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlantTable;
