import * as React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import useAuth from "../hooks/useAuth";
import InterpolateScreen from "../screens/InterpolateScreen";
import TabNavigator from "./TabNavigator";
import DetailScreen from "../screens/DetailScreen";


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const {user}:any  = useAuth();
  return (
        <Stack.Navigator>
          {user ? (
            <>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={TabNavigator} />
            <Stack.Screen
                name="detail"
                options={{ headerShown: false }}
                component={DetailScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="StartScreen"
                options={{ headerShown: false }}
                component={InterpolateScreen}
              />
              <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={Login}
              />
              
            </>
          )}
        </Stack.Navigator>
  );
}
