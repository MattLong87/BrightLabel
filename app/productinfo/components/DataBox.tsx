import { StyleSheet, Text, View } from 'react-native';
import { CountUp } from 'use-count-up';
import DailyValue from './DailyValue';

type DataBoxProps = {
    label: string;
    unit: string;
    amount: number;
    emoji: string;
    color: string;
    dailyValue: number;
    countDuration: number;
};

export default function DataBox({ label, unit, amount, emoji, color, dailyValue, countDuration }: DataBoxProps) {
    return (
        <View style={styles.boxContainer}>
            <View style={styles.boxContents}>
                <View style={styles.header}>
                    <View style={[styles.icon, { backgroundColor: color }]}><Text style={styles.iconText}>{emoji}</Text></View>
                    <View><Text style={styles.label}>{label}</Text></View>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}><CountUp isCounting end={amount} duration={countDuration} />{unit === 'kcal' ? ' ' : ''}{unit}</Text>
                    <DailyValue dailyValue={dailyValue} />
                </View>
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
        width: 40,
        height: 40,
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
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        fontSize: 11,
        color: '#000',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#d4bf81',
    },
});
