import { IUserItemOptions, IItemResourceOptions } from './helpers';
export declare function removeItem(requestOptions: IUserItemOptions): Promise<{
    success: boolean;
    itemId: string;
}>;
export declare function removeItemResource(requestOptions: IItemResourceOptions): Promise<{
    success: boolean;
}>;
