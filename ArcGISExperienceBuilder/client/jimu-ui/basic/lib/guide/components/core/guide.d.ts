/// <reference types="react" />
import { React, IntlShape, WidgetJson } from 'jimu-core';
import { Step, Steps, ConditionalStepIndexes, StepOnChangeCallBackProps } from '../../types';
export interface GuideProps {
    /**
     * The steps of the guide.
     */
    steps: Steps;
    /**
     * Sets the index of the current step.
     */
    stepIndex?: number;
    /**
     * Run/stop the guide.
     */
    run?: boolean;
    /**
     * Sets the index(es) of the active sub step within conditional steps.
     * The default index for a conditional step is 0.
     */
    conditionalStepIndexes?: ConditionalStepIndexes;
    /**
     * Callback when the step status has changed.
     */
    onStepChange?: (data: StepOnChangeCallBackProps) => void;
    /**
     * Fires when the required action in a step is triggered.
     */
    onActionClick?: (e: any, step: Step, index: number) => void;
    /**
     * Class name(s) applied to the component.
     */
    className?: string;
    /**
     * The name of the widget that is being targeted at by the guide.
     */
    widgetName?: string;
    /**
     * The Json object of the widget that is being targeted at by the guide.
     */
    widgetJson?: WidgetJson;
    /**
     * Indicates whether the guide is injected in another guide as a step.
     */
    isInjected?: boolean;
    /**
     * Indicates whether the guide is disabled.
     */
    disabled?: boolean;
}
interface ExtraProps {
    intl?: IntlShape;
}
export declare const Guide: React.FC<import("react-intl").WithIntlProps<GuideProps & ExtraProps>> & {
    WrappedComponent: React.ComponentType<GuideProps & ExtraProps>;
};
export {};
