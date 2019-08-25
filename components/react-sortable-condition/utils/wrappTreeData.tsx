import React from 'react'

import { ConditionTreeItem, ConditionNodeData, ConditionTypeChangeCallback } from '../typings'

import { Condition, ConditionProps } from '../Condition'

const defaultTrees: ConditionTreeItem[] = []

type ConditionConfigs = ConditionProps & { conditionTypeOnChange?: ConditionTypeChangeCallback }

export const wrappTreeData = ({
  value = [],
  conditionConfigs = {},
}: {
  value: ConditionTreeItem[]
  conditionConfigs: ConditionConfigs
}): ConditionTreeItem[] => {
  const trees = defaultTrees
  if (!value) {
    return trees
  }
  return value.map(item => {
    if (item.type === 'and' || item.type === 'or') {
      return {
        title: (props: ConditionNodeData) => (
          <Condition
            onChange={conditionConfigs.conditionTypeOnChange}
            value={item}
            path={props.path}
            type={props.node.type}
          />
        ),
        type: item.type,
        expanded: item.expanded,
        children: item.children ? wrappTreeData({ value: item.children, conditionConfigs }) : [],
      }
    }
    return {
      ...item,
    }
  })
}
