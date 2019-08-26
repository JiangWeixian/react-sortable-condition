import React from 'react'

import {
  ConditionTreeItem,
  ConditionNodeData,
  ConditionConfigs,
  PatternConfigs,
  PatternNodeData,
} from '../typings'

import { Condition } from '../Condition'
import { Pattern } from '../Pattern'

const defaultTrees: ConditionTreeItem[] = []

export const wrappTreeData = ({
  value = [],
  conditionConfigs = {},
  patternConfigs,
}: {
  value: ConditionTreeItem[]
  conditionConfigs: ConditionConfigs
  patternConfigs: PatternConfigs
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
            onAdd={conditionConfigs.onAdd}
            onDelete={conditionConfigs.onDelete}
            value={item}
            path={props.path}
            type={props.node.type}
          />
        ),
        type: item.type,
        expanded: item.expanded,
        children: item.children
          ? wrappTreeData({ value: item.children, conditionConfigs, patternConfigs })
          : [],
      }
    } else if (item.type === 'normal') {
      return {
        ...item,
        expanded: item.expanded,
        children: undefined,
        type: 'normal',
        title: (props: PatternNodeData) => (
          <Pattern
            component={patternConfigs.defaultPattern}
            path={props.path}
            patternOnAdd={patternConfigs.patternOnAdd}
            patternOnReduce={patternConfigs.patternOnReduce}
            type="normal"
            patterns={props.node.patterns}
          />
        ),
      }
    }
    return {
      ...item,
    }
  })
}
