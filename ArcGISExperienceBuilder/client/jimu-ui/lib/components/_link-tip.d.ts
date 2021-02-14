/// <reference types="react" />
import { TargetType, Placement } from './popper';
interface Props {
    open: boolean;
    reference: TargetType;
    placement?: Placement;
    className?: string;
    href: string;
}
export declare const LinkTip: ({ open, reference, placement, className, href }: Props) => JSX.Element;
export {};
