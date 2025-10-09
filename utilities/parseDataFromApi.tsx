export default function parseDataFromApi(data: any) {
    const product = data.product;
    const nutrients = product.nutriments;

    const vitaminNames = Array.from(Object.keys(nutrients)).filter((key) => (key.startsWith('vitamin-') && !key.includes('_')));

    //Only displaying vitamins that have a unit of mg here, since that's mentioned in the spec. Future work could account for different units.
    const vitaminInfo = vitaminNames.map((name) => {
        return {
            name: name,
            amountPerServing: nutrients[name + '_serving'],
            unit: nutrients[name + '_unit'],
        }
    }).filter((vitamin) => vitamin.unit === "mg");

    const topThreeVitamins = vitaminInfo.sort((a, b) => b.amountPerServing - a.amountPerServing).slice(0, 3);

    const result = {
        brand: product.brands.split(',')[0],
        name: product.product_name,
        servingSize: product.serving_size,
        caloriesPerServing: nutrients['energy-kcal_serving'],
        carbohydratesPerServing: nutrients['carbohydrates_serving'],
        carbohydratesUnit: nutrients['carbohydrates_unit'],
        proteinPerServing: nutrients['proteins_serving'],  
        proteinUnit: nutrients['proteins_unit'],
        fatPerServing: nutrients['fat_serving'],
        fatUnit: nutrients['fat_unit'],
        topThreeVitamins: topThreeVitamins,
    };

    return result;
}