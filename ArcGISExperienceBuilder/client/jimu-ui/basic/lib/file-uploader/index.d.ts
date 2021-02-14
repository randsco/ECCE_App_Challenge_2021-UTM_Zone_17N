/// <reference types="react" />
import { React } from 'jimu-core';
interface Props {
    accept: string;
    className?: string;
    onUploadSuccess?: (csv: CsvFileInfo) => void;
}
export interface CsvFileInfo {
    name: string;
    id: string;
    records: Record<string, unknown>[];
}
export declare class FileUploader extends React.PureComponent<Props, unknown> {
    constructor(props: any);
    componentDidMount(): void;
    onUploadSuccess: (result: any, file: any, xhr: any) => void;
    render(): JSX.Element;
}
export {};
