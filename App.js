import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, SafeAreaView, useWindowDimensions,TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';

import {CalendarDaysIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';
import { theme } from './theme';
import {debounce} from 'lodash';
import { fetchLocations, fetchWeatherForecast } from './api/weather';
import { weatherImages } from './constants';
import * as Progress from 'react-native-progress';
import { getData, storeData } from './utils/asyncStorage';

import Moon from './assets/images/Moon.png'


export default function CardUI() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const cardHeight = screenHeight * 0.4;
  const cardWidth = screenWidth * 0.9;

  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(true);


  const handleLocation = (loc) =>{
    console.log('location: ', loc);
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7'
    }).then(data=>{
      setWeather(data);
      setLoading(false);
      storeData('city', loc.name);
      console.log('got forecast: ', data)
    })
  }

  const handleSearch = value=>{
    if(value.length>2) {
      fetchLocations({cityName: value}).then(data=>{
        setLocations(data);
      })
    }
  }

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async ()=> {
    let myCity = await getData('city');
    let cityName = 'Calgary'
    if (myCity) cityName = myCity;
    fetchWeatherForecast({
      cityName,
      days: '7'
    }).then(data=>{
      setWeather(data);
      setLoading(false)
    })
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])

  const {current, location} = weather;

  // function convertToNormalTime(time) {
  //   const [hours, minutes] = time.split(':');
  //   let period = 'AM';
  
  //   let hour = parseInt(hours, 10);
  
  //   if (hour >= 12) {
  //     period = 'PM';
  //     if (hour > 12) {
  //       hour -= 12;
  //     }
  //   }
  
  //   return `${hour}:${minutes} ${period}`;
  // }
  // const normalTime = convertToNormalTime(location?.localtime.split(' ')[1]);

  return (
    <View className="flex-1">
      {
        loading? (
          <View className="flex-1 flex-row justify-center items-center">
            <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2"/>
          </View>
        ):(
        <ImageBackground source={Moon} className="flex-1">
          <SafeAreaView style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)'}} className="flex-1">
            {/* Search Section */}
            <View className="h-7 mx-4 items-end">
              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                style={{
                  backgroundColor: showSearch ? 'white' : 'transparent',
                  borderRadius: 25,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  
                }}
              >

                <MagnifyingGlassIcon size={25} color="black" style={{ marginHorizontal: 12 }} />
                {showSearch ? (
                  <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search City"
                    placeholderTextColor="lightgray"
                    style={{ flex: 1, fontSize: 16, color: 'black' }}
                  />
                ) : null}
              </TouchableOpacity>

            </View>
            {locations.length > 0 && showSearch ? (
              <View style={{ backgroundColor: 'gray', borderRadius: 20, marginTop: 8 }}>
                {locations.map((loc, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(loc)}
                      key={index} 
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 12,
                        borderBottomWidth: index + 1 !== locations.length ? 2 : 0,
                        borderBottomColor: 'gray',
                      }}
                    >
                      <MapPinIcon size={20} color="gray" />
                      <Text style={{ color: 'black', fontSize: 16, marginLeft: 8 }}>{loc?.name}, {loc?.country}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
            {/* Forecast Section */}
            <View className="flex-1 justify-center items-center p-4">
              
              <Card style={{ width: cardWidth, height: cardHeight, borderRadius: 20, backgroundColor: 'transparent' }}>
                <TouchableRipple
                  rippleColor="rgba(255, 255, 255, 0.3)"
                  style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    overflow: 'hidden',
                    padding:10,
                  }}
                >
                  <View>
                    <View className="flex flex-col items-center ">
                      <Text className="text-white text-3xl text-center">{current?.condition?.text}</Text>
                      <Text className="text-white text-lg text-center py-2">{location?.name}, {location?.country}</Text>
                      <Text className="text-white text-6xl text-center py-4">{Math.round(current?.temp_c)}°C</Text>
                    </View>

                   {/* Other Stats */}
                    <View className="flex flex-row justify-between p-7">
                      <View className="flex-row items-center">
                        <Image source={require('./assets/icons/wind.png')} style={{ height: 24, width: 24 }} />
                        <Text className="text-white font-bold text-lg ml-2">{current?.wind_kph}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Image source={require('./assets/icons/drop.png')} style={{ height: 24, width: 24 }} />
                        <Text className="text-white font-bold text-lg ml-2">{current?.humidity}%</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Image source={require('./assets/icons/sun.png')} style={{ height: 24, width: 24 }} />
                        <Text className="text-white font-bold text-lg ml-2">{location?.localtime}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableRipple>
              </Card>
            </View>
                    
            {/* Forecast for the Next Days */}
            <View style={{ marginHorizontal: 16}} className="flex justify-end">
              <View className="flex flex-row justify-center items-center my-2">
                <CalendarDaysIcon size={22} color="white" />
                <Text className="text-white text-base ml-2">Daily Forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 0 }}
                showsHorizontalScrollIndicator={false}
              >
                {
                  weather?.forecast?.forecastday?.map((item, index)=> {
                    let date = new Date(item.date);
                    let options = {weekday: 'long'};
                    let dayName = date.toLocaleDateString('en-US', options);
                    dayName = dayName.split(',')[0];
                    return (
                      <View className="flex justify-center items-center w-88 mr-4"
                        key={index}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 80,
                            borderRadius: 30,
                            paddingVertical: 12,
                            backgroundColor: 'rgba(255,255,255,0.15)',
                          }}
                        >
                          <Image source={weatherImages[item?.day?.condition.text]} style={{ height: 44, width: 44 }} />
                          <Text className="text-white txt-16">{dayName}</Text>
                          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{Math.round(item?.day?.avgtemp_c)}&#176;</Text>
                        </View>
                      </View>
                    )
                  })
                }
                
              </ScrollView>
            </View>
          </SafeAreaView>
        </ImageBackground>
                
        )
      }
  </View>
  );
}