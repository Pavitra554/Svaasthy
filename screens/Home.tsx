import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

export default function Home({ navigation }:any) {
  const { user }: any = useAuth();
  const username: string = user.displayName.split(" ")[0];

  console.log(user.photoURL);

  const translateX = useSharedValue(0);
  const scrollHanler = useAnimatedScrollHandler((e) => {
    translateX.value = e.contentOffset.x;
  });

  const [userDoc, setUserDoc]: any = useState([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const DocRef: any = collection(db, "Hospitals");
    onSnapshot(DocRef, (snapshot: any) => {
      let res: any = [];
      snapshot.docs.forEach((doc: any) => {
        res.push({ ...doc.data(), id: doc.id });
      });
      setUserDoc(res);
    });
  }, []);
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar style="auto" />
      <View
        style={{
          width,
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.username}>Hii, {username}</Text>
        <Image
          source={{ uri: user.photoURL }}
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            marginRight: 20,
            marginTop: 10,
          }}
        />
        {/* <Text style={{paddingTop:5,fontSize:20,color:"black",marginLeft:20}}>Hospitals near you</Text> */}
      </View>
      <Text style={{ fontSize: 20, color: "black", marginLeft: 40 }}>
        Hospitals near you
      </Text>

      <ScrollView
        // onScroll={scrollHanler}
        // scrollEventThrottle={16}
        decelerationRate="normal"
      >
        {userDoc &&
          userDoc.map((e: any) => {
            return <Card key={e.id} data={e} navigation={navigation} />;
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#dbdbdb",
  },
  username: {
    fontSize: 26,
    color: "#333",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 20,
  },
});
