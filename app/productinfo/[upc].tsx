import parseDataFromApi from '@/utilities/parseDataFromApi';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DataBox from './components/DataBox';

export default function DetailsScreen() {
  const { upc } = useLocalSearchParams();
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!upc) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${upc}.json`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProductData(parseDataFromApi(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [upc]);

  return (
    <View style={styles.container}>

      {loading && <Text style={styles.loading}>Loading...</Text>}

      {error && <Text style={styles.error}>Error: {error}</Text>}

      {productData && !loading && !error && (
        <>
          <LinearGradient
            // Background Linear Gradient
            colors={['#fbf7ee', '#e9daa9', ]}
            style={styles.background}
          />
          <SafeAreaView>
            <ScrollView>
              <Text style={styles.upcNumber}>#{upc}</Text>
              <View style={styles.productInfoContainer}>
                <View>
                  {productData.brand && <Text style={styles.brand}>{productData.brand}</Text>}
                  <Text style={styles.productName}>{productData.name}</Text>
                </View>
                <View style={styles.servingSizeContainer}>
                  <Text style={styles.servingSizeLabel}>Serving Size</Text>
                  <Text style={styles.servingSizeValue}>{productData.servingSize}</Text>
                </View>
                <View style={styles.dataBoxContainer}>
                  <DataBox label="Calories" unit='' amount={productData.caloriesPerServing} emoji="🔥" color="#ebcfb0" dailyValue={99} />
                  <DataBox label="Carbohydrates" unit={productData.carbohydratesUnit} amount={productData.carbohydratesPerServing} emoji="🍞" color="#f4ecd2" dailyValue={99} />
                  <DataBox label="Protein" unit={productData.proteinUnit} amount={productData.proteinPerServing} emoji="🍗" color="#f9e9e8" dailyValue={99} />
                  <DataBox label="Fat" unit={productData.fatUnit} amount={productData.fatPerServing} emoji="🥑" color="#e6f6e6" dailyValue={99} />
                </View>
                {productData.topThreeVitamins.length > 0 && <View>
                  <Text style={styles.brand}>Top Three Vitamins</Text>
                  {productData.topThreeVitamins.map((vitamin: any, index: number) => (
                    <View key={index}>
                      <Text>{vitamin.amountPerServing}{vitamin.unit}</Text>
                      <Text>{vitamin.name}</Text>
                    </View>
                  ))}
                </View>}
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  container: {
    flex: 1,
    padding: 20,
  },
  productInfoContainer: {
    gap: 30,
  },
  loading: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  error: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginTop: 20,
  },
  upcNumber: {
    fontSize: 11,
    color: '#666',
    textAlign: 'right',
  },
  servingSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffffaa',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 20,
  },
  servingSizeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  servingSizeValue: {
    fontSize: 14,
  },
  brand: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  productName: {
    fontSize: 24,
    color: '#000',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  dataBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: -5,
    marginRight: -5,
  },
});
