import {ImmutableObject, Expression} from 'jimu-core';

export enum EmbedType{
  Url = 'url',
  Code = 'code'
}

export interface Config{
  embedType: EmbedType,
  embedCode: string,
  staticUrl: string,
  expression: Expression,
  autoRefresh?: boolean,
  autoInterval?: number,
}

export type IMConfig = ImmutableObject<Config>;
