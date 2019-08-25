import React from 'react'

import { ConditionTreeItem } from '../typings'

import { Condition, ConditionProps } from '../Condition'
import { NodeData } from 'react-sortable-tree'

const defaultTrees: ConditionTreeItem[] = []

export const wrappTreeData = (
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
        title: (props: NodeData) => <Condition value={item} path={props.path} {...configs} />,
        type: item.type,
        expanded: item.expanded,
        children: item.children ? wrappTreeData(item.children) : [],
      }
    }
    return {
      ...item,
    }
  })
}
