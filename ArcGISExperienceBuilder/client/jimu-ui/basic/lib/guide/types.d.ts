/// <reference types="react" />
import { Step as JoyRideStep, Placement, Locale, status as JoyrideStatus, EVENTS } from 'react-joyride';
export declare type StepType = 'splash' | 'step';
export interface Status extends JoyrideStatus {
    INJECTED: 'injected';
}
export declare const STATUS: Status;
export declare type StatusValue = Status[keyof Status];
interface CustomStepProps {
    /** The type of the step.
     * "splash": the introductive dialog in a guide that is centered in the middle of the screen.
     * "step": the default step type.
     * @default "step"
     */
    type?: StepType;
    /**
     * Requires user to perform a specific action in order to move to the next step.
     * If defined, the "Next" button is disabled in step's tooltip, which forces the guide
     * to be controlled.
     */
    requiredAction?: {
        /** Type of the action:
         * "click": the target has to be clicked. Use Guide component's "onActionClick" callback to handle this event.
         * "custom": merely to tell the Guide component to wait for an action to be performed.
         */
        type: 'click' | 'custom';
        /** the target of the action to be performed. */
        target?: string;
    };
    /**
     * Indicates whether the target is inside of the canvas area in the builder.
     * If so, a different approach will be used to retrieve the target.
     */
    targetInCanvas?: boolean;
    /** Manually disable the "Next" button */
    disableNextButton?: boolean;
    /** Appends a prefix string before the target string. the only option available is 'widgetId'.
     * 'widgetId': The id of the current widget that the Guide component is targeted will be used.
     */
    targetPrefix?: 'widgetId';
}
export interface Step extends CustomStepProps {
    /** The target for the step. It needs to be a CSS selector. */
    target: string;
    /** The step tooltip's title. */
    title?: React.ReactNode;
    /**
     * The step tooltip's content.
     * Text, image, or both can be added.
     */
    content: {
        /** The text of a step tooltip's content. */
        text?: string;
        /** The image of a step tooltip's content. */
        image?: {
            /** The source url of the image. */
            src: string;
            /** The alternate text of the image. */
            alt?: string;
            /** The width of the image. */
            width?: string | number;
            /** The height of the image. */
            height?: string | number;
            /** The position of the image. */
            position?: 'fill' | 'center';
            /** To add a border to the image. */
            border?: boolean;
            /** Wether to auto flip the image based on locales. */
            autoFlip?: boolean;
        };
        /** The content alignment direction. */
        direction?: 'vertical' | 'horizontal';
    };
    /** the placement of the tooltip. */
    placement?: Placement;
    /** the default width of the tooltip. */
    width?: string | number;
    /**@ignore */
    locale?: Locale;
    /** hide the footer section in the tooltip. */
    hideFooter?: boolean;
    /** The padding of the spotlight. */
    spotlightPadding?: number;
    /** Allow mouse and touch events thru the spotlight. */
    spotlightClicks?: boolean;
}
export declare type ConditionalStepIndexes = {
    [id: number]: number;
};
export interface ConditionalStep {
    steps: Step[];
}
export interface InjectedStep {
    /**
     * The name of the injected guide.
     * Available injectable guides are: "insert-widget" and "ds-selection".
     */
    injectedGuide: string;
    /**
     * The name of the widget that is passed to the injected guide.
     */
    widgetName?: string;
}
export declare type Steps = (Step | ConditionalStep)[];
export declare type MappedStep = JoyRideStep & CustomStepProps;
export interface StepOnChangeCallBackProps {
    status?: StatusValue;
    index?: number;
    nextIndex?: number;
    event?: string;
    isInjected?: boolean;
    step?: Step;
}
export { EVENTS };
export declare const COMMON_GUIDE_MODULES: string[];
