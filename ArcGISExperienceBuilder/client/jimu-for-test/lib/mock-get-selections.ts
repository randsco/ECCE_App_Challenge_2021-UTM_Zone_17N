// DOM Traversal is not implemented in JSDOM
// The best we can do is shim the functions

const getSelectionShim = () => {
  return {
    getRangeAt: () => { },
    removeAllRanges: () => { },
    setStart: () => { },
    setEnd: () => { },
    addRange: () => { },
  };
};

export const getSelections = (global) => {
  global.document = global.document || {};
  global.window = global.window || {};
  (document as any).getSelection = getSelectionShim;
  (document as any).createRange = document.getSelection;
}

