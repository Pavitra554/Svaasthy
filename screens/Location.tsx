import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapComponent from '../components/MapComponent';

export default function Home() {
  return (
    <GestureHandlerRootView style={styles.container}>
    <SafeAreaView style={styles.container}>
      <MapComponent/>
      <StatusBar style="inverted" backgroundColor='#020202' />
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    
  },
});
