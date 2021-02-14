/// <reference types="react" />
import { React } from 'jimu-core';
import { WebChart } from './lib/arcgis-charts-spec';
export interface ChartCoreProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    config: WebChart;
}
export declare const ChartCore: (props: ChartCoreProps) => JSX.Element;
