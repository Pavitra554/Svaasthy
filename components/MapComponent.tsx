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
import { StyleSheet, View, Text, Dimensions, Image, FlatList } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import { PanGestureHandler } from "react-native-gesture-handler";
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

  
  const [userDoc, setUserDoc]: any = useState([]);


  React.useEffect(() => {
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
    const DocRef: any = collection(db, "Hospitals");
    onSnapshot(DocRef, (snapshot: any) => {
      let res: any = [];
      snapshot.docs.forEach((doc: any) => {
        res.push({ ...doc.data(), id: doc.id });
      });
      setUserDoc(res);
    });
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
      <StatusBar style='inverted' />
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
            },
            rstyle,
          ]}
        >
          
          <View
            style={{ height: 360, backgroundColor: "rgba(0,0,255,0.5)" }}
          ></View>
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
});
