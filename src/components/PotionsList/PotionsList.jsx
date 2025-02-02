import React from 'react';
import potionsData from '../../json/potions.json';
import './PotionsList.css';



function PotionList() {
    const { pociones } = potionsData;
    
    return (
        <div className="potion-list-container">
            {pociones.map((potion) => {
                const { nombre, efecto, duracion, nivel, tipo, ingredientes } = potion;
                return (
                    <div key={nombre} className="potion-card">
                        <h3 className="potion-name">{nombre}</h3>
                        <div className="potion-details">
                            <p><strong>Efecto:</strong> {efecto}</p>
                            <p><strong>Duración:</strong> {duracion}</p>
                            <p><strong>Nivel:</strong> {nivel}</p>
                            <p><strong>Tipo:</strong> {tipo}</p>
                            <div className='ingredientes-container'>
                              <h4>Ingredientes:</h4>
                                <div className="ingredient-list">
                                    {ingredientes.map(({ nombre, cantidad }, index) => (
                                        <p key={index} className="ingredient-row">
                                            {cantidad} - {nombre}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default PotionList;