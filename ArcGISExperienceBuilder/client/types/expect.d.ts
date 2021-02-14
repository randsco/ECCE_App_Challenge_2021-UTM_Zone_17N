import 'jest-extended';
type Expect = (R, T?) => jest.Matchers<R, T>;

declare const expect: Expect;