import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RouteParamList = {
    [Key in SCREENS]: Key extends keyof ScreenParams ? ScreenParams[Key] : undefined;
}
export type ScreenParams = {
    [SCREENS.HomeScreen]: {
        resetBottomTabBar: boolean
    }

};

export enum SCREENS {
    BottomTabNavigator = "BottomTabNavigator",
    HomeScreen = "HomeScreen",
    ProfileScreen = "ProfileScreen",
}

export type HomeScreenProps = NativeStackScreenProps<RouteParamList, SCREENS.HomeScreen>;
export type ProfileScreenProps = NativeStackScreenProps<RouteParamList, SCREENS.ProfileScreen>;

