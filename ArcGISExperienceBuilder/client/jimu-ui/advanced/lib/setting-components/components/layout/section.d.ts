/// <reference types="react" />
import { React } from 'jimu-core';
/**
 * Props for the `SettingSection` component.
 */
export interface SettingSectionProps {
    /**
     * Defines the title text for the setting section.
     */
    title?: string | JSX.Element;
    /**
     * Defines the class names added to the element.
     */
    className?: string;
}
/**
 * The unstyled version of the SettingSection component.
 * Please use {@link SettingSection} instead.
 */
export declare class _SettingSection extends React.PureComponent<SettingSectionProps> {
    render(): JSX.Element;
}
/**
 * A layout component used to display setting content as a section.
 * Use this component to wrap SettingRow component(s).
 *
 * #### Example:
 * ```typescript
 * import { TextInput } from 'jimu-ui';
 * import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
 * <SettingSection title="General Info">
 *  <SettingRow label="Widget Name" flow="no-wrap">
 *    <TextInput/>
 *  </SettingRow>
 *  <SettingRow label="Widget Description" flow="wrap">
 *    <TextInput type="textarea"/>
 *  </SettingRow>
 * </SettingSection>
 * ```
 * #### Props:
 * See {@link SettingSectionProps} for more details.
 */
export declare const SettingSection: React.ComponentType<SettingSectionProps>;
