/// <reference types="react" />
import { IMDialogJson } from './types/app-config';
interface Props {
    dialogJson: IMDialogJson;
    /**
     * the followings are for fixed dialog
     */
    isOpenByPage?: boolean;
    runtime?: boolean;
    /**
     * the followings are for follow operner dialog:
     */
    opener?: any;
    isOpen?: boolean;
    toggle?: () => void;
}
export declare function AppDialog(props: Props): JSX.Element;
export {};
