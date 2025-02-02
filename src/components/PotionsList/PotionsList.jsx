import { useState, useEffect } from "react";
import potionsData from "../../json/potions.json";
import "./PotionsList.css";

function PotionList() {
    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }

      function compareStringsWithoutAccents(str1, str2) {
        return removeAccents(str1.toLowerCase()).startsWith(removeAccents(str2.toLowerCase()))
      }

  const { potions } = potionsData;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPotions, setFilteredPotions] = useState(potions);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value; 
    setSearchTerm(newSearchTerm);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const filtered = potions.filter((potion) =>   
      compareStringsWithoutAccents(potion.name, searchTerm)
    );
    setFilteredPotions(filtered);
  }, [searchTerm]);

  const isLandscape = windowWidth > 768;
  return (
    <div className="potion-container">
      <input
        type="text"
        placeholder="Buscar poción"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="potion-list-container">
        {filteredPotions.map((potion) => {
          const { name, effect, duration, level, type, ingredients } = potion;
          return (
            <div key={name} className="potion-card">
              <h3 className="potion-name">{name}</h3>
              <div className="potion-card-content">
                <div className={`extra-info ${isLandscape ? "landscape" : ""}`}>
                  <div className="key-value-container">
                    <p>
                      <strong>Tipo</strong>
                    </p>
                    <p>{type}</p>
                  </div>
                  <div className="key-value-container">
                    <p>
                      <strong>Nivel</strong>
                    </p>
                    <p>{level}</p>
                  </div>
                  <div className="key-value-container">
                    <p><strong>Duración</strong> </p>
                    <p>{duration}</p>
                  </div>
                </div>
                 <div className="effect-container">
                  <p className="effect">
                    <strong>Efecto:</strong> {effect}
                  </p>
                </div>
                <div className="ingredients-container">
                  <h4>Ingredientes:</h4>
                  <div className="ingredient-list">
                    {ingredients.map((ingredient, index) => <div key={index} className="ingredient-row"> <span className="ingredient-name">{ingredient}</span></div>)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PotionList;
