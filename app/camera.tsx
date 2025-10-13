import IntroScreen from '@/components/IntroScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [light, setLight] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const barcodeDetected = useRef<boolean>(false);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      // Start camera when screen gains focus
      setCameraActive(true);
      barcodeDetected.current = false;

      return () => {
        // Stop camera when screen loses focus
        setCameraActive(false);
      };
    }, [])
  );

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return <IntroScreen requestPermission={requestPermission} />;
  }

  function toggleCameraFacing() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleCameraLight() {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    )
    setLight(current => !current);
  }

  function onBarcodeScanned(event: BarcodeScanningResult) {
    if (barcodeDetected.current) {
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    barcodeDetected.current = true;
    return router.push(`/productinfo/${event.data}` as any);
  }

  return (
    <View style={styles.container}>
      {cameraActive && <CameraView style={styles.camera} facing={facing} barcodeScannerSettings={{ barcodeTypes: ["upc_a", "ean13"], }} onBarcodeScanned={onBarcodeScanned} enableTorch={light} />}
      <View style={styles.guideBoxContainer}><View style={styles.guideBox} /><Text style={styles.guideBoxText}>Scan a barcode</Text></View>
      <SafeAreaView style={styles.buttonsOverlay}>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/savedproducts')}>
            <MaterialCommunityIcons name="close" size={30} color="#e4e4e4" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={[styles.button, facing === 'front' && styles.buttonActive]} onPress={toggleCameraFacing}>
            <MaterialCommunityIcons name="camera-flip" size={30} color="#e4e4e4" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, light && styles.buttonActive]} onPress={toggleCameraLight}>
            <MaterialCommunityIcons name="flashlight" size={30} color="#e4e4e4" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  guideBoxContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  guideBox: {
    width: '70%',
    height: 200,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 24,
  },
  guideBoxText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 40,
  },
  buttonsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#e4e4e4',
    width: 64,
    height: 64,
  },
  buttonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});