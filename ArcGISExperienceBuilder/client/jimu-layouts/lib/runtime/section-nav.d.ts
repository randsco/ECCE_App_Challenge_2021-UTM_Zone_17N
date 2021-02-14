/// <reference types="react" />
interface Props {
    sectionId: string;
    currentIndex: number;
    numOfViews: number;
    onCurrentViewChange: (index: number) => void;
}
export declare function SectionNav(props: Props): JSX.Element;
export {};
