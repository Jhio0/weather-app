import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, SafeAreaView, useWindowDimensions,TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';

import {CalendarDaysIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';
import { theme } from './theme';

export default function CardUI() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const cardHeight = screenHeight * 0.4;
  const cardWidth = screenWidth * 0.9;

  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1,2,3]);

  const handleLocation = (loc) =>{
    console.log('location: ', loc);
  }

  return (
    <View className="flex-1">
    <SafeAreaView style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)'}} className="flex-1">
      {/* Search Section */}
      <View className="h-7 mx-4 flex-row items-center">
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
              placeholder="Search City"
              placeholderTextColor="lightgray"
              style={{ flex: 1, fontSize: 16, color: 'white' }}
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
                <Text style={{ color: 'black', fontSize: 16, marginLeft: 8 }}>London, United Kingdom</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
      {/* Forecast Section */}
      <View className="flex items-center p-4">
        <Card style={{ width: cardWidth, height: cardHeight, borderRadius: 20 }}>
          <TouchableRipple
            rippleColor="rgba(255, 255, 255, 0.3)"
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              overflow: 'hidden',
            }}
          >
            <ImageBackground
              source={{
                uri:
                  'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw2.webp',
              }}
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
            >
              <View className="flex flex-col justify-start items-center p-10">
                <Text className="text-white text-3xl text-center">Clear Night</Text>
                <Text className="text-white text-lg text-center py-2">Detroit, US</Text>
                <Text className="text-white text-6xl text-center py-4">20°C</Text>
              </View>
            </ImageBackground>
          </TouchableRipple>
        </Card>
      </View>
      {/* Other Stats */}
      <View className="flex flex-row justify-between mx-4">
        <View className="flex-row items-center">
          <Image source={require('./assets/icons/wind.png')} style={{ height: 24, width: 24 }} />
          <Text className="text-white font-bold text-lg ml-2">22km</Text>
        </View>
        <View className="flex-row items-center">
          <Image source={require('./assets/icons/drop.png')} style={{ height: 24, width: 24 }} />
          <Text className="text-white font-bold text-lg ml-2">23%</Text>
        </View>
        <View className="flex-row items-center">
          <Image source={require('./assets/icons/sun.png')} style={{ height: 24, width: 24 }} />
          <Text className="text-white font-bold text-lg ml-2">6:06 AM</Text>
        </View>
      </View>
      {/* Forecast for the Next Days */}
      <View style={{ marginHorizontal: 16 }}>
        <View className="flex flex-row items-center my-2">
          <CalendarDaysIcon size={22} color="white" />
          <Text className="text-white text-base ml-2">Daily forecast</Text>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 15 }}
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row">
            <View className="flex justify-center items-center w-88 mr-4">
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
                <Image source={require('./assets/images/heavyrain.png')} style={{ height: 44, width: 44 }} />
                <Text className="text-white txt-16">Monday</Text>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>13°C</Text>
              </View>
            </View>
          </View>
          <View className="flex-row">
            <View className="flex justify-center items-center w-88 mr-4">
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
                <Image source={require('./assets/images/heavyrain.png')} style={{ height: 44, width: 44 }} />
                <Text className="text-white txt-16">Monday</Text>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>13°C</Text>
              </View>
            </View>
          </View>
          <View className="flex-row">
            <View className="flex justify-center items-center w-88 mr-4">
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
                <Image source={require('./assets/images/heavyrain.png')} style={{ height: 44, width: 44 }} />
                <Text className="text-white txt-16">Monday</Text>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>13°C</Text>
              </View>
            </View>
          </View>
          
        </ScrollView>
      </View>
      
      {/* 2nd Forecast for the Next Days */}
      <View style={{ marginHorizontal: 16 }}>
        <View className="flex flex-row items-center my-2">
          <CalendarDaysIcon size={22} color="white" />
          <Text className="text-white text-base ml-2">Daily forecast</Text>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 15 }}
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row">
            <View className="flex justify-center items-center w-88 mr-4">
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
                <Image source={require('./assets/images/heavyrain.png')} style={{ height: 44, width: 44 }} />
                <Text className="text-white txt-16">Monday</Text>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>13°C</Text>
              </View>
            </View>
          </View>
          <View className="flex-row">
            <View className="flex justify-center items-center w-88 mr-4">
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
                <Image source={require('./assets/images/heavyrain.png')} style={{ height: 44, width: 44 }} />
                <Text className="text-white txt-16">Monday</Text>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>13°C</Text>
              </View>
            </View>
          </View>
          <View className="flex-row">
            <View className="flex justify-center items-center w-88 mr-4">
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
                <Image source={require('./assets/images/heavyrain.png')} style={{ height: 44, width: 44 }} />
                <Text className="text-white txt-16">Monday</Text>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>13°C</Text>
              </View>
            </View>
          </View>
          
        </ScrollView>
      </View>
    </SafeAreaView>
  </View>
  );
}