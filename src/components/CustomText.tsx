import React, { FC } from "react"
import { Text, TextProps } from "react-native"
import Fonts from "resources/Fonts";
interface Props extends TextProps {
}
const CustomText: FC<Props> = (props) => {
    return (
        <Text
            {...props}
            style={[{
                color: "#000",
                fontFamily: Fonts.Poppins_Regular_400,
            }, props.style]}
        >
            {props.children}
        </Text>
    )
}
export default CustomText;