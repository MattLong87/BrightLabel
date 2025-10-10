import Logo from "@/components/Logo";
import PrimaryButton from "@/components/PrimaryButton";
import { Image, StyleSheet, Text, View } from "react-native";

export default function IntroScreen({ requestPermission }: { requestPermission: () => void }) {
    return (
        <View style={styles.container}>
            <Logo />
            <View style={styles.imageContainer}><Image source={require('@/assets/images/phone-line-drawing.png')} style={styles.image} /></View>
            <Text style={styles.description}>BrightLabel uses your phone's camera to scan barcodes on food packages and instantly show you clear nutrition facts.</Text>
            <View style={styles.buttonContainer}><PrimaryButton title="Get Started" onPress={requestPermission} /></View>
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
    buttonContainer: {
        position: 'absolute',
        bottom: 32,
        left: 32,
        right: 32,
    },
});
