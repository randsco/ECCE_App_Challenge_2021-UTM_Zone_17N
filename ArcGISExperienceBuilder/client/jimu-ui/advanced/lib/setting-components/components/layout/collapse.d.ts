/// <reference types="react" />
import { CollapseProps } from 'jimu-ui';
export interface SettingCollapseProps extends Omit<CollapseProps, 'ref'> {
    label: string;
    onRequestOpen?: () => void;
    onRequestClose?: () => void;
}
export declare const SettingCollapse: (props: SettingCollapseProps) => JSX.Element;
