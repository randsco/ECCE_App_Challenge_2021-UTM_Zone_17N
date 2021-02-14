import { pegParse } from './src/parser';
import { normalizeHashtagInPlural } from './src/normalize';
export * from './src/types';
export * from './src/parser';
export * from './src/skeleton';
export function parse(input, opts) {
    var els = pegParse(input, opts);
    if (!opts || opts.normalizeHashtagInPlural !== false) {
        normalizeHashtagInPlural(els);
    }
    return els;
}
