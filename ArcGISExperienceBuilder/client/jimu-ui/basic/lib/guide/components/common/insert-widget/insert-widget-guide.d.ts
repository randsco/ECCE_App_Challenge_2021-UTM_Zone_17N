/// <reference types="react" />
import { ReactRedux, IMAppConfig, IMSelection } from 'jimu-core';
import { GuideProps } from '../../core/guide';
interface StateToProps {
    appConfig: IMAppConfig;
    widgetSelection: IMSelection;
}
export declare const _InsertWidgetGuide: (props: GuideProps & StateToProps) => JSX.Element;
export declare const InsertWidgetGuide: ReactRedux.ConnectedComponent<(props: GuideProps & StateToProps) => JSX.Element, Pick<GuideProps & StateToProps, "disabled" | "className" | "steps" | "stepIndex" | "run" | "conditionalStepIndexes" | "onStepChange" | "onActionClick" | "widgetName" | "widgetJson" | "isInjected"> & GuideProps>;
export {};
