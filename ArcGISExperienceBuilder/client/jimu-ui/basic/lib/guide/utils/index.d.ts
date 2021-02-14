/// <reference types="react" />
import { React, WidgetJson } from 'jimu-core';
import { Step as JoyRideStep } from 'react-joyride';
import { Step, ConditionalStep, InjectedStep, Steps, ConditionalStepIndexes } from '../types';
export declare function mapStepProps(steps: Steps, condStepIndexes: ConditionalStepIndexes): JoyRideStep[];
export declare function getMaskPositionCSS(step: Step, widgetJson?: WidgetJson): React.CSSProperties;
export declare function getTargetSelector(step: Step, widgetJson?: WidgetJson): string;
export declare function isInjectedStep(step: Step | ConditionalStep | InjectedStep): boolean;
export declare function bidi(s: string, isRTL?: boolean): string;
