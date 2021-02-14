import { Immutable } from 'jimu-core';
import { versionManager, DEFAULT_CONFIG } from '../src/version-manager';

let upgrader = null;

describe('Test navigator version-manager for version 1.0.0', () => {
  beforeAll(() => {
    upgrader = versionManager.versions?.filter(function (version) {
      return version.version === '1.0.0';
    })[0]?.upgrader;
  });

  it('should return default config if oldConfig is undefined', () => {
    const newConfig = upgrader(null);
    expect(newConfig).toEqual(DEFAULT_CONFIG);
  });

  it('should return current config if variants of oldConfig is undefined', () => {
    const oldConfig = Immutable({
      data: {
        type: 'AUTO',
        section: 'section_1'
      },
      display: {}
    });
    const newConfig = upgrader(oldConfig);
    expect(newConfig).toEqual(oldConfig);
  });

  it('should return current config if variants of oldConfig is defined', () => {
    const oldConfig = Immutable({
      data: {
        type: 'AUTO',
        section: 'section_1',
      },
      display: {
        variants: {}
      }
    });
    const newConfig = upgrader(oldConfig);
    expect(newConfig).toEqual(Immutable({
      data: {
        type: 'AUTO',
        section: 'section_1',
      },
      display: {
        advanced: true,
        variants: {}
      }
    }));
  });

});