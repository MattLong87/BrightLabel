import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function IntroScreen({ requestPermission }: { requestPermission: () => void }) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}><Image source={require('@/assets/images/icon.png')} style={styles.logo} /><Text style={styles.title}>BrightLabel</Text></View>
            <View style={styles.imageContainer}><Image source={require('@/assets/images/phone-line-drawing.png')} style={styles.image} /></View>
            <Text style={styles.description}>BrightLabel uses your phone's camera to scan barcodes on food packages and instantly show you clear nutrition facts.</Text>
            <TouchableOpacity style={styles.button} onPress={requestPermission}><Text style={styles.buttonText}>Get Started</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        padding: 20,
        backgroundColor: '#fff'
    },
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
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    description: {
        fontSize: 16,
        maxWidth: '84%',
        textAlign: 'justify',
    },
    button: {
        position: 'absolute',
        bottom: 32,
        left: 32,
        right: 32,
        padding: 20,
        borderRadius: 24,
        backgroundColor: '#ecad00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
