import { StyleSheet, Text, View } from 'react-native';

type DataBoxProps = {
    label: string;
    unit: string;
    amount: number;
    emoji: string;
    color: string;
    dailyValue: number;
};

export default function DataBox({ label, unit, amount, emoji, color, dailyValue }: DataBoxProps) {
    return (
        <View style={styles.boxContainer}>
            <View style={styles.boxContents}>
                <View style={styles.header}>
                    <View style={[styles.icon, { backgroundColor: color }]}><Text style={styles.iconText}>{emoji}</Text></View>
                    <View><Text style={styles.label}>{label}</Text></View>
                </View>
                <Text style={styles.amount}>{amount}{unit}</Text>
                <Text>{dailyValue} Daily Value</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    boxContainer: {
        padding: 5,
        width: '50%',
        maxWidth: '50%',
    },
    boxContents: {
        gap: 6,
        backgroundColor: '#ffffffaa',
        padding: 12,
        borderRadius: 20,
    },
    icon: {
        color: '#000',
        borderRadius: 50,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        fontSize: 18,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        alignItems: 'center',
    },
    amount: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
    },
});
