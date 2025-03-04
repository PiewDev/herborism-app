import React, { useState } from 'react';
import plantsData from '../../json/plants.json';
import './PlantTable.css';

function PlantTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [sortKey, setSortKey] = useState('name'); //default value
    

    const sortedPlants = [...plantsData].sort((a, b) => {
        let comparison = 0;
        if (sortKey === 'name' || sortKey === 'description') {
            comparison = a[sortKey].localeCompare(b[sortKey]);
        } else if (sortKey === 'rarity' ) {
            const rarityOrder = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
            const rarityA = rarityOrder.indexOf(a[sortKey]);
            const rarityB = rarityOrder.indexOf(b[sortKey]);
            comparison = rarityA - rarityB;
        }
        else {
            comparison = a[sortKey].localeCompare(b[sortKey]);
        } //all other fields 
        

        if (sortConfig.direction === 'descending') {
            comparison = -comparison;
        }

        return comparison;
    });



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

  const handleVerticalSortChange = (event) => {
    const newSortKey = event.target.value;
    handleSort(newSortKey)
  };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        setSortKey(key);
    };

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '▲' : '▼';
        }
        return '';
    };


  return (
    <div className="plant-table-container">
      <div className='search-container'>
          <input
            className='search-bar'
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
          
          <div className='select-container' >
                <select
                    className="plant-table-select"
                    onChange={handleVerticalSortChange}
                    defaultValue=""
                >
                    <option value="" disabled hidden>Order by:</option>
                    <option value="name">Name</option>
                    <option value="description">Description</option>
                    <option value="baseTerrain">Biome</option>
                    <option value="rarity">Rarity</option>
                    <option value="light">Light</option>
                </select>
          </div>
      </div>
    
      <div className="plant-list">
          <table className="plant-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Name{getSortArrow('name')}</th>
              <th onClick={() => handleSort('description')}>Description{getSortArrow('description')}</th>              
              <th onClick={() => handleSort('uses')}>uses{getSortArrow('uses')}</th>
              <th className='short-header' onClick={() => handleSort('baseTerrain')}>Biome{getSortArrow('baseTerrain')}</th>
              <th className='short-header' onClick={() => handleSort('rarity')}>Rarity{getSortArrow('rarity')}</th>
              <th className='short-header' onClick={() => handleSort('light')}>Light{getSortArrow('light')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlants.map((plant) => (
              <tr key={plant.name}>
                <td data-label="Name">{plant.name}</td>
                <td data-label="Description">{plant.description}</td>
                <td data-label="uses">{plant.uses}</td>
                <td className="short-data" data-label="Biome">{plant.baseTerrain}</td>
                <td className="short-data" data-label="Rarity">{plant.rarity}</td>
                <td className="short-data" data-label="Light">{plant.light}</td>
              </tr>
            ))}
          </tbody>
          </table>
      </div>
    </div>
  );
}

export default PlantTable;
