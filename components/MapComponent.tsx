import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { app, db } from "../firebase";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
const { height, width } = Dimensions.get("window");

const MapComponent = () => {
  const [latitude, setLat] = React.useState<any>(null);
  const [longitude, setlon] = React.useState<any>(null);
  const [error, setError] = React.useState<string>("");
  const top: any = useSharedValue(Dimensions.get("window").height / 2);

  const rstyle = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });
  let con = {
    latitude: latitude ? latitude : 27,
    longitude: longitude ? longitude : 27,
  };

  const [data, setData]: any = useState([]);
  const [Indiadata, setIndiadata]: any = useState([]);

  const GetCountryData = async () => {
    try {
      const res = await fetch("https://covid-19.dataflowkit.com/v1");
      const worlddata = await res.json();
      setData(worlddata[0]);
      setIndiadata(worlddata[2])
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    GetCountryData();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      const locate = await Location.getCurrentPositionAsync({});
      // alert("working");
      setLat(locate.coords.latitude);
      setlon(locate.coords.longitude);
    })();
  }, []);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context: any) => {
      context.top = top.value;
    },
    onActive: (event, context) => {
      console.log(event.translationY);
      if (event.translationY < 0) {
        top.value = withSpring(150);
      } else {
        top.value = withSpring(400);
      }
    },
  });

  // const Read = () => {
  // MARK: Reading Doc
  // You can read what ever document by changing the collection and document path here
  // const DocRef:any = collection(db,"Hospitals");

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      <MapView
        minZoomLevel={16}
        initialRegion={{
          longitude: longitude,
          latitude: latitude,
          longitudeDelta: 0.025,
          latitudeDelta: 0.025,
        }}
        style={styles.map}
      >
        <Marker coordinate={con} title="My location">
          <View
            style={{
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              width: 100,
              borderRadius: 50,
              backgroundColor: "rgba(0,0,255,0.2)",
            }}
          >
            <AntDesign name="enviromento" size={24} color="white" />
            <Image
              style={{ height: 70, width: 70 }}
              source={require("../assets/Sc1Bg.png")}
            />
          </View>
        </Marker>
      </MapView>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              elevation: 70,
              bottom: 0,
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: "center",
            },
            rstyle,
          ]}
        >
          <View style={styles.bar}></View>
          {data["Total Cases_text"] ? (
            <ScrollView>
            <View>
              <Text style={styles.headText}> World</Text>
              <Text style={styles.lastUpdate}>
                {" "}
                Last Updated on {data["Last Update"]}
              </Text>
              <View style={styles.dataBox1}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#FF4128",
                    paddingBottom: 10,
                  }}
                >
                  Total Case's Confirmed
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#FF4128",
                      paddingBottom: 2,
                    }}
                  >
                    {data["Total Cases_text"]}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#FF4128",
                      paddingTop: 2,
                      paddingLeft: 10,
                      opacity:0.5
                    }}
                  >
                    {data["New Cases_text"]}
                  </Text>
                </View>
              </View>

              
              <View style={styles.dataBox2}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#0030DA",
                    paddingBottom: 10,
                  }}
                >
                  Total Active Case's
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#0030DA",
                      paddingBottom: 2,
                    }}
                  >
                    {data["Active Cases_text"]}
                  </Text>
                </View>
              </View>



              <View style={styles.dataBox3}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#029313",
                    paddingBottom: 10,
                  }}
                >
                  Total Recovered_text
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#029313",
                      paddingBottom: 2,
                    }}
                  >
                    {data["Total Recovered_text"]}
                  </Text>
                </View>
              </View>


              <View style={styles.dataBox4}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#343232",
                    paddingBottom: 10,
                  }}
                >
                  Total Death's
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#343232",
                      paddingBottom: 2,
                    }}
                  >
                    {data["Total Deaths_text"]}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#343232",
                      paddingTop: 2,
                      paddingLeft: 10,
                      opacity:0.5
                    }}
                  >
                    {data["New Deaths_text"]}
                  </Text>
                </View>
              </View>


            </View>





            <View>
              <Text style={styles.headText}>India</Text>
              <Text style={styles.lastUpdate}>
                {" "}
                Last Updated on {Indiadata["Last Update"]}
              </Text>
              <View style={styles.dataBox1}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#FF4128",
                    paddingBottom: 10,
                  }}
                >
                  Total Case's Confirmed
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#FF4128",
                      paddingBottom: 2,
                    }}
                  >
                    {Indiadata["Total Cases_text"]}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#FF4128",
                      paddingTop: 2,
                      paddingLeft: 10,
                      opacity:0.5
                    }}
                  >
                    {Indiadata["New Cases_text"]}
                  </Text>
                </View>
              </View>



              <View style={styles.dataBox3}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#029313",
                    paddingBottom: 10,
                  }}
                >
                  Total Recovered_text
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#029313",
                      paddingBottom: 2,
                    }}
                  >
                    {Indiadata["Total Recovered_text"]}
                  </Text>
                </View>
              </View>


              <View style={styles.dataBox4}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#343232",
                    paddingBottom: 10,
                  }}
                >
                  Total Death's
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#343232",
                      paddingBottom: 2,
                    }}
                  >
                    {Indiadata["Total Deaths_text"]}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#343232",
                      paddingTop: 2,
                      paddingLeft: 10,
                      opacity:0.5
                    }}
                  >
                    {Indiadata["New Deaths_text"]}
                  </Text>
                </View>
              </View>


            </View>
            </ScrollView>
          ) : (
            <Text style={styles.headText}>Loading...</Text>
          )}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
export default MapComponent;

const styles = StyleSheet.create({
  map: {
    width,
    height: 500,
  },
  heading: {
    alignSelf: "center",
    paddingTop: 20,
    marginBottom: 10,
    fontSize: 24,
  },
  container: {
    flex: 1,
  },
  bar: {
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 5,
    width: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  headText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
    textAlign: "center",
  },
  lastUpdate: {
    color: "#333",
    opacity: 0.5,
    fontSize: 12,
    textAlign: "center",
  },
  dataBox1: {
    height: 80,
    width: width - 30,
    backgroundColor: "rgba(255,65,40,0.2)",
    borderRadius: 20,
    marginTop: 10,
    display:'flex',
    justifyContent:'center',
    paddingLeft:15,
    paddingTop:5
  },
  dataBox2: {
    height: 80,
    width: width - 30,
    backgroundColor: "rgba(0,48,218,0.2)",
    borderRadius: 20,
    marginTop: 10,
    display:'flex',
    justifyContent:'center',
    paddingLeft:15,
    paddingTop:5
  },
  dataBox3: {
    height: 80,
    width: width - 30,
    backgroundColor: "rgba(37,255,7,0.2)",
    borderRadius: 20,
    marginTop: 10,
    display:'flex',
    justifyContent:'center',
    paddingLeft:15,
    paddingTop:5
  },
  dataBox4: {
    height: 80,
    width: width - 30,
    backgroundColor: "rgba(52,50,50,0.2)",
    borderRadius: 20,
    marginTop: 10,
    display:'flex',
    justifyContent:'center',
    paddingLeft:15,
    paddingTop:5
  }
});
