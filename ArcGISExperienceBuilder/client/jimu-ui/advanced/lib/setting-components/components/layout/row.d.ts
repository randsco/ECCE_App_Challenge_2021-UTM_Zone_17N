/// <reference types="react" />
import { React } from 'jimu-core';
declare type ActionType = 'drilldown';
/**
 * Props for the `SettingRow` component.
 */
export interface SettingRowProps {
    /**
     * Defines the label text for the setting row.
     */
    label?: string | JSX.Element;
    /**
     * Indicates whether the children should flow to the next line.
     * 'wrap' - the children will flow to the next line.
     * 'no-wrap' - the children will stay in the line as the label.
     */
    flow?: 'wrap' | 'no-wrap';
    /**
     * Defines the optional action to take when clicked.
     * 'drilldown': indicates the row is clickable and a right arrow will appear at the end.
     */
    action?: ActionType;
    /**
     * Indicates whether to indent the row.
     */
    indented?: boolean;
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * Indicates whether to truncate long label text.
     */
    truncateLabel?: boolean;
    /**
     * Callback fired when the row is clicked.
     * @event
     */
    onDrillDown?: () => void;
}
/**
 * The unstyled version of the SettingRow component.
 * Please use {@link SettingRow} instead.
 */
export declare class _SettingRow extends React.PureComponent<SettingRowProps> {
    onActionClick: (type: ActionType) => void;
    render(): JSX.Element;
}
/**
 * A layout component used to display setting content in a row.
 * Use this component inside of the SettingSection component.
 *
 * #### Example:
 * ```typescript
 * import { TextInput } from 'jimu-ui';
 * import { SettingRow } from 'jimu-ui/advanced/setting-components';
 * <SettingRow label="Widget Name" flow="no-wrap">
 *   <TextInput/>
 * </SettingRow>
 * ```
 * #### Props:
 * See {@link SettingRowProps} for more details.
 */
export declare const SettingRow: React.ComponentType<SettingRowProps>;
export {};
