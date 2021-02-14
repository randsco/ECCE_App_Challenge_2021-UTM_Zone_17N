import * as SeamlessImmutable from 'seamless-immutable';
declare module 'seamless-immutable' {
  function set<T, K extends keyof T>(obj: T, property: K, value: T[K]): SeamlessImmutable.Immutable<T>;
  function set<T, TValue>(obj: T, property: string, value: TValue): SeamlessImmutable.Immutable<T>;

  function setIn<T, K extends keyof T>(obj: T, propertyPath: [K], value: T[K]): SeamlessImmutable.Immutable<T>;
  function setIn<T, K extends keyof T, L extends keyof T[K]>(obj: T, propertyPath: [K, L], value: T[K][L]): SeamlessImmutable.Immutable<T>;
  function setIn<T, K extends keyof T, L extends keyof T[K], M extends keyof T[K][L]>(obj: T, propertyPath: [K, L, M], value: T[K][L][M]): SeamlessImmutable.Immutable<T>;

  function setIn<T, K extends keyof T, L extends keyof T[K], M extends keyof T[K][L], N extends keyof T[K][L][M]>(
    propertyPath: [K, L, M, N], value: T[K][L][M][N]): SeamlessImmutable.Immutable<T>;

  function setIn<T, K extends keyof T, L extends keyof T[K], M extends keyof T[K][L], N extends keyof T[K][L][M], O extends keyof T[K][L][M][N]>(obj: T,
    propertyPath: [K, L, M, N, O], value: T[K][L][M][N][O]): SeamlessImmutable.Immutable<T>;
  function setIn<T, TValue>(obj: T, propertyPath: string[], value: TValue): SeamlessImmutable.Immutable<T>;
}