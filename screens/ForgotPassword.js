import React from "react";
import { Text, View, TouchableOpacity, TextInput, Image, ImageBackground, Alert} from "react-native";
import Clouds from '../assets/images/clouds.gif'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

export default function ForgotPassword({ navigation }) {
    const Stack = createNativeStackNavigator();
    const [email, setEmail] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const emailCheck = () => {
      if (!emailRegex.test(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
        return;
      }
        navigation.navigate('Login');
    }
  return (
    <View className="bg-white h-full w-full">
      <ImageBackground source={Clouds} style={{width: '100%', height: '100%'}}>

        <View className="h-full w-full flex pt-40 pb-10 px-10 mt-3">

          {/* header + signup */}
          <View className="flex left-0 top-0 items-start pt-10">

            <Text className="text-black font-tracking-wider text-4xl pt-20">
              Forgot Password?
            </Text>

            <View className="flex flex-row items-baseline pt-5">
              <Text className="pr-1 text-m">
                Already have an account?  
              </Text>
              <Text className="text-indigo-900 font-bold text-m" onPress={() => navigation.navigate('Login')}>
                  Sign In Here
              </Text>
            </View>

          </View>

          {/* form */}
          <View className="flex flex-col mt-10">
            <View className="flex flex-col">
              <Text className="text-black font-bold text-lg">
                Email
              </Text>
              <TextInput className="border-b-2 border-black w-full h-10" placeholder="Email" value={email} onChangeText={(text) => setEmail(text)}/>
            </View>
          </View>


          {/* login button */}
          <View className="flex flex-col pt-14">
            <TouchableOpacity
             className="bg-indigo-900 rounded-3xl py-2 px-4"
              onPress={() => {emailCheck()}}
             >
              <Text className="text-white text-lg font-bold text-center">
                Send
              </Text>
            </TouchableOpacity>
          </View>


        </View>
      </ImageBackground>
    </View>
  );
}