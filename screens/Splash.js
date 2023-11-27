import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';

export default function Splash({ navigation }) {
    useEffect(() => {
        const delay = setTimeout(() => {
          navigation.navigate('Login'); // Replace 'OtherScreen' with the name of the screen you want to navigate to
        }, 2500); // Delay for 3000 milliseconds (3 seconds)
    
        // Clear the timeout to prevent navigation if the component unmounts before the delay
        return () => clearTimeout(delay);
      }, [navigation]);
    return (
    <View className=" h-full w-full bg-slate-300">
        <View className="h-full w-full flex items-center justify-center">
            <Image className="w-56 h-24" source={require('../assets/images/partlycloudy.png')} />
            <Text className="w-50 h-10 text-white text-3xl font-bold ">StratoSense</Text>
        </View>
    </View>
    );
}

