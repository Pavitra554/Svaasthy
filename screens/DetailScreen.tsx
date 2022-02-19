import { Button,Dimensions ,Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const DetailScreen = ({ route, navigation }:any) => {
    const { data} = route.params;
    console.log(data);
    
  return (
    <ScrollView>
     
      <Image
      style={{
          height:300
      }}
      source={{uri:data.Image}}
      />
      <View style={{padding:10}}>
          <Text style={{color:"black",fontSize:20,fontWeight:"900"}}>
              {data.ShortName}
          </Text>
          <Text style={{color:"gray",fontSize:14,fontWeight:"900"}}>
              {data.Name}
          </Text>
          <Text style={{color:"gray",fontSize:24,marginTop:20,fontWeight:"900"}}>
             {data.Rating}
          </Text>
         
          <Text style={{paddingBottom:90,color:"gray",fontSize:14,marginTop:20,fontWeight:"900"}}>
              {data.Description}
          </Text>
         <Button

            onPress={()=>null}
            title='contact' 
            color="#000"        
         />
         
      </View>
      <MapView style={styles.map} minZoomLevel={14} initialRegion={{
          latitude:data.Latitude,
          longitude:data.Longitude,
          longitudeDelta:0.023,
          latitudeDelta:0.023

      }} >
          {/* <MapViewDirections
          origin={20.2}
          destination={20}
          apikey={''}
          strokeWidth={3}
          strokeColor='#000'
          /> */}

          
      </MapView>
    </ScrollView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height-200,
      },
})