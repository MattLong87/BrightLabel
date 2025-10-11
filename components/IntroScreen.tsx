import Logo from "@/components/Logo";
import PrimaryButton from "@/components/PrimaryButton";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IntroScreen({ requestPermission }: { requestPermission: () => void }) {
    return (
        <SafeAreaView style={styles.container}>
            <Logo />
            <View style={styles.centerContainer}>
                <View style={styles.imageContainer}><Image source={require('@/assets/images/phone-line-drawing.png')} style={styles.image} /></View>
                <Text style={styles.description}>BrightLabel uses your phone's camera to scan barcodes on food packages and instantly show you clear nutrition facts.</Text>
            </View>
            <View style={styles.buttonContainer}><PrimaryButton title="Get Started" onPress={requestPermission} /></View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: '#fff'
    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
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
        width: '100%',
    },
});
