import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Image, ImageBackground, Alert} from "react-native";
import Clouds from '../assets/images/clouds.gif'
import { Checkbox } from "react-native-paper";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';


export default function Login({ navigation}) {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const Stack = createNativeStackNavigator();
  const [password, setPassword] = useState(''); 
  const [email, setEmail] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  // State variable to track password visibility 
  const [showPassword, setShowPassword] = useState(false); 

  // Function to toggle the password visibility state 
  const toggleShowPassword = () => { 
      setShowPassword(!showPassword); 
  };

  const handleLogIn = () => {
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
      );
      return;
    }
      navigation.navigate('AuthStack');
  };

  function onAuthenticate(){
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Biometrics",
      cancelLabel: "Cancel",
      fallbackLabel: "Use Password"
    });
    auth.then((result) => {
      console.log(result);
      if(result.success){
        navigation.navigate('AuthStack');
      }
    });
  }

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAvailable(compatible);
    })();
  });


  return (
    <View className="bg-white h-full w-full">
      <ImageBackground source={Clouds} style={{width: '100%', height: '100%'}}>

        <View className="h-full w-full flex pt-40 pb-10 px-10 mt-3">

          {/* header + signup */}
          <View className="flex left-0 top-0 items-start">

            <Text className="text-black font-tracking-wider text-4xl">
              Sign In
            </Text>

            <View className="flex flex-row items-baseline pt-5">
              <Text className="pr-1 text-m">
                Don't have an account?  
              </Text>
              <Text className="text-indigo-900 font-bold text-m" onPress={() => navigation.navigate('Signup')}>
                  Sign Up Here
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

            <View className="flex flex-col mt-10">
              <Text className="text-black font-bold text-lg">
                Password
              </Text>
              <View className="flex flex-row items-center">
                <TextInput 
                  className="border-b-2 border-black w-full h-10" 
                  secureTextEntry={!showPassword} 
                  value={password} 
                  placeholder="Enter Password"
                  placeholderTextColor="#aaa"
                  onChangeText={(text) => setPassword(text)}
                />
                <MaterialCommunityIcons 
                  name={showPassword ?  'eye' : 'eye-off'} 
                  size={28} 
                  color="#aaa"
                  onPress={toggleShowPassword} 
                  /> 
              </View>
            </View>
          </View>

          {/* forgot password + remember me*/}
          <View className="flex flex-row mt-3">
            <View className="flex flex-row pr-20">
              <Checkbox className="color-neutral-500"  
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              />
              <Text className="text-neutral-500 font-bold pt-2">
                Remember Me
              </Text>
            </View>
            <View className="flex flex-col">
              <Text className="text-neutral-500 font-bold pt-2">
                Forgot Password?
              </Text>
            </View>
          </View>

          {/* login button */}
          <View className="flex flex-col pt-14">
            <TouchableOpacity
             className="bg-indigo-900 rounded-3xl py-2 px-4" onPress={handleLogIn}>
              <Text className="text-white text-lg font-bold text-center">
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* or sign in with */}
          <View className="flex flex-col pt-7">
            <TouchableOpacity onPress={onAuthenticate}>
              <Text className="text-neutral-500 font-bold text-center">
                Use Biometrics Instead?
              </Text>
            </TouchableOpacity>

            {/* social media buttons */}
            <View className="flex flex-auto flex-row w-full px-12 pt-7 gap-10">

              <View>
                <TouchableOpacity className="bg-white rounded-3xl py-2 px-2 w-12 h-12">
                  <Image className="w-8 h-8" source={require('../assets/images/google.png')} />
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity className="bg-white rounded-3xl py-2 px-2 w-12 h-12">
                  <Image className="w-8 h-8" source={require('../assets/images/facebook.png')} />
                </TouchableOpacity>                  
              </View>

              <View>
                <TouchableOpacity className="bg-white rounded-3xl py-2 px-2 w-12 h-12">
                  <Image className="w-8 h-8" source={require('../assets/images/github.png')} />
                </TouchableOpacity>
              </View>
              
            </View>
          </View>

        </View>
      </ImageBackground>
    </View>
  );
}