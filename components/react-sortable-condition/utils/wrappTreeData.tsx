import React from 'react'

import { ConditionTreeItem, ConditionNodeData, ConditionConfigs } from '../typings'

import { Condition } from '../Condition'

const defaultTrees: ConditionTreeItem[] = []

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
            conditionTypeOnChange={conditionConfigs.conditionTypeOnChange}
            conditionOnAdd={conditionConfigs.conditionOnAdd}
            conditionOnReduce={conditionConfigs.conditionOnReduce}
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
