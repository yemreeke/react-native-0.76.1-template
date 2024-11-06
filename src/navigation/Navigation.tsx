import React, { useEffect, useRef } from "react"
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import { RouteParamList, ScreenParams, SCREENS } from "./types";
import Loading from "components/Loading";

const Stack = createNativeStackNavigator<RouteParamList>();

const Navigation = () => {

    useEffect(() => {
        Loading.show();
        setTimeout(() => {
            Loading.hide();
        }, 3000);
    }, []);

    const navigationRef = createNavigationContainerRef<ScreenParams>();
    const routeNameRef = useRef<string>();

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
            }}
            onStateChange={async () => {
                // const previousRouteName = routeNameRef.current;
                // const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;
                // if (previousRouteName !== currentRouteName) {
                //     currentRouteName && FirebaseService.logScreenView(currentRouteName);
                // }
                // routeNameRef.current = currentRouteName;
            }}
        >
            <RootStack />
        </NavigationContainer>
    )
}
const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.BottomTabNavigator} component={BottomTabNavigator} />
        </Stack.Navigator>
    )
}

export default Navigation;
