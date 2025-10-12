export default function parseDataFromApi(data: any) {
    const product = data.product;
    const nutrients = product.nutriments;

    //DAILY VALUES
    //these values are from https://www.fda.gov/food/nutrition-facts-label/daily-value-nutrition-and-supplement-facts-labels
    //for vitamin A, the recommended daily value got a lot more complicated in 2016, so I'm going to use the older value for this project
    //vitaminB1 = thiamin
    //vitaminPP = niacin
    //vitaminB2 = riboflavin
    //all vitamin values have been converted to mg for standardization, since "mg" is referenced in the spec
    const targetDailyValues: Record<string, number> = {
        carbohydrates: 275,
        protein: 50,
        fat: 78,
        'vitamin-a': 1.5,
        'vitamin-b2': 1.3,
        'vitamin-b6': 1.7,
        'vitamin-b12': .0024,
        'vitamin-c': 90,
        'vitamin-d': .02,
        'vitamin-e': 15,
        'vitamin-k': .12,
        'vitamin-b1': 1.2,
        'vitamin-pp': 16
    }
    const carbohydratesDailyValue = Math.round(100 * nutrients['carbohydrates_serving'] / targetDailyValues.carbohydrates);
    const proteinDailyValue = Math.round(100 * nutrients['proteins_serving'] / targetDailyValues.protein);
    const fatDailyValue = Math.round(100 * nutrients['fat_serving'] / targetDailyValues.fat);

    //VITAMINS
    const vitaminNames = Array.from(Object.keys(nutrients)).filter((key) => (key.startsWith('vitamin-') && !key.includes('_')));

    function convertIUtoMcg(amount: number){
        return amount * 0.025;
    }

    function convertMcgToMg(amount: number){
        return amount * 0.001;
    }

    function formatVitaminAmount(amount: number): number {
        // For very small decimal numbers, show only 2 significant digits after leading zeros
        // For scientific notation, keep as is
        if (amount < 0.001 && amount > 0) {
            // Convert to string to count leading zeros
            const str = amount.toString();
            if (str.includes('e')) {
                // Round scientific notation coefficient to 2 decimal places
                const parts = str.split('e');
                const coefficient = parseFloat(parts[0]);
                const exponent = parts[1];
                const roundedCoefficient = Math.round(coefficient * 100) / 100;
                return parseFloat(`${roundedCoefficient}e${exponent}`);
            } else {
                // For small decimals like 0.00000512820512820513
                // Find the position after the decimal point and leading zeros
                const decimalPart = str.split('.')[1];
                if (decimalPart) {
                    const leadingZerosMatch = decimalPart.match(/^0*/);
                    if (leadingZerosMatch) {
                        const leadingZeros = leadingZerosMatch[0].length;
                        const significantDigits = decimalPart.substring(leadingZeros, leadingZeros + 2);
                        return parseFloat(`0.${'0'.repeat(leadingZeros)}${significantDigits}`);
                    }
                }
            }
        }
        // For larger numbers, clean up floating point precision issues
        return parseFloat(amount.toPrecision(15));
    }

    const vitaminInfo = vitaminNames.map((name) => {
        const vitaminUnit = nutrients[name + '_unit'];
        if(vitaminUnit === 'IU'){
            nutrients[name + '_serving'] = convertMcgToMg(convertIUtoMcg(nutrients[name + '_serving']));
            nutrients[name + '_unit'] = 'mg';
        }
        if(vitaminUnit === 'µg' || vitaminUnit === 'mcg'){
            nutrients[name + '_serving'] = convertMcgToMg(nutrients[name + '_serving']);
            nutrients[name + '_unit'] = 'mg';
        }
        const formattedAmount = formatVitaminAmount(nutrients[name + '_serving']);
        return {
            name: 'Vitamin ' + name.split('-')[1].toUpperCase(),
            amountPerServing: formattedAmount,
            unit: nutrients[name + '_unit'],
            percentageDailyValue: 100 * formattedAmount / targetDailyValues[name],
        }
    });

    //I'm considering "top vitamins" to be vitamins that have the highest percentage of the daily value
    const topVitamins = vitaminInfo.filter((vitamin) => vitamin.percentageDailyValue > 0).sort((a, b) => b.percentageDailyValue - a.percentageDailyValue).slice(0, 3);

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
        topVitamins: topVitamins,
    };

    return result;
}