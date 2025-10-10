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
                <Text style={styles.dailyValue}>{dailyValue}% Daily Value</Text>
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
        paddingLeft: 13,
        paddingRight: 13,
        paddingTop: 13,
        paddingBottom: 18,
        borderRadius: 24,
    },
    icon: {
        color: '#000',
        borderRadius: 50,
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        fontSize: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 8,
        alignItems: 'center',
    },
    amount: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
        paddingLeft: 3
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: '#000',
    },  
    dailyValue: {
        fontSize: 10,
        color: '#000',
        paddingLeft: 3
    },
});
