import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';

export default function Splash({ navigation }) {
    useEffect(() => {
        const delay = setTimeout(() => {
          navigation.navigate('Login'); 
        }, 2500); 
    
        return () => clearTimeout(delay);
      }, [navigation]);
    return (
    <View className=" h-full w-full bg-slate-300">
        <View className="h-full w-full flex items-center justify-center pb-20">
            <Image className="w-48 h-48" source={require('../assets/images/partlycloudy.png')} />
            <Text className="w-50 h-10 text-white text-3xl font-bold ">StratoSense</Text>
        </View>
    </View>
    );
}

