/// <reference types="react" />
import { React, IMDataSourceJson, IntlShape } from 'jimu-core';
import { DataSchema, AddDataErrorCode } from '../utils';
interface DataSourceUrlType {
    label: string;
}
interface Props {
    intl: IntlShape;
    getDsId: () => string;
    toggleLoadStatus: (loaded: boolean) => void;
    toggleToastStatus: (isOpen: boolean, addDataErrorCode: AddDataErrorCode) => void;
    onAdded: (result: {
        dsJson: IMDataSourceJson;
        dataSchema?: DataSchema;
    }) => void;
}
interface State {
    url: string;
    selectedDataSourceUrlType: DataSourceUrlType;
    isSupported: boolean;
    selectDataHelpUrl: string;
}
export default class extends React.PureComponent<Props, State> {
    __unmounted: boolean;
    dataSourceUrlTypes: DataSourceUrlType[];
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onUrlTypesClicked: (e: any) => void;
    onInputUrl: (e: any) => void;
    onAdded: () => Promise<void>;
    changeDsJsons: (result: {
        dsJson: IMDataSourceJson;
        dataSchema?: DataSchema;
    }) => void;
    render(): JSX.Element;
}
export {};
