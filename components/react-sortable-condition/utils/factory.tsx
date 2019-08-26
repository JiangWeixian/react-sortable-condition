import React from 'react'

import {
  PatternItem,
  PatternConfigs,
  PatternNodeData,
  ConditionItem,
  ConditionConfigs,
  ConditionNodeData,
  ConditionType,
} from '../typings'
import { Pattern } from '../Pattern'
import { Condition } from '../Condition'

export const createPattern = ({
  patterns = {},
  patternConfigs,
  expanded = false,
}: {
  patternConfigs: PatternConfigs
  patterns?: any
  expanded?: boolean
}): PatternItem => {
  return {
    type: 'normal',
    children: undefined,
    expanded,
    patterns,
    title: (props: PatternNodeData) => (
      <Pattern
        {...patternConfigs}
        path={props.path}
        type={props.node.type}
        patterns={props.node.patterns}
      />
    ),
  }
}

export const createCondition = ({
  conditionConfigs = {},
  type = 'and',
  expanded = false,
  patternConfigs,
}: {
  conditionConfigs?: ConditionConfigs
  type?: ConditionType
  expanded?: boolean
  patternConfigs: PatternConfigs
}): ConditionItem<any> => {
  return {
    type,
    expanded,
    title: (props: ConditionNodeData) => (
      <Condition {...conditionConfigs} path={props.path} type={props.node.type} />
    ),
    children: [
      createPattern({
        patternConfigs,
      }),
    ],
  }
}
