import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CardUI from '../screens/CardUI';

const Drawer = createDrawerNavigator();

const AuthStack = () => {
    return (
        <Drawer.Navigator screenOptions={{headerShown: false}}>
            <Drawer.Screen name="cardUI" component={CardUI}/> 
        </Drawer.Navigator>
    );
};

export default AuthStack;