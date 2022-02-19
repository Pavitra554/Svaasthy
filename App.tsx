import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./components/StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
LogBox.ignoreAllLogs();

export default function App() {
  return (
    // <GestureHandlerRootView style={styles.container}>
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
    // </GestureHandlerRootView> 

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
