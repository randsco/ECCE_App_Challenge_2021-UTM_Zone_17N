/// <reference types="react" />
import { ChartCoreProps } from './core';
export declare enum ChartType {
    Histogram = "histogram",
    Serial = "serial",
    Pie = "pie",
    Gauge = "gauge"
}
export interface ChartProps extends Omit<ChartCoreProps, 'onChange'> {
}
export declare const Chart: (props: ChartProps) => JSX.Element;
