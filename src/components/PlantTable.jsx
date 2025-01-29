import React from 'react';
import plantsData from '../json/plants.json';
import './PlantTable.css';

function PlantTable() {
  const sortedPlants = [...plantsData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );


  return (
    
    <div className='plant-list'>
    <div>
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
          {sortedPlants.map((plant) => (
            <tr key={plant.name} >
                <td>{plant.name}</td>
                <td>{plant.description}</td>
                <td>{plant.baseTerrain}</td>
                <td>{plant.rarity}</td>
                <td>{plant.light}</td>
                <td>{plant.momentOfDay}</td>
              </tr>

            ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default PlantTable;