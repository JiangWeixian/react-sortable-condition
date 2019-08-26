import React from 'react'

import {
  ConditionTreeItem,
  ConditionNodeData,
  ConditionConfigs,
  PatternConfigs,
  DataItem,
} from '../typings'

import { Condition } from '../Condition'
import { createPattern } from './factory'

const defaultTrees: ConditionTreeItem[] = []

export const wrappTreeData = ({
  value = [],
  conditionConfigs = {},
  patternConfigs,
}: {
  value: DataItem[]
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
          <Condition {...conditionConfigs} path={props.path} type={props.node.type} />
        ),
        type: item.type,
        expanded: item.expanded,
        children: item.children
          ? wrappTreeData({ value: item.children, conditionConfigs, patternConfigs })
          : [],
      }
    } else if (item.type === 'normal') {
      return createPattern({
        patternConfigs,
        expanded: item.expanded,
      })
    }
    return {
      ...item,
    }
  })
}
