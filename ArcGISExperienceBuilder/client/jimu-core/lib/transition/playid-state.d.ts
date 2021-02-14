export declare function useOnebyOnePreviewId(oneByOnePlayId: symbol): (isActive: boolean) => symbol;
export declare function useSectionPreviewId(props: {
    sectionPlayId: symbol;
    withOneByOne: boolean;
    willPlayTransition: boolean;
}): (isActive: boolean) => symbol;
export declare function useSectionPlayId(props: {
    activeViewIndex: number;
    willPlayTransition: boolean;
}): (isDesignMode: boolean, isActive: boolean) => symbol;
