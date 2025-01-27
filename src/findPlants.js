import plantsData from "./json/plants.json";
import statesConfig from "./json/statesConfig.json";
import weightConfig from "./json/weightConfig.json";

function getProximityScore(current, target, array) {
    const currentIndex = array.indexOf(current);
    const targetIndex = array.indexOf(target);
    
    if (currentIndex === -1 || targetIndex === -1) return 0;
    
    const maxDistance = array.length - 1;
    const distance = Math.abs(currentIndex - targetIndex);
    return 1 - (distance / maxDistance);
}

function calculatePlantWeight(plant, conditions, states, weights) {
    // Calcular puntuaciones de proximidad
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

    // Obtener peso de rareza
    const rarityWeight = weights.rarityWeights[plant.rarity] || 1;

    // Peso total
    return (biomeScore + climateScore + tempScore) * rarityWeight;
}

function getWeightedPlants(conditions, number, allowDuplicates = true) {
      // Paso 1: Filtrar plantas que NO tengan las condiciones actuales en su lista except
      const validPlants = plantsData.filter(plant => {
        return !plant.except.some(excludedCondition => 
            excludedCondition === conditions.baseTerrain ||
            excludedCondition === conditions.climate ||
            excludedCondition === conditions.temperature
        );
    });

    if (validPlants.length === 0) return [];

    // Paso 2: Calcular pesos (resto del algoritmo igual)
    const weightedPlants = validPlants.map(plant => ({
        plant,
        weight: calculatePlantWeight(plant, conditions, statesConfig, weightConfig)
    }));

    // Paso 3: Selección ponderada
    const results = [];
    const candidates = [...weightedPlants];
    let remaining = number;

    while (remaining > 0 && candidates.length > 0) {
        const totalWeight = candidates.reduce((sum, c) => sum + c.weight, 0);
        if (totalWeight <= 0) break; // Prevenir bucle infinito

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

export default {
    getWeightedPlants
}