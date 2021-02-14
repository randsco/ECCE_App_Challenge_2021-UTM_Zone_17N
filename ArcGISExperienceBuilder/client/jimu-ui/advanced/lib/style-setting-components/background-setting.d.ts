/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, IMThemeVariables } from 'jimu-core';
import { BackgroundStyle, FillType, ImageParam } from 'jimu-ui';
export interface BackgroundSettingProps {
    /**
     * Including the background color, background image, and the fill type of background image
     */
    background?: BackgroundStyle;
    onChange?: (background: BackgroundStyle) => void;
    className?: string;
    style?: any;
}
interface ExtraProps {
    intl?: IntlShape;
}
interface StateToProps {
    appTheme?: IMThemeVariables;
}
export declare class _BackgroundSetting extends React.PureComponent<BackgroundSettingProps & ExtraProps & StateToProps> {
    fileInput: React.RefObject<any>;
    static defaultProps: Partial<BackgroundSettingProps & ExtraProps & StateToProps>;
    constructor(props: any);
    openBrowseImage: (imageParam: ImageParam) => void;
    _onPositionChange: (e: any) => void;
    _onColorChange: (color: string) => void;
    translate: (id: string) => string;
    getFillType: () => {
        value: FillType;
        label: string;
    }[];
    render(): JSX.Element;
}
/**
 * A react component for setting background style (background-color, background-image)
 */
export declare const BackgroundSetting: React.ComponentType<Pick<import("react-intl").WithIntlProps<any>, string | number | symbol> & BackgroundSettingProps & ExtraProps>;
export {};
