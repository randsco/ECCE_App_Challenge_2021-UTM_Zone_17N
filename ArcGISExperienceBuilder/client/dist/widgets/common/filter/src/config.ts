import { ImmutableObject, ImmutableArray, IMSqlExpression, IMUseDataSource, IMIconResult, ClauseLogic } from 'jimu-core';

export enum FilterArrangeType{
  Block = 'BLOCK',
  Inline = 'INLINE',
  Popper = 'POPPER',
}

export enum FilterTriggerType{
  Toggle = 'TOGGLE',
  Button = 'BUTTON'
}

// eslint-disable-next-line  @typescript-eslint/naming-convention
export interface filterItemConfig {
  icon?: IMIconResult;
  name: string;
  useDataSource: IMUseDataSource,
  sqlExprObj?: IMSqlExpression;
  exprInvert?: boolean;
  autoApplyWhenWidgetOpen?: boolean;
  collapseFilterExprs?: boolean;
}

// eslint-disable-next-line  @typescript-eslint/naming-convention
export interface filterConfig {
  id: string;
  arrangeType: FilterArrangeType;
  triggerType: FilterTriggerType;
  wrap?: boolean; //only for inline arrangement
  omitInternalStyle: boolean;
  filterItems?: ImmutableArray<filterItemConfig>
  logicalOperator: ClauseLogic;
  groupByLayer: boolean;
  custom: boolean;
  resetAll: boolean;
  turnOffAll: boolean;
}

export type WidgetConfig = ImmutableObject<filterConfig>;