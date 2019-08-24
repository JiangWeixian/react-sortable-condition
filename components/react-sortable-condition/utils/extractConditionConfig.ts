import React from 'react'

import { ConditionTreeItem } from '../typings/index'

const defaultData: ConditionTreeItem[] = []

export const extractConditionConfig = (children: React.ReactChildren): ConditionTreeItem[] => {
  const data = defaultData
  React.Children.map(children, child => {
    if (React.isValidElement<ConditionTreeItem>(child)) {
      const props = child.props
      return {
        type: props.type,
        title: props.title,
      }
    }
  })
  return data
}
