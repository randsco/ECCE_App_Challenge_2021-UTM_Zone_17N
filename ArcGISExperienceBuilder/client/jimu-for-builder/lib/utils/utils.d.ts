/// <reference types="react" />
import { IMPageJson } from 'jimu-core';
export declare function getDefaultTocPageIcon(pageJson: IMPageJson): React.ComponentClass<React.SVGAttributes<SVGElement>>;
export declare function getDefaultTocDialogIcon(): React.ComponentClass<React.SVGAttributes<SVGElement>>;
export declare function getDefaultSectionIcon(): React.ComponentClass<React.SVGAttributes<SVGElement>>;
/**
 * Get related page id by dialog's id.
 */
export declare function getPageListByDialogId(pages: any, dialogId: string): any[];
