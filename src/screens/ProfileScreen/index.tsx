import CustomText from "components/CustomText";
import { ProfileScreenProps } from "navigation/types";
import React, { FC } from "react"
import { View } from "react-native"
const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CustomText>ProfileScreen</CustomText>
        </View>
    )
}
export default ProfileScreen;