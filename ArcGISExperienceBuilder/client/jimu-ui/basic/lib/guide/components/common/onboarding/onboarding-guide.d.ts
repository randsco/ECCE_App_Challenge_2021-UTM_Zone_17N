/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, PageMode, ImmutableObject, UrlParameters } from 'jimu-core';
import { GuideProps } from '../../core/guide';
import { Steps, ConditionalStepIndexes } from '../../../types';
interface StateToProps {
    queryObject: ImmutableObject<UrlParameters>;
    pageMode: PageMode;
}
interface State {
    stepIndex: number;
    steps: Steps;
    conditionalStepIndexes: ConditionalStepIndexes;
    run: boolean;
}
export declare class _OnboardingGuide extends React.PureComponent<GuideProps & StateToProps, State> {
    private currentStep;
    constructor(props: any);
    componentDidUpdate(prevProps: GuideProps & StateToProps): void;
    private handleChange;
    private handleClick;
    render(): JSX.Element;
}
export declare const OnboardingGuide: ReactRedux.ConnectedComponent<typeof _OnboardingGuide, Pick<React.ClassAttributes<_OnboardingGuide> & GuideProps & StateToProps, "ref" | "disabled" | "className" | "key" | "steps" | "stepIndex" | "run" | "conditionalStepIndexes" | "onStepChange" | "onActionClick" | "widgetName" | "widgetJson" | "isInjected"> & GuideProps>;
export {};
