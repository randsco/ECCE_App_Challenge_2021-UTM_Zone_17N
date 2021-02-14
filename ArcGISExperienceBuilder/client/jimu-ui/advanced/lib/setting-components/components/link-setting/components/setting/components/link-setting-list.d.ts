/// <reference types="react" />
import { React } from 'jimu-core';
import { IMLinkParam } from '../../../types';
interface Props {
    datas: any[];
    linkParam: IMLinkParam;
    onClick: any;
}
interface State {
}
export default class LinkSettingList extends React.PureComponent<Props, State> {
    constructor(props: any);
    itemOnClick: (newSelectItem: any) => void;
    getListContent(): JSX.Element[];
    render(): JSX.Element;
}
export {};
