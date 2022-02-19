import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import useAuth from "../hooks/useAuth";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Settings() {
  const { logout }: any = useAuth();
  const { user }: any = useAuth();
  
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Settings</Text>
        </View>
        <View style={styles.imagesection}>
          <Image
            source={{uri:user.photoURL}}
            style={styles.image1}
          />
          <Text style={{ fontSize: 23, fontWeight: "bold", color: "#333" }}>
            {user.displayName}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "normal", color: "#333" }}>
            {user.email}
          </Text>
        </View>

        <View>
          <View style={styles.options}>
            <MaterialIcons name="account-circle" size={28} color="#333" />
            <Text style={styles.textOption}>Account</Text>
          </View>
          <View style={styles.options}>
            <MaterialIcons name="privacy-tip" size={28} color="#333" />
            <Text style={styles.textOption}>Privacy</Text>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={logout}>
              <View style={styles.options}>
                <Entypo name="log-out" size={28} color="#4582F8" />
                <Text style={styles.logouttext}>Log Out</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.copyr}>
          <AntDesign name="copyright" size={20} color="rgba(0,0,0,0.3)" />
          <Text style={styles.copyrtext}>2022 Svaasthy, All right's reserved</Text>
        </View>
      </View>
    </>
  );
}
const width = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 20,
    padding: 30,
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    letterSpacing: 1,
  },
  imagesection: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  image1: {
    height:60,
    borderRadius:50,
    width:60,
    justifyContent: "center",
    alignItems: "center",
  },
  options: {
    marginHorizontal: 30,
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textOption: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    paddingLeft: 10,
  },
  logouttext: {
    fontSize: 18,
    color: "#4582F8",
    fontWeight: "700",
    paddingLeft: 10,
  },
  copyr:{
    marginTop: 220,
    marginLeft:'15%',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  copyrtext:{
    fontSize: 12,
    color: "rgba(0,0,0,0.3)",
    fontWeight: "700",
    paddingLeft: 10,
  }
});
