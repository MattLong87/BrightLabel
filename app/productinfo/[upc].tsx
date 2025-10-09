import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
        
        // Get API key from environment variable, or use demo key as fallback
        const apiKey = process.env.EXPO_PUBLIC_API_KEY || 'DEMO_KEY';
        
        if (!apiKey) {
          throw new Error('API key not found in environment variables');
        }
        
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${upc}&api_key=${apiKey}`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProductData(data);
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
      <Text style={styles.title}>Product Details for UPC: {upc}</Text>
      
      {loading && <Text style={styles.loading}>Loading...</Text>}
      
      {error && <Text style={styles.error}>Error: {error}</Text>}
      
      {productData && !loading && !error && (
        <Text style={styles.data}>
          {JSON.stringify(productData, null, 2)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  data: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    fontFamily: 'monospace',
  },
});

