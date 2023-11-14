import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image} from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { weatherImages } from '../constants';
import { getData, storeData } from "../utils/asyncStorage";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";

const CustomDrawer = (props) => {
    const [locations, setLocations] = useState([
        { name: 'Calgary', weather: {} },
        { name: 'Edmonton', weather: {} },
        { name: 'Vancouver', weather: {} },
        { name: 'Banff', weather: {} },
        { name: 'Toronto', weather: {} },
    ]);
    

    const fetchWeatherData = async () => {
            const promises = locations.map(async (location) => {
            const { name } = location;
            const data = await fetchWeatherForecast({ cityName: name });
            return { ...location, weather: data };
        });
    
        const updatedLocations = await Promise.all(promises);
        setLocations(updatedLocations);
      }
    
      useEffect(() => {
        fetchWeatherData();
      }, []);

    
      const renderLocation = (location) => {
        const { current } = location.weather;
      
        return (
          <View key={location.name} className="flex flex-row justify-between mb-6">
            <Text className="text-white text-lg ml-5">{location.name}</Text>
            <View className="flex flex-row">
                <Image
                source={weatherImages[current?.condition.text]}
                className="absolute right-14 h-10 w-10"
                />
                <Text className="text-white text-lg mr-2">{Math.round(current?.temp_c)}°C</Text>
            </View>
          </View>
        );
    };

    return (
        <View style={[{ flex: 1 }, styles.bgCyan]}>
          <DrawerContentScrollView {...props}>
            <View className="mt-20">
                {locations.map(renderLocation)}
            </View>
          </DrawerContentScrollView>
        </View>
      );
    }
      



export default CustomDrawer;

const styles = StyleSheet.create({
    bgCyan: {
      backgroundColor: 'rgba(27, 56, 72, 0.98)', // Cyan color with 95% opacity
    },
});