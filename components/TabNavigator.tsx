import React from "react";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import Location from "../screens/Location";
import Setting from "../screens/Setting";
import Home from "../screens/Home";

const Tab = createMaterialBottomTabNavigator();


export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="rgba(0,0,255,0.5)"
      barStyle={{ backgroundColor: "#fff" }}
    >
      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="enviromento" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color="#000" />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={24} color="#000" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
