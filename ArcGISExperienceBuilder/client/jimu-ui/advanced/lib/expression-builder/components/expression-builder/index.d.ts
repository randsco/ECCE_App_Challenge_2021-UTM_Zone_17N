/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape } from 'jimu-core';
import type { ExpressionBuilderProps } from '../../types';
/**
 * Props of expression builder component.
 */
export { ExpressionBuilderProps };
interface ExtraProps {
    intl: IntlShape;
}
/**
 * The component is used to build {@link Expression}.
 */
declare const ExpressionBuilder: React.FC<import("react-intl").WithIntlProps<ExpressionBuilderProps & ExtraProps>> & {
    WrappedComponent: React.ComponentType<ExpressionBuilderProps & ExtraProps>;
};
export default ExpressionBuilder;
