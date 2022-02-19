import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  Dimensions,

} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import StartScreens from "../components/StartScreens";

const { height, width } = Dimensions.get("window");

export default function InterpolateScreen() {
  const translateX = useSharedValue(0);
  const scrollHanler = useAnimatedScrollHandler((e) => {
    translateX.value = e.contentOffset.x;
  });

  const data = ["screeen1"];

  return (
    <Animated.ScrollView
      horizontal
      onScroll={scrollHanler}
      scrollEventThrottle={16}
      snapToInterval={width}
     decelerationRate='normal'
      style={styles.main}
    >
      {data.map((title, index) => {
        return (
          <StartScreens
            key={index.toString()}
            title={title}
            i={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  scr: {
    height,
    width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textbig: {
    fontWeight: "bold",
    fontSize: 30,
  },
});
