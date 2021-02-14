/// <reference types="react" />
/** @jsx jsx */
import { React, IMThemeVariables } from 'jimu-core';
import { TooltipRenderProps } from 'react-joyride';
interface ExtraProps {
    theme?: IMThemeVariables;
    disabled?: boolean;
    isStepInjected?: boolean;
}
export declare const _StepDialog: (props: TooltipRenderProps & ExtraProps) => JSX.Element;
export declare const StepDialog: React.SFC<import("emotion-theming/types/helper").AddOptionalTo<TooltipRenderProps & ExtraProps, "theme">>;
export {};
