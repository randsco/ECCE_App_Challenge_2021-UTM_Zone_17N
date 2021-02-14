/// <reference types="react" />
import { React, ReactRedux, IconProps, IconResult, IMIconResult, IMThemeVariables, IntlShape } from 'jimu-core';
import { LinearUnit } from 'jimu-ui';
import { ImageResourceItemInfo } from 'jimu-for-builder';
import { IMIconGroups, PublicIconGroupType, ConfigurableOption, PreviewOptions } from '../types';
interface IconViewerProps {
    icon?: IconResult;
    isOpen?: boolean;
    configurableOption?: ConfigurableOption;
    previewOptions?: PreviewOptions;
    groups?: PublicIconGroupType | PublicIconGroupType[] | 'none';
    customIcons?: IconResult[];
    className?: string;
    onButtonClick?: (e: any) => void;
    onChange?: (result: IMIconResult) => void;
    onIconUploadError?: () => void;
}
interface ExtraProps {
    theme?: IMThemeVariables;
    appInBuilderTheme?: IMThemeVariables;
    intl?: IntlShape;
}
interface IconPickerState {
    selectedIcon: IMIconResult;
    cachedIcons: {
        [id: string]: IconResult;
    };
    showColorSketch: boolean;
    InputUnit: any;
}
declare class __IconViewer extends React.PureComponent<IconViewerProps & ExtraProps, IconPickerState> {
    static count: number;
    private _cachedIconsWidgetId;
    static defaultProps: Partial<IconViewerProps & ExtraProps>;
    constructor(props: any);
    _getIconGroups: () => IMIconGroups;
    onIconClick: (iconComponent: string, iconProps: Partial<IconProps>) => void;
    onIconColorChange: (color: string) => void;
    onIconSizeChange: (value: LinearUnit) => void;
    onColorPickerClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
    onIconUpload: (result: ImageResourceItemInfo) => void;
    onIconUploadError: () => void;
    i18nMessage(id: string): string;
    compareIcons(a: IconResult, b: IconResult): boolean;
    isIconExist(icon: IconResult): boolean;
    getUpdatedCachedIcons(icon: IconResult): {
        [id: string]: IconResult;
    };
    componentDidUpdate(prevProps: IconViewerProps & ExtraProps): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export declare const _IconViewer: ReactRedux.ConnectedComponent<typeof __IconViewer, Pick<React.ClassAttributes<__IconViewer> & IconViewerProps & ExtraProps, "ref" | "className" | "onChange" | "icon" | "key" | "isOpen" | "configurableOption" | "previewOptions" | "groups" | "customIcons" | "onButtonClick" | "onIconUploadError"> & IconViewerProps>;
export declare const IconViewer: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<IconViewerProps>>>;
export {};
