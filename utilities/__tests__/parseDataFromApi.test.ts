import { mockApiData } from '../mockapidata';
import parseDataFromApi from '../parseDataFromApi';

describe('parseDataFromApi', () => {
    const result = parseDataFromApi(mockApiData);

  it('should parse basic product information correctly', () => {

    expect(result.brand).toBe('Clif');
    expect(result.name).toBe('Chocolate chip energy bar minis');
    expect(result.servingSize).toBe('1 BAR (28 g)');
    expect(result.caloriesPerServing).toBe(100);
  });

  it('should calculate daily values for macronutrients correctly', () => {
    
    // Carbohydrates: 18g / 275g * 100 = ~7%
    expect(result.carbohydratesDailyValue).toBe(7);
    
    // Protein: 4g / 50g * 100 = 8%
    expect(result.proteinDailyValue).toBe(8);
    
    // Fat: 2g / 78g * 100 = ~3%
    expect(result.fatDailyValue).toBe(3);
  });

  it('should format vitamin amounts correctly', () => {
    // Find top vitamins
    const vitaminB2 = result.topVitamins.find((v: any) => v.name === 'Vitamin B2');
    expect(vitaminB2).toBeDefined();
    const vitaminPP = result.topVitamins.find((v: any) => v.name === 'Vitamin PP');
    expect(vitaminPP).toBeDefined();
    const vitaminB6 = result.topVitamins.find((v: any) => v.name === 'Vitamin B6');
    expect(vitaminB6).toBeDefined();
    
    // Should show correct vitamin amounts, in mg
    expect(vitaminB2?.amountPerServing).toBe(0.000068);
    expect(vitaminB2?.unit).toBe('mg');
    expect(vitaminPP?.amountPerServing).toBe(0.0008);
    expect(vitaminPP?.unit).toBe('mg');
    expect(vitaminB6?.amountPerServing).toBe(0.00008);
    expect(vitaminB6?.unit).toBe('mg');
  });
});