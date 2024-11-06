
import { responsiveWidth } from 'constants/Dimension';
import React, { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import * as AllIcons from 'resources/Icons';

export type IconTypes = keyof typeof AllIcons;
type IconPropType = {
    iconType: IconTypes,
    size?: number,
    height?: number,
    width?: number,
} & SvgProps;
export const SvgIcon: FC<IconPropType> = (props) => {
    const Icon = AllIcons[props.iconType!];
    return <Icon
        {...props}
        height={props.height ? props.height : props.size ? props.size : responsiveWidth(30)}
        width={props.width ? props.width : props.size ? props.size : responsiveWidth(30)}
    />;
};
