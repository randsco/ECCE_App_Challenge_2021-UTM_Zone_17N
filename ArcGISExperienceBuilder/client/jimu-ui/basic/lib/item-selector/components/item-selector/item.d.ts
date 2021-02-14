/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
import { IItemWithPortalUrl } from '../../types';
interface Props {
    item: IItemWithPortalUrl;
    portalUrl: string;
    onShowDetailClicked: (evt: React.MouseEvent<HTMLElement>, item: IItemWithPortalUrl) => void;
    onAddDataClicked: (evt: React.MouseEvent<HTMLElement>, item: IItemWithPortalUrl) => void;
    onRemoveDataClicked: (evt: React.MouseEvent<HTMLElement>, item: IItemWithPortalUrl) => void;
    selected: boolean;
    partSelected: boolean;
    intl: IntlShape;
}
interface State {
    dataComponentsUtils: any;
    AllDataSourceTypes: any;
}
export default class Item extends React.PureComponent<Props, State> {
    __unmount: boolean;
    lastClickTime: number;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onItemClicked: (e: any) => void;
    onShowDetailClicked: (e: any) => void;
    render(): JSX.Element;
}
export {};
