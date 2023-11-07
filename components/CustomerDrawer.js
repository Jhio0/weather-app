import React from "react";
import {View} from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

const CustomDrawer = (props) => {
    return (
        <View className="flex-1">
             <DrawerContentScrollView {...props}  >
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawer;
