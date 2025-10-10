import Logo from "@/components/Logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedProducts() {
    const [savedProducts, setSavedProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchSavedProducts = async () => {
            const savedProducts = await AsyncStorage.getItem('savedProducts');
            setSavedProducts(savedProducts ? JSON.parse(savedProducts) : []);
        };
        fetchSavedProducts();
    }, []);

    console.log(savedProducts);

    return (
        <View>
            <SafeAreaView>
                <View style={styles.header}>
                <Logo />
                </View>
                <ScrollView><Text>Saved Products</Text></ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
});