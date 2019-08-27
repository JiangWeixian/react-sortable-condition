import React from 'react'

import { ConditionTreeItem, ConditionNodeData, DataItem } from '../typings'

import { Condition } from '../Condition'
import { createPattern } from './factory'

const defaultTrees: ConditionTreeItem[] = []

export const wrappTreeData = (treeData: DataItem[] = []): ConditionTreeItem[] => {
  const trees = defaultTrees
  if (!treeData) {
    return trees
  }
  return treeData.map(item => {
    if (item.type === 'and' || item.type === 'or') {
      return {
        title: (props: ConditionNodeData) => <Condition path={props.path} type={props.node.type} />,
        type: item.type,
        expanded: item.expanded,
        children: item.children ? wrappTreeData(item.children) : [],
      }
    } else if (item.type === 'normal') {
      return createPattern({
        expanded: item.expanded,
      })
    }
    return {
      ...item,
    }
  })
}
