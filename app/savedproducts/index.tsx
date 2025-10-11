import Logo from "@/components/Logo";
import ModalConfirmation from "@/components/ModalConfirmation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SavedProductButton from "./components/SavedProductButton";

export default function SavedProducts() {
    const [savedProducts, setSavedProducts] = useState<any[]>([]);
    const [clearModalVisible, setClearModalVisible] = useState(false);

    useEffect(() => {
        const fetchSavedProducts = async () => {
            const savedProducts = await AsyncStorage.getItem('savedProducts');
            setSavedProducts(savedProducts ? JSON.parse(savedProducts) : []);
        };
        fetchSavedProducts();
    }, []);

    function handleSavedProductClick(upc: string) {
        router.push(`/productinfo/${upc}`);
    }

    function handleClearProducts() {
        setClearModalVisible(false);
        AsyncStorage.removeItem('savedProducts');
        setSavedProducts([]);
    }



    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
            <SafeAreaView>
                <View style={styles.header}>
                    <Logo />
                </View>
                <ScrollView>

                    <View style={styles.savedProductsContainer}>
                        {savedProducts.length > 0 ? (
                            savedProducts.reverse().map((product, i) => (
                                <SavedProductButton key={i} product={product} onPress={() => handleSavedProductClick(product.upc)} />
                            ))
                        ) : (
                            <Text style={styles.noSavedProductsText}>No saved products. Scan a product to get started.</Text>
                        )}
                    </View>

                    {savedProducts.length > 0 && (
                        <TouchableOpacity style={styles.clearButton} onPress={() => setClearModalVisible(true)}>
                            <Text style={styles.clearButtonText}>Clear Saved Products</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </SafeAreaView>
            <TouchableOpacity style={styles.scanButton} onPress={() => router.push('/')}>
                <MaterialCommunityIcons name="plus" size={36} color="#fff" />
            </TouchableOpacity>
            <ModalConfirmation title="Clear all saved products? This action cannot be undone." primaryButtonText="Clear" cancelButtonText="Cancel" onPress={() => handleClearProducts()} onCancel={() => setClearModalVisible(false)} visible={clearModalVisible} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 20,
    },
    savedProductsContainer: {
        gap: 16,
        paddingHorizontal: 20,
    },
    scanButton: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        backgroundColor: '#efbd32',
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        height: 64,
    },
    clearButton: {
        padding: 14,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
    clearButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#5e5e5e',
    },
    noSavedProductsText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#000000',
        maxWidth: '80%',
        margin: 'auto',
    },
});