import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useAuth from "../hooks/useAuth";

const { height, width } = Dimensions.get("window");
export default function Login() {
  const [on, setOn] = React.useState(false);
  const { signInWithGoogle }: any = useAuth();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  const rstyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 });
    scale.value = withTiming(1, { duration: 400 });
  }, []);
  return (
      <View style={styles.main}>
        <Animated.View style={[styles.upDot,rstyle]}></Animated.View>
        <Animated.Text style={[styles.textbig,rstyle]}>Welcome To{'\n'}DocThelp</Animated.Text>
        <Animated.Image style={[{height:350,width:350,marginBottom:50},rstyle]} source={require('../assets/loginBg.png')}/>

        <TouchableWithoutFeedback
          onPress={() => {
            signInWithGoogle(), setOn(!on);
          }}
        >
          <Animated.View style={[styles.signinBtn, rstyle]}>
            {!on ? (
              <LinearGradient  colors={["#737373", "#393838", "#171717"]} style={styles.signinBtn}>
                <Image
                  style={styles.gicon}
                  source={require("../assets/GoogleIcon.png")}
                />
                <Text style={styles.text}>Continue With Google</Text>
              </LinearGradient>
            ) : (
              <ActivityIndicator size="large" color="#fff" />
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
        <View style={styles.downDot}></View>
      </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  signinBtn: {
    height: 60,
    width: 300,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: "#000",
    elevation: 3,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    paddingLeft: 20,
  },
  textbig: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign:'center'
  },
  upDot:{
    height:500,
    width:550,
    borderRadius:1000,
    borderTopRightRadius:0,
    position:'absolute',
    top:-100,
    left:-180,
    backgroundColor: "rgba(25,25,25,0.1)",
  },
  downDot:{
    height:500,
    width:550,
    borderRadius:1000,
    position:'absolute',
    bottom:-250,
    right:-180,
    backgroundColor: "#737373",
    opacity: 0.1,
    zIndex:-10
  },
  gicon: {
    height: 25,
    width: 25,
  },
});
