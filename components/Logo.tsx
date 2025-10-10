import { Image, StyleSheet, Text, View } from "react-native";

export default function Logo() {
    return (
        <View style={styles.logoContainer}>
            <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
            <Text style={styles.title}>BrightLabel</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    logo: {
        width: 60,
        height: 60,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
})