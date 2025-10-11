import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function ModalConfirmation({ title, primaryButtonText, cancelButtonText, onPress, onCancel, visible }: { title: string, primaryButtonText: string, cancelButtonText: string, onPress: () => void, onCancel: () => void, visible: boolean }) {
    return(
        <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>{title}</Text>
                <View style={styles.modalButtonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => onCancel()}>
                        <Text style={styles.cancelButtonText}>{cancelButtonText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.primaryButton} onPress={() => onPress()}>
                        <Text style={styles.primaryButtonText}>{primaryButtonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#00000074',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        paddingVertical: 30,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        width: '100%',
    },
    primaryButton: {
        backgroundColor: '#efbd32',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    primaryButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    cancelButton: {
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    cancelButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
    },
});