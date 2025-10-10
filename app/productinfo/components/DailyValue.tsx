import { StyleSheet, Text } from 'react-native';

export default function DailyValue({ dailyValue }: { dailyValue: number }) { 
    if(dailyValue > 0) {
        return <Text style={styles.dailyValue}>{dailyValue}% DV</Text>
    }
} 

const styles = StyleSheet.create({
    dailyValue: {
        fontSize: 11,
        color: '#000',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#c5c2b9',
    },
});
