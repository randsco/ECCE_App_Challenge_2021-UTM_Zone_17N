import { ImmutableObject } from 'jimu-core';

export interface FlexboxConfig {
  min: number;
  space: number;
  style: {
    padding?: {
      number: number[],
      unit: string,
    },
    justifyContent?: string,
    alignItems?: string,
    overflowY?: boolean
  };
}

export type IMFlexboxConfig = ImmutableObject<FlexboxConfig>;
