import React, { FC } from "react"
import { View } from "react-native"
import { responsiveHeight } from "constants/Dimension";
import Colors from "resources/Colors";
import CustomText from "./CustomText";
interface Props {
    text?: string
}
const ErrorText: FC<Props> = ({ text }) => {
    return (
        <View style={{ marginTop: responsiveHeight(5) }}>
            <CustomText style={{ color: Colors.Red }}>{text}</CustomText>
        </View>
    )
}
export default ErrorText;