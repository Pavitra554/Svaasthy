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
  const inputval = [(i - 1) * width, i * width, (i + 1) * width];

  const rstyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputval,
      [1, 1, 1],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      inputval,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
      opacity,
    };
  });
  const rtext = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputval,
      [height/2, 0, -height/2],
      Extrapolate.CLAMP
    );
    const op = interpolate(
      translateX.value,
      inputval,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity:op
    };
  });

  const scale = useSharedValue(0);
  const Rstart = useAnimatedStyle(()=>{
    return{
      transform:[{scale:scale.value}]
    };
  });
  useEffect(()=>{
    scale.value = withTiming(1,{duration:200})
  },[])
  return (
    <>
      <SafeAreaView >
      <StatusBar style="dark"/>
        <Animated.View style={[styles.scr,Rstart]}>
          {i === 0 && (
            <Animated.View style={[styles.s0, rstyle]}>
              <View style={styles.bg}></View>
              <Animated.Text style={[styles.textbig,rtext]}>DocThelp</Animated.Text>
              <Animated.View style={rtext}>
                <Image
                  style={{ height: 300, width: 300 }}
                  source={require("../assets/Sc1Bg.png")}
                />
              </Animated.View>
              <Animated.View style={rtext}>
                <Text style={styles.textSlogen}>Doctor's Everytime</Text>
                <Text style={styles.textSlogen}>With You.</Text>
                </Animated.View>
                <Animated.View style={rtext}>
                <Text style={styles.textSlogensm}>
                  Get suggestion's from your Doctor anytime anywhere, Find
                  Hospital's, Medicine Center's and Oxyzen and many more.
                </Text>
                </Animated.View>
              {i === 0 && (
                <Animated.View style={[styles.area,rtext]}>
                  <View
                    style={[styles.bars, { backgroundColor: "#171717" }]}
                  ></View>
                  <View style={styles.bars}></View>
                </Animated.View>
              )}

              <Animated.View style={[styles.swipe,rtext]}>
                <Text style={styles.swipeText}>Swipe</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </Animated.View>
            </Animated.View>
          )}

          {i === 1 && (
            <Animated.View style={[styles.s1, rstyle]}>
              <Text style={styles.textbig1}>DocThelp</Text>
              <LinearGradient
                colors={["#737373", "#393838", "#171717"]}
                style={styles.infoBox}
              >
                <Text style={styles.infoboxhead}>Need a Doctor ?</Text>
                <Text style={styles.infoboxbody}>
                  jdbf dsfsd sdfsfsdfsd{"\n"}dsd dfsd dfgdfdf{'\n'}sdfd sdfdfg gdf{'\n'}dfsdfsdsf
                </Text>
                <Image
                  style={{top: -32, left: 230, position: "absolute" }}
                  source={require("../assets/doctor.png")}
                />
              </LinearGradient>
              <LinearGradient
                colors={["#737373", "#393838", "#171717"]}
                style={styles.infoBox}
              >
                <Text style={styles.infoboxheadinverted}>Feeling Unwell ?</Text>
                <Text style={styles.infoboxbodyinverted}>
                  jdbf dsfsd sdfsfsdfsd{"\n"}dsd dfsd dfgdfdf{'\n'}sdfd sdfdfg gdf{'\n'}dfsdfsdsf
                </Text>
                <Image
                  style={{ top: -32, left: 20, position: "absolute" }}
                  source={require("../assets/doctor.png")}
                />
              </LinearGradient>
              <LinearGradient
                colors={["#737373", "#393838", "#171717"]}
                style={styles.infoBox}
              >
                <Text style={styles.infoboxhead}>Having Question's?</Text>
                <Text style={styles.infoboxbody}>
                  jdbf dsfsd sdfsfsdfsd{"\n"}dsd dfsd dfgdfdf{'\n'}sdfd sdfdfg gdf{'\n'}dfsdfsdsf
                </Text>
                <Image
                  style={{ top: -32, left: 230, position: "absolute" }}
                  source={require("../assets/doctor.png")}
                />
              </LinearGradient>
              {i === 1 && (
                <View style={[styles.area]}>
                  <View style={styles.bars}></View>
                  <View
                    style={[styles.bars, { backgroundColor: "#171717" }]}
                  ></View>
                </View>
              )}
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
    width: 200,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#000",
    elevation: 6,
    marginTop:5
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
  s1: {
    display: "flex",
    alignItems: "center",
    paddingTop: 50,
  },
  infoBox: {
    height: 150,
    width: width - 20,
    borderRadius: 20,
    marginTop: 32,
    elevation: 6,
  },
  infoboxhead: {
    paddingHorizontal: 20,
    paddingTop: 20,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  infoboxbody: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: "#fff",
    fontSize: 12,
  },
  infoboxheadinverted:{
    paddingLeft: 150,
    paddingTop: 20,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    
  },
  infoboxbodyinverted:{
    paddingLeft: 150,
    paddingVertical: 5,
    color: "#fff",
    fontSize: 12,
  
  },
  s2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartScreens;
