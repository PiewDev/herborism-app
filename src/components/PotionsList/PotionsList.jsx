import { useState, useEffect } from "react"
import potionsData from "../../json/potions.json"
import "./PotionsList.css"

function PotionList() {
  const { pociones } = potionsData
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isLandscape = windowWidth > 768

  return (
    <div className="container">
      <div className="potion-list-container">
        {pociones.map((potion) => {
          const { nombre, efecto, duración, nivel, tipo, ingredientes } = potion
          return (
            <div key={nombre} className="potion-card">
              <h3 className="potion-name">{nombre}</h3>
              <div className="potion-card-content">
                <div className={`extra-info ${isLandscape ? "landscape" : ""}`}>
                  <p>
                    <strong>Tipo:</strong> {tipo}
                  </p>
                  <p>
                    <strong>Nivel:</strong> {nivel}
                  </p>
                  <p>
                    <strong>Duración:</strong> {duración}
                  </p>
                </div>
                <div className="effect-container">
                  <p className="effect">
                    <strong>Efecto:</strong> {efecto}
                  </p>
                </div>
                <div className="ingredientes-container">
                  <h4>Ingredientes:</h4>
                  <div className="ingredient-list">
                    {ingredientes.map(({ nombre, cantidad }, index) => (
                      <div key={index} className="ingredient-row">
                        <span className="ingredient-amount">{cantidad}</span>
                        <span className="ingredient-name">{nombre}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PotionList

