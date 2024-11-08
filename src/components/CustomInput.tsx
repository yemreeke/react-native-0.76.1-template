import { responsiveHeight, responsiveWidth } from "constants/Dimension"
import React, { FC, useState } from "react"
import { StyleProp, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from "react-native"
import { IconTypes, SvgIcon } from "./SvgIcon"
import MaskInput from "react-native-mask-input"
import Colors from "resources/Colors"
import InputTitleText from "./InputTitleText"
import ErrorText from "./ErrorText"
import Fonts from "resources/Fonts"
type Props = TextInputProps & {
    leftIcon?: IconTypes
    rightIcon?: IconTypes
    viewStyle?: StyleProp<ViewStyle>
    rightIconColor?: string
    rightIconPress?: () => void
    error?: boolean
    errorText?: string
    disabled?: boolean
    title?: string
} & (Phone | Email | Other)

type Phone = {
    type: "phone"
    onChangePhone: (val: string) => void
}
type Email = {
    type: "integer"
    onChangeIntegerText: (text: string) => void
}
type Other = {
    type?: "password" | "email"
}

const CustomInput: FC<Props> = (props) => {
    const { type, leftIcon, rightIcon, viewStyle, style, rightIconColor, rightIconPress, error, errorText, disabled, title, ...otherProps } = props
    const { multiline, value } = otherProps

    const [focus, setFocus] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const iconColor = disabled ? Colors.Gray : focus ? Colors.Primary : value ? "black" : Colors.Gray;
    return (
        <View style={viewStyle}>
            {title && <InputTitleText title={title} />}
            <View
                style={{
                    borderWidth: focus ? 2 : 1,
                    borderColor: error ? Colors.Red : focus ? Colors.Primary : Colors.Gray,
                    height: multiline ? undefined : responsiveHeight(58),
                    minHeight: multiline ? responsiveHeight(58) : undefined,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: responsiveWidth(15),
                    borderRadius: 15,
                    backgroundColor: focus ? "white" : "white"
                }}
            >
                {leftIcon && <SvgIcon iconType={leftIcon} size={responsiveWidth(30)} color={iconColor} style={{ marginRight: responsiveWidth(10) }} />}
                {type == "email" && <SvgIcon iconType={"Mail"} size={responsiveWidth(30)} color={iconColor} style={{ marginRight: responsiveWidth(10) }} />}
                {type == "password" && <SvgIcon iconType={"Lock"} size={responsiveWidth(30)} color={iconColor} style={{ marginRight: responsiveWidth(10) }} />}
                {type == "phone" && <SvgIcon iconType={"Phone"} size={responsiveWidth(30)} color={iconColor} style={{ marginRight: responsiveWidth(10) }} />}
                {
                    type === "email" ?
                        <TextInput
                            editable={!disabled}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            style={[styles.input, { color: disabled ? Colors.Gray : "black" }, style]}
                            placeholderTextColor={Colors.Gray}
                            {...otherProps}
                        />
                        :
                        type === "password" ?
                            <TextInput
                                editable={!disabled}
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                                secureTextEntry={secureTextEntry}
                                style={[styles.input, { color: disabled ? Colors.Gray : "black" }, style]}
                                placeholderTextColor={Colors.Gray}
                                {...otherProps}
                            /> :

                            type === "phone" ?
                                <MaskInput
                                    editable={!disabled}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                    style={[styles.input, { color: disabled ? Colors.Gray : "black" }, style]}
                                    keyboardType={"numeric"}
                                    value={value}
                                    placeholderTextColor={Colors.Gray}
                                    onChangeText={(masked, unmasked) => props.onChangePhone(unmasked)}
                                    mask={['(', /\d/, /\d/, /\d/, ')', " ", /\d/, /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/]}
                                    {...otherProps}
                                />
                                :
                                type === "integer" ?
                                    <TextInput
                                        editable={!disabled}
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        style={[styles.input, { color: disabled ? Colors.Gray : "black" }, style]}
                                        placeholderTextColor={Colors.Gray}
                                        keyboardType={"numeric"}
                                        onChangeText={(text) => {
                                            const numericValue = text.replace(/[^0-9]/g, '');
                                            props.onChangeIntegerText?.(numericValue);
                                        }}
                                        {...otherProps}
                                    />
                                    :
                                    <TextInput
                                        editable={!disabled}
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        style={[styles.input, { color: disabled ? Colors.Gray : "black" }, style]}
                                        placeholderTextColor={Colors.Gray}
                                        {...otherProps}
                                    />
                }
                {type == "password" &&
                    <TouchableOpacity style={{ width: responsiveWidth(30), height: responsiveWidth(30) }} onPress={() => setSecureTextEntry(!secureTextEntry)}>
                        <SvgIcon iconType={secureTextEntry ? "EyeOff" : "Eye"} size={responsiveWidth(30)} color={iconColor} />
                    </TouchableOpacity>}
                {rightIcon &&
                    (
                        rightIconPress
                            ?
                            <TouchableOpacity onPress={rightIconPress}>
                                <SvgIcon iconType={rightIcon} size={responsiveWidth(30)} color={rightIconColor ?? iconColor} style={{ marginLeft: responsiveWidth(10) }} />
                            </TouchableOpacity>
                            :
                            <SvgIcon iconType={rightIcon} size={responsiveWidth(30)} color={rightIconColor ?? iconColor} style={{ marginLeft: responsiveWidth(10) }} />
                    )
                }
            </View>
            {error && <ErrorText text={errorText} />}
        </View>
    )
}
export default CustomInput;
const styles = StyleSheet.create({
    input: {
        flex: 1,
        fontSize: 14,
        fontFamily: Fonts.Poppins_SemiBold_600,
    }
});