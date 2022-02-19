import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Button,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const { height, width } = Dimensions.get("window");

interface props {
  title: any;
  i: number;
  translateX: Animated.SharedValue<number>;
}

const StartScreens: React.FC<props> = ({ translateX, i, title }) => {
  const navigation = useNavigation();
  const Login: any = "Login";

  return (
    <>
      <SafeAreaView>
        <StatusBar style="dark" />
        <Animated.View style={[styles.scr, ]}>
          {i === 0 && (
            <Animated.View style={[styles.s0, ]}>
              <View style={styles.bg}></View>
              <Animated.Text style={[styles.textbig]}>
              
              </Animated.Text>
              <Animated.View >
                <Image
                  style={{ height: 300, width: 300,borderRadius:500,}}
                  source={require("../assets/Sc1Bg.png")}
                />
              </Animated.View>
              <Animated.View >
                <Text style={styles.textSlogen}>Doctor's Everytime</Text>
                <Text style={styles.textSlogen}>With You.</Text>
              </Animated.View>
              <Animated.View >
                <Text style={styles.textSlogensm}>
                  Get suggestion's from your Doctor anytime anywhere, Find
                  Hospital's, Medicine Center's and Oxyzen and many more.
                </Text>
              </Animated.View>

              <TouchableWithoutFeedback
                onPress={() => navigation.navigate(Login)}
              >
                <LinearGradient
                  colors={["#737373", "#393838", "#171717"]}
                  style={styles.getStarted}
                >
                  <Text style={styles.ntext}>Get Started</Text>
                  <AntDesign name="arrowright" size={24} color="white" />
                </LinearGradient>
              </TouchableWithoutFeedback>
            </Animated.View>
          )}
        </Animated.View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  scr: {
    height,
    width,
    // display:'flex',
    // justifyContent:'center',
    // alignItems:'center'
    flex: 1,
    backgroundColor: "#fff",
  },
  textbig1: {
    fontWeight: "bold",
    fontSize: 35,
    // marginTop: 45,
  },
  textbig: {
    fontWeight: "bold",
    fontSize: 35,
    marginTop: 45,
  },

  ntext: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    paddingRight: 10,
  },
  getStarted: {
    height: 60,
    width: 250,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#000",
    elevation: 6,
    marginTop: 70,

  },
  s0: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  bg: {
    position: "absolute",
    top: -100,
    height: 610,
    width,
    borderRadius: 50,
    backgroundColor: "#737373",
    opacity: 0.1,
  },
  area: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  bars: {
    height: 5,
    width: 50,
    marginTop: 50,
    marginHorizontal: 3,
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  swipe: {
    width,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  swipeText: {
    fontSize: 22,
    paddingRight: 20,
    opacity: 0.8,
  },
  textSlogen: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  textSlogensm: {
    width: 300,
    fontSize: 15,
    textAlign: "center",
    color: "rgba(0,0,0,0.5)",
    paddingTop: 30,
  },
  
});

export default StartScreens;
