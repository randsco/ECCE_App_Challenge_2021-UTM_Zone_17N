/// <reference types="react" />
import { React, ReactRedux, IntlShape, IconResult, IMIconResult, IMThemeVariables } from 'jimu-core';
import { ButtonProps } from 'jimu-ui';
import { PublicIconGroupType, ConfigurableOption, PreviewOptions } from './types';
/**
 * Properties for the IconPicker component.
 */
export interface IconPickerProps {
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * The default icon.
     */
    icon?: IconResult;
    /**
     * If `true`, the file name of the selected icon will display
     * in the button node.
     */
    showLabel?: boolean;
    /**
     * If `true`, the remove option will be hidden.
     */
    hideRemove?: boolean;
    /**
     * Defines which icon propertie(s) can be configured in the icon picker.
     */
    configurableOption?: ConfigurableOption;
    /**
     * Turn on/off preview options in the icon picker's dialog.
     * @default { size: true, color: true }
     */
    previewOptions?: PreviewOptions;
    /**
     * The options apply to the dropdown button element.
     * @default { type: 'default', size: 'sm' }
     */
    buttonOptions?: ButtonProps;
    /**
     * Defines which groups of icons to show as the default icon options
     * from Jimu UI's predefined library.
     */
    groups?: PublicIconGroupType | PublicIconGroupType[] | 'none';
    /**
     * Configures additional icons as options.
     */
    customIcons?: IconResult[];
    /**
     * Callback fired when the dropdown button is clicked.
     * @event
     * @property e - the click event raised by the dropdown button.
     */
    onButtonClick?: (e: any) => void;
    /**
     * Callback fired when the icon selection has been changed.
     * @event
     * @property result - the selected icon object.
     */
    onChange?: (result: IMIconResult) => void;
}
interface ExtraProps {
    intl?: IntlShape;
    appInBuilderTheme?: IMThemeVariables;
}
interface IconPickerState {
    isIconViewerOpen: boolean;
    isAlertPopupOpen: boolean;
    icon?: IMIconResult;
}
declare class __IconPicker extends React.PureComponent<IconPickerProps & ExtraProps, IconPickerState> {
    static defaultProps: IconPickerProps & ExtraProps;
    constructor(props: any);
    onSetBtnClick: (e: any) => void;
    onRemoveClick: (e: any) => void;
    toggleAlertPop: () => void;
    onClosed: () => void;
    onChange: (result: IMIconResult) => void;
    clearResult(): void;
    componentDidUpdate(prevProps: IconPickerProps & ExtraProps, preState: IconPickerState): void;
    render(): JSX.Element;
}
/**
 * The unstyled version of the IconPicker component.
 * Please use {@link IconPicker} instead.
 */
export declare const _IconPicker: ReactRedux.ConnectedComponent<typeof __IconPicker, Pick<React.ClassAttributes<__IconPicker> & IconPickerProps & ExtraProps, "ref" | "className" | "onChange" | "icon" | "key" | "showLabel" | "hideRemove" | "configurableOption" | "previewOptions" | "buttonOptions" | "groups" | "customIcons" | "onButtonClick"> & IconPickerProps>;
/**
 * The Icon Picker is used to select an icon from a predefined icon library.
 *
 * #### Example:
 * ```typescript
 * import { IconPicker } from 'jimu-ui/advanced/resource-selector';
 * const sampleIcon = require('jimu-ui/lib/icons/widget.svg');
 * <IconPicker icon={{svg: sampleIcon, properties: {filename: 'widget.svg'}}} />
 * ```
 * #### Props:
 * See {@link IconPickerProps} for more details.
 */
export declare const IconPicker: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<IconPickerProps>>>;
export {};
