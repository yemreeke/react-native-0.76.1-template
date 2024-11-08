import React, { FC } from "react"
import { StyleProp, TextStyle } from "react-native"
import CustomText from "./CustomText"
import { responsiveHeight, responsiveWidth } from "constants/Dimension"
import Colors from "resources/Colors"
import Fonts from "resources/Fonts"
interface Props {
    title: string
    style?: StyleProp<TextStyle>
}
const InputTitleText: FC<Props> = (props) => {
    return (
        <CustomText
            style={[{
                color: Colors.Primary,
                fontSize: 16,
                marginBottom: responsiveHeight(5),
                marginLeft: responsiveWidth(5),
                fontFamily: Fonts.Poppins_Medium_500,
            }, props.style]}>{props.title}</CustomText>
    )
}
export default InputTitleText;