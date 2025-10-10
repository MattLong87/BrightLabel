import PrimaryButton from '@/components/PrimaryButton';
import ProductInfoSkeleton from '@/components/ProductInfoSkeleton';
import parseDataFromApi from '@/utilities/parseDataFromApi';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DailyValue from './components/DailyValue';
import DataBox from './components/DataBox';

export default function DetailsScreen() {
    const { upc } = useLocalSearchParams();
    const [productData, setProductData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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

    if (loading) {
        return <ProductInfoSkeleton />;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#fbf7ee', '#e9daa9',]}
                    style={styles.background}
                />
                <View style={styles.errorTextContainer}>
                    <Text style={styles.errorTitle}>Sorry, we don't have any data for this product</Text>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
                <View style={styles.errorButtonContainer}>
                    <PrimaryButton title="Scan Another Product" onPress={() => {
                        setError(null);
                        setLoading(true);
                        router.push('/');
                    }} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            {productData && !loading && !error && (
                <>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={['#fbf7ee', '#e9daa9',]}
                        style={styles.background}
                    />
                    <SafeAreaView>
                        <ScrollView>
                            <View style={styles.productInfoContainer}>
                                <Text style={styles.upcNumber}>UPC {upc}</Text>
                                <View>
                                    {productData.brand && <Text style={styles.brand}>{productData.brand}</Text>}
                                    <Text style={styles.productName}>{productData.name}</Text>
                                </View>
                                <View style={styles.horizontalInfoContainer}>
                                    <Text style={styles.horizontalInfoLabel}>Serving Size</Text>
                                    <Text style={styles.horiztonalInfoValue}>{productData.servingSize}</Text>
                                </View>
                                <View style={styles.dataBoxContainer}>
                                    <DataBox label="Calories" unit='kcal' amount={productData.caloriesPerServing} emoji="🔥" color="#ebcfb0" dailyValue={0} countDuration={1} />
                                    <DataBox label="Carbohydrates" unit={productData.carbohydratesUnit} amount={productData.carbohydratesPerServing} emoji="🍞" color="#f4ecd2" dailyValue={productData.carbohydratesDailyValue} countDuration={2} />
                                    <DataBox label="Protein" unit={productData.proteinUnit} amount={productData.proteinPerServing} emoji="🍗" color="#f9e9e8" dailyValue={productData.proteinDailyValue} countDuration={3} />
                                    <DataBox label="Fat" unit={productData.fatUnit} amount={productData.fatPerServing} emoji="🥑" color="#e6f6e6" dailyValue={productData.fatDailyValue} countDuration={4} />
                                </View>
                                {productData.topVitamins.length > 0 && <View>
                                    <Text style={styles.brand}>Top Vitamins</Text>
                                    <View style={styles.vitaminsContainer}>
                                        {productData.topVitamins.map((vitamin: any, index: number) => (
                                            <View key={index} style={styles.horizontalInfoContainer}>
                                                <Text style={styles.horizontalInfoLabel}>{vitamin.name}</Text>
                                                <View style={styles.horiztonalInfoData}>
                                                    <Text style={styles.horiztonalInfoValue}>{vitamin.amountPerServing}{vitamin.unit}</Text>
                                                    <DailyValue dailyValue={vitamin.percentageDailyValue.toFixed(2)} />
                                                </View>
                                            </View>
                                        ))}
                                    </View>
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
    errorContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productInfoContainer: {
        gap: 30,
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        maxWidth: '90%',
    },
    errorTextContainer: {
        backgroundColor: '#ffffffaa',
        paddingVertical: 40,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    errorText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 40,
        color: '#00000099',
    },
    errorButtonContainer: {
        position: 'absolute',
        bottom: 32,
        left: 32,
        right: 32,
    },
    upcNumber: {
        fontSize: 11,
        textAlign: 'right',
    },
    horizontalInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffffaa',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 20,
    },
    horizontalInfoLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    horiztonalInfoData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    horiztonalInfoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    horiztonalInfoDailyValue: {
        fontSize: 10,
        textAlign: 'right',
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
    vitaminsContainer: {
        gap: 10,
        marginTop: 10,
    },
});
