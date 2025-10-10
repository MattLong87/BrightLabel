import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function PrimaryButton({ title, onPress }: { title: string, onPress: () => void }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        borderRadius: 24,
        backgroundColor: '#ecad00',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});