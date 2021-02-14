/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, ImmutableArray } from 'jimu-core';
import { ExpressionInputType, ExpressionBuilderProps } from '../../types';
interface ExpressionInputProps extends Omit<ExpressionBuilderProps, 'types'> {
    isExpPopupOpen: boolean;
    /**
     * If `true` and the length of `types` less than 1, hide the types selector(dropdown)
     */
    autoHide?: boolean;
    types: ImmutableArray<ExpressionInputType>;
    placeHolders?: {
        [types: string]: string;
    };
    openExpPopup: () => void;
    closeExpPopup: () => void;
}
interface ExtraProps {
    intl: IntlShape;
}
declare const ExpressionInput: React.FC<import("react-intl").WithIntlProps<ExpressionInputProps & ExtraProps>> & {
    WrappedComponent: React.ComponentType<ExpressionInputProps & ExtraProps>;
};
export default ExpressionInput;
