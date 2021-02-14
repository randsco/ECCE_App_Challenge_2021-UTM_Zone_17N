import { ClauseDisplayType, ClauseType, SqlClauseSet, SqlClause, IMSqlExpression } from 'jimu-core';

/**
 * get number of clauses which support askForValue or displayLabel to endUser.
 */
export function getClauseNumForEndUser(sqlExprObj: IMSqlExpression): number {
  // const sqlExprObj = this.props.config.sqlExprObj;
  let num = 0;
  sqlExprObj && sqlExprObj.parts.some(item => {
    if(item.type === ClauseType.Single && (item as SqlClause).displayType !== ClauseDisplayType.None){
      num++;
    } else if (item.type === ClauseType.Set) {
      (item as SqlClauseSet).parts.some(item => {
        if ((item as SqlClause).displayType !== ClauseDisplayType.None) {
          num++;
        }
      })
    }
  })
  return num;
}

/**
 * get number of clauses configured by user.
 */
export function getClauseNumByExpression(sqlExprObj: IMSqlExpression): number {
  let num = 0;
  sqlExprObj && sqlExprObj.parts.some(item => {
    if(item.type === ClauseType.Single){
      num++;
    } else if (item.type === ClauseType.Set) {
      (item as SqlClauseSet).parts.some(item => {
        num++;
      })
    }
  })
  return num;
}