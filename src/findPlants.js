import plantsData from "./json/plants.json";
import statesConfig from "./json/statesConfig.json";
import weightConfig from "./json/weightConfig.json";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
function getProximityScore(current, target, array) {
    const currentIndex = array.indexOf(current);
    const targetIndex = array.indexOf(target);
    
    if (currentIndex === -1 || targetIndex === -1) return 0;
    
    const maxDistance = array.length - 1;
    const distance = Math.abs(currentIndex - targetIndex);
    return 1 - (distance / maxDistance);
}

/**
 * @param {{baseTerrain: string, climate: string, temperature: string, light: string, momentOfDay: string}} conditions 
 * @param {{biomes: string[], climates: string[], temperatures: string[], lights: string[], momentOfDays: string[]}} states 
 */
function calculatePlantWeight(plant, conditions, states, weights) {
    const biomeScore = getProximityScore(
        conditions.baseTerrain,
        plant.baseTerrain,
        states.biomes
    ) * weights.biomeWeight;

    const climateScore = getProximityScore(
        conditions.climate,
        plant.climate,
        states.climates
    ) * weights.climateWeight;

    const tempScore = getProximityScore(
        conditions.temperature,
        plant.temperature,
        states.temperatures
    ) * weights.temperatureWeight;

    const lightScore = getProximityScore(
        conditions.light,
        plant.light,
        states.lights
    ) * weights.lightWeight;

    let momentOfDayScore;
    if (plant.momentOfDay === "All") {
        momentOfDayScore = 1;
    } else {
        momentOfDayScore = getProximityScore(
            conditions.momentOfDay,
            plant.momentOfDay,
            states.momentOfDays
        );
    }

    const rarityWeight = weights.rarityWeights[plant.rarity] || 1;
    return (biomeScore + climateScore + tempScore + lightScore + momentOfDayScore) * rarityWeight;
}

function getWeightedPlants(conditions, number, allowDuplicates = true) {
    const validPlants = plantsData.filter(plant => {
        return !plant.except.some(excludedCondition => 
            excludedCondition === conditions.baseTerrain ||
            excludedCondition === conditions.climate ||
            excludedCondition === conditions.temperature ||
            excludedCondition === conditions.light ||
            (conditions.momentOfDay !== "All" && excludedCondition === conditions.momentOfDay)
        );
    });

    if (validPlants.length === 0) return [];

    const weightedPlants = validPlants.map(plant => ({
        plant,
        weight: calculatePlantWeight(plant, conditions, statesConfig, weightConfig)
    }));

    const results = [];
    const candidates = [...weightedPlants];
    let remaining = number;

    while (remaining > 0 && candidates.length > 0) {
        const totalWeight = candidates.reduce((sum, c) => sum + c.weight, 0);
        if (totalWeight <= 0) break;

        const random = Math.random() * totalWeight;
        let cumulative = 0;
        
        for (let i = 0; i < candidates.length; i++) {
            cumulative += candidates[i].weight;
            if (random <= cumulative) {
                results.push(candidates[i].plant);
                if (!allowDuplicates) candidates.splice(i, 1);
                remaining--;
                break;
            }
        }
    }

    return results.slice(0, number);
}

/**
 * Función para generar y descargar un PDF de forma dinámica a partir de una lista de objetos.
 * Se extraen los headers a partir de las claves del primer objeto y se generan las filas correspondientes.
 * 
 * @param {Array<Object>} list - Lista de objetos a incluir en la tabla del PDF.
 */
function downloadPDF(list) {
    const doc = new jsPDF();

    if (!list || list.length === 0) {
        doc.text("No hay datos para mostrar", 10, 10);
        doc.save("data.pdf");
        return;
    }

    const columns = Object.keys(list[0]);
    const rows = list.map(item =>
        columns.map(key => {
            const value = item[key];
            return Array.isArray(value) ? value.join(", ") : value;
        })
    );

    // Llamar a autoTable pasando el documento
    autoTable(doc, {
        head: [columns],
        body: rows,
    });

    doc.save("data.pdf");
}


export {
    getWeightedPlants,
    downloadPDF
};
