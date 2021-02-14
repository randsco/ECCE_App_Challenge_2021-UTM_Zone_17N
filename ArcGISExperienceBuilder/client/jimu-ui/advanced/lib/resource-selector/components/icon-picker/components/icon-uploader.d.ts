/// <reference types="react" />
import { React } from 'jimu-core';
import { ResourceItemInfo, ImageResourceItemInfo } from 'jimu-for-builder';
interface IconUploaderProps {
    widgetId: string;
    className?: string;
    onSuccess?: (result: ImageResourceItemInfo) => void;
    onError?: () => void;
}
export declare class IconUploader extends React.PureComponent<IconUploaderProps> {
    onChange: (resourceInfo: ResourceItemInfo) => void;
    render(): JSX.Element;
}
export {};
