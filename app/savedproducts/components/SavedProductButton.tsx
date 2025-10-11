import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SavedProductButton({ product, onPress }: { product: any, onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <View style={styles.textContainer}>
                {product.brand && <Text style={styles.brandName}>{product.brand}</Text>}
                <Text style={styles.productName}>{product.name}</Text>
            </View>
            <View style={styles.iconContainer}><MaterialCommunityIcons name="chevron-right" size={30} color="#000" /></View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 24,
        backgroundColor: '#fff6d2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    textContainer: {
        gap: 0,
    },
    brandName: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconContainer: {
        width: 46,
        height: 46,
        paddingLeft: 3,
        backgroundColor: '#ffffff',
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
});