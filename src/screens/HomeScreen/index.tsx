import CustomText from "components/CustomText";
import { HomeScreenProps } from "navigation/types";
import React, { FC } from "react"
import { View } from "react-native"
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CustomText>Home SCREEN</CustomText>
        </View>
    )
}
export default HomeScreen;