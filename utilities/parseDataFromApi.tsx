export default function parseDataFromApi(data: any) {
    const product = data.product;
    const nutrients = product.nutriments;

    //DAILY VALUES
    //these values are from https://www.fda.gov/food/nutrition-facts-label/daily-value-nutrition-and-supplement-facts-labels
    const targetDailyValues = {
        carbohydrates: 275,
        protein: 50,
        fat: 78,
    }
    const carbohydratesDailyValue = Math.round(100 * nutrients['carbohydrates_serving'] / targetDailyValues.carbohydrates);
    const proteinDailyValue = Math.round(100 * nutrients['proteins_serving'] / targetDailyValues.protein);
    const fatDailyValue = Math.round(100 * nutrients['fat_serving'] / targetDailyValues.fat);

    //VITAMINS
    const vitaminNames = Array.from(Object.keys(nutrients)).filter((key) => (key.startsWith('vitamin-') && !key.includes('_')));

    //Only displaying vitamins that have a unit of mg here, since that's mentioned in the spec. Future work could account for different units.
    const vitaminInfo = vitaminNames.map((name) => {
        return {
            name: name,
            amountPerServing: nutrients[name + '_serving'],
            unit: nutrients[name + '_unit'],
        }
    }).filter((vitamin) => vitamin.unit === "mg");

    const topThreeVitamins = vitaminInfo.filter((vitamin) => vitamin.amountPerServing > 0).sort((a, b) => b.amountPerServing - a.amountPerServing).slice(0, 3);

    const result = {
        brand: product.brands ? product.brands.split(',')[0] : '',
        name: product.product_name,
        servingSize: product.serving_size,
        caloriesPerServing: nutrients['energy-kcal_serving'],
        carbohydratesPerServing: nutrients['carbohydrates_serving'],
        carbohydratesUnit: nutrients['carbohydrates_unit'],
        carbohydratesDailyValue: carbohydratesDailyValue,
        proteinPerServing: nutrients['proteins_serving'],  
        proteinUnit: nutrients['proteins_unit'],
        proteinDailyValue: proteinDailyValue,
        fatPerServing: nutrients['fat_serving'],
        fatUnit: nutrients['fat_unit'],
        fatDailyValue: fatDailyValue,
        topThreeVitamins: topThreeVitamins,
    };

    return result;
}