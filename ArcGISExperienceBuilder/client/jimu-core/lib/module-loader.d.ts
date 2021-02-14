import * as jimuForBuilderModules from 'jimu-for-builder';
export declare function getModuleSync(module: string): any;
export declare function loadModule(module: string, requiredExports?: string[]): Promise<any>;
export declare function loadModules(modules: string[]): Promise<any[]>;
/**
 * return http://....
 * @param module
 */
export declare function resolveModuleFullUrl(module: string): string;
/**
 * return /abc/123
 * @param module
 */
export declare function resolveModuleFullPath(module: string): string;
export declare function getJimuForBuilderModules(): typeof jimuForBuilderModules;
