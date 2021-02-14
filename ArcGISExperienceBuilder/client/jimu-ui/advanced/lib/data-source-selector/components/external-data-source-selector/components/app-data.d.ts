/// <reference types="react" />
import { React, IMDataSourceJson, IntlShape } from 'jimu-core';
interface Props {
    onAdded: (dsJson: IMDataSourceJson) => void;
    onRemoved: (dsJson: IMDataSourceJson) => void;
    portalUrl: string;
    intl: IntlShape;
}
interface State {
    hubEventDsJson: IMDataSourceJson;
    hubAnnoDsJson: IMDataSourceJson;
    selectedDsJsons: IMDataSourceJson[];
}
export default class extends React.PureComponent<Props, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getHubEventDsJson: () => IMDataSourceJson;
    getHubAnnoDsJson: () => IMDataSourceJson;
    getWhetherDsSelected: (dsJson: IMDataSourceJson) => boolean;
    onItemClick: (dsJson: IMDataSourceJson) => void;
    Item: ({ dsJson, active, title, onClick }: {
        dsJson: IMDataSourceJson;
        active: boolean;
        title: string;
        onClick: (dsJson: IMDataSourceJson) => void;
    }) => JSX.Element;
    render(): JSX.Element;
}
export {};
