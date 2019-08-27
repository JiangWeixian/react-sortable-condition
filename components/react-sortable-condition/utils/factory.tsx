import React from 'react'

import {
  PatternItem,
  PatternNodeData,
  ConditionItem,
  ConditionNodeData,
  ConditionType,
} from '../typings'
import { Pattern } from '../Pattern'
import { Condition } from '../Condition'

export const createPattern = ({
  patterns = undefined,
  expanded = false,
}: {
  patterns?: any
  expanded?: boolean
}): PatternItem => {
  return {
    type: 'normal',
    children: undefined,
    expanded,
    patterns,
    title: (props: PatternNodeData) => (
      <Pattern path={props.path} type={props.node.type} patterns={props.node.patterns} />
    ),
  }
}

export const createCondition = ({
  type = 'and',
  expanded = false,
}: {
  type?: ConditionType
  expanded?: boolean
}): ConditionItem<any> => {
  return {
    type,
    expanded,
    title: (props: ConditionNodeData) => <Condition path={props.path} type={props.node.type} />,
    children: [createPattern({})],
  }
}
