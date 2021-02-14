/// <reference types="pouchdb" />
declare namespace PouchDB{
  interface Static{
    allDbs: () => Promise<string[]>
  }
}