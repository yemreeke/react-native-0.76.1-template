import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import React, { FC } from "react"
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import CustomText from "./CustomText";
import Colors from "resources/Colors";
import { IS_TABLET } from "constants/Constants";
import { IconTypes, SvgIcon } from "./SvgIcon";
import Fonts from "resources/Fonts";
interface Props {
    disabled?: boolean
    text?: string
    type?: "primary" | "secondary" | "goBack" | "danger" | "opacity"
    style?: StyleProp<ViewStyle>
    onPress?: () => void
    width?: number | "auto"
    small?: boolean
    leftIcon?: IconTypes
}
const CustomButton: FC<Props> = ({ type, text, style, onPress, width, disabled, small, leftIcon }) => {
    const height = responsiveHeight((small || type == "opacity") ? 45 : 55)
    return (
        <>
            {type == "goBack" ?
                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        height: height,
                        width: responsiveWidth(100),
                        borderRadius: 100,
                        backgroundColor: Colors.Gray,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <SvgIcon iconType="GoBack" size={responsiveWidth(30)} color={"white"} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                    disabled={disabled}
                    onPress={onPress}
                    style={[{
                        height: height,
                        width: width ?? responsiveWidth(325),
                        borderRadius: 100,
                        backgroundColor: type == "danger" ? Colors.LightRed : type == "secondary" ? Colors.OpacityPrimary : type == "opacity" ? "transparent" : Colors.Primary,
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: disabled ? 0.5 : 1,
                        flexDirection: "row",
                        paddingHorizontal: responsiveWidth(35),
                    }, style]}
                >
                    {leftIcon && <SvgIcon iconType={leftIcon} size={responsiveWidth(25)} color={"white"} style={{ marginRight: responsiveWidth(5) }} />}
                    <CustomText
                        style={{
                            textAlign: "center",
                            fontSize: IS_TABLET ? 20 : 14,
                            fontFamily: Fonts.Poppins_Bold_700,
                            color: (type == "secondary" || type == "opacity") ? Colors.Primary : "white"
                        }}
                    >{text}</CustomText>
                </TouchableOpacity>
            }
        </>

    )
}
export default CustomButton;