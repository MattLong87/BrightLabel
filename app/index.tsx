import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function Index() {

  //on initial load, redirect to savedproducts if there are saved products, otherwise redirect to camera
  useEffect(() => {
    const checkSavedProductsAndRedirect = async () => {
      try {
        const savedProducts = await AsyncStorage.getItem('savedProducts');
        const hasSavedProducts = savedProducts && JSON.parse(savedProducts).length > 0;
        
        if (hasSavedProducts) {
          router.replace('/savedproducts');
        } else {
          router.replace('/camera');
        }
      } catch (error) {
        console.error('Error checking saved products:', error);
        // Default to camera if there's an error
        router.replace('/camera');
      }
    };

    checkSavedProductsAndRedirect();
  }, []);

  // return empty view while redirecting
  return <View />;
}
