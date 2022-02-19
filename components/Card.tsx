import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Button,
} from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import DetailScreen from "../screens/DetailScreen";
interface props {
  data: any;
  navigation: any;
}

const { height, width } = Dimensions.get("window");

const Card: React.FC<props> = ({ data }) => {
  const navigation = useNavigation();

  const imageRef: string = data.Image;
  return (
    <View style={styles.mainCard}>
      <View style={styles.topSec}>
        {/* image */}

        {/*  <Image height={height} width={width} style={{backgroundColor: "red",}}  source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=="}}/> */}
        <Image
          style={{ height: 200, width: width - 30, borderRadius: 5 }}
          source={{
            uri: data.Image,
          }}
        />
      </View>
      <View style={styles.bottomSec}>
        <View style={styles.rating}>
          <Text style={styles.ratingtxt}>{data.Rating}★</Text>
        </View>
        <Text style={styles.hosName}>{data.ShortName}</Text>
        <Text style={styles.comName}>{data.Name}</Text>
        <Button
          onPress={() => {
            navigation.navigate("detail", {
              data: data,
            });
          }}
          title="Learn More"
          color="#000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    display: "flex",
    // justifyContent:'center',
    height: 300,
    width: width - 30,
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10,
    // backgroundColor:'rgba(0,0,0,0.5)',
    borderRadius: 5,
  },
  topSec: {
    height: 180,
    backgroundColor: "#ddd",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    overflow:'hidden'
  },
  bottomSec: {
    height: 100,
    backgroundColor: "#fff",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
  },
  rating: {
    height: 20,
    width: 38,
    backgroundColor: "green",
    position: "absolute",
    top: -20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 8,
  },
  ratingtxt: {
    fontSize: 12,
    color: "#fff",
  },
  hosName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  comName: {
    fontSize: 12,
    color: "#333",
    paddingBottom: 10,
    opacity: 0.5,
  },
});

export default Card;
