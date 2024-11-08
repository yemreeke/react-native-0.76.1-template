import React from "react"
import { BottomTabBarButtonProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import Colors from "resources/Colors";
import { TouchableOpacity } from "react-native";
import { IS_TABLET } from "constants/Constants";
import { SCREENS } from "./types";
import { IconTypes, SvgIcon } from "components/SvgIcon";
import HomeScreen from "screens/HomeScreen";
import ProfileScreen from "screens/ProfileScreen";
import Fonts from "resources/Fonts";
import CustomText from "components/CustomText";
const Tab = createBottomTabNavigator();
interface Props {
  navigation: NavigationProp<any, any>
}

const BottomTabNavigator = (props: Props) => {
  const TabBarButton = (buttonProps: BottomTabBarButtonProps & { screenName: string }) => {
    return (
      <TouchableOpacity
        {...buttonProps}
        onPress={() => {
          props?.navigation.navigate(buttonProps.screenName, { resetBottomTabBar: buttonProps?.accessibilityState?.selected ? true : false });
        }}
        style={buttonProps.style}
      >
        {buttonProps.children}
      </TouchableOpacity>
    )
  };
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HomeScreen}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        unmountOnBlur: false,
        tabBarLabel: ({ focused, color, position, children }) => {
          return <CustomText style={{
            marginLeft: IS_TABLET ? responsiveWidth(10) : 0,
            fontSize: IS_TABLET ? 20 : 11,
            color: focused ? Colors.Primary : Colors.Gray,
            fontFamily: Fonts.Poppins_Medium_500,
          }}>{children}</CustomText>
        },
        tabBarStyle: IS_TABLET ? {
          height: responsiveHeight(80),
        } : {
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName: IconTypes = "Home";
          const isCenter = false;// route.name === SCREENS.HomeScreen;
          if (route.name === SCREENS.HomeScreen) {
            iconName = "Home";
          }
          else if (route.name === SCREENS.ProfileScreen) {
            iconName = "Profile"
          }

          return <SvgIcon
            iconType={iconName}
            size={IS_TABLET ? responsiveWidth(isCenter ? 20 : 18) : responsiveWidth(isCenter ? 50 : 30)}
            color={focused ? Colors.Primary : Colors.Gray}
            style={{
              top: isCenter ? responsiveWidth(-15) : 0,
            }}
          />
        },
      })}>
      <Tab.Screen
        name={SCREENS.HomeScreen}
        component={HomeScreen as any}
        options={{
          title: "Home",
          tabBarButton: buttonProps => <TabBarButton {...buttonProps} screenName={SCREENS.HomeScreen} />,
        }}
      />
      <Tab.Screen
        name={SCREENS.ProfileScreen}
        component={ProfileScreen as any}
        options={{
          title: "Profile",
          tabBarButton: buttonProps => <TabBarButton {...buttonProps} screenName={SCREENS.ProfileScreen} />,
        }}
      />
    </Tab.Navigator>
  )
};
export default BottomTabNavigator;

