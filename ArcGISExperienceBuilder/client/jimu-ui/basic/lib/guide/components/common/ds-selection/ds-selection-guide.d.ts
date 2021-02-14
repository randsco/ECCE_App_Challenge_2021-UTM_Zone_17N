/// <reference types="react" />
import { ReactRedux, ImmutableObject, ImmutableArray, IMDataSourceInfo, UseDataSource } from 'jimu-core';
import { GuideProps } from '../../core/guide';
interface StateToProps {
    dataSourcesInfo: ImmutableObject<{
        [dsId: string]: IMDataSourceInfo;
    }>;
    widgetDs: ImmutableArray<UseDataSource>;
}
export declare const DataSourceSelectionGuide: ReactRedux.ConnectedComponent<(props: GuideProps & StateToProps) => JSX.Element, Pick<GuideProps & StateToProps, "disabled" | "className" | "steps" | "stepIndex" | "run" | "conditionalStepIndexes" | "onStepChange" | "onActionClick" | "widgetName" | "widgetJson" | "isInjected"> & GuideProps>;
export {};
