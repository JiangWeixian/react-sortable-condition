import React from 'react'

import { ConditionTreeItem } from '../typings'

import { Condition, ConditionProps } from '../Condition'

const defaultTrees: ConditionTreeItem[] = []

export const conditions2trees = (
  conditions?: ConditionTreeItem[],
  configs: ConditionProps = {},
): ConditionTreeItem[] => {
  const trees = defaultTrees
  if (!conditions) {
    return trees
  }
  return conditions.map(item => {
    if (item.type === 'and' || item.type === 'or') {
      return {
        title: <Condition value={item} {...configs} />,
        type: item.type,
        expanded: item.expanded,
        children: item.children ? conditions2trees(item.children) : [],
      }
    }
    return {
      ...item,
    }
  })
}
