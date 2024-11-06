
import { Dimensions } from 'react-native';
export const SCREEN_WIDTH = Dimensions.get("window").width
export const SCREEN_HEIGHT = Dimensions.get("window").height
/**
 * Max Width: 375
 * @param value 
 * @returns 
 */
export const responsiveWidth = (value: number) => SCREEN_WIDTH / (375 / value)
/**
 * Max Height: 812
 * @param value 
 * @returns 
 */
export const responsiveHeight = (value: number) => SCREEN_HEIGHT / (812 / value)

export const responsiveInsets = (value: number) => value > responsiveHeight(10) ? value : responsiveHeight(10)
