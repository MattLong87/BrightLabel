import Logo from "@/components/Logo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SavedProductButton from "./components/SavedProductButton";

export default function SavedProducts() {
    const [savedProducts, setSavedProducts] = useState<any[]>([]);

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

    return (
        <View style={{backgroundColor: '#ffffff', flex: 1}}>
            <SafeAreaView>
                <View style={styles.header}>
                    <Logo />
                </View>
                <ScrollView>
                    <View style={styles.savedProductsContainer}>
                        {savedProducts.reverse().map((product, i) => (
                            <SavedProductButton key={i} product={product} onPress={() => handleSavedProductClick(product.upc)} />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
            <TouchableOpacity style={styles.scanButton} onPress={() => router.push('/')}>
                <MaterialCommunityIcons name="plus" size={36} color="#fff" />
            </TouchableOpacity>
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
});