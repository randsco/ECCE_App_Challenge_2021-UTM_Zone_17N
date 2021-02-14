export function mockSystemJsImport(){

  if(!window.SystemJS){
    window.SystemJS = {
      import: mockImport
    } as typeof System;
  }else{
    window.SystemJS.import = mockImport;
  }
}

const mockImport = (moduleName: string) => Promise.resolve(require(moduleName));
