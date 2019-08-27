import React from 'react'

import { CustomConditionConfigs } from '../typings'

const defaultConfig: CustomConditionConfigs = {}

export const extractConditionConfig = (children?: React.ReactNode): CustomConditionConfigs => {
  const config = defaultConfig
  if (!children) {
    return config
  }
  React.Children.forEach(children, child => {
    if (React.isValidElement<CustomConditionConfigs>(child)) {
      const props = child.props
      const name = (child.type as any).displayName
      if (name && name === 'Condition') {
        config.onAdd = props.onAdd
        config.onDelete = props.onDelete
        config.onType = props.onType
        config.className = props.className
        config.addIcon = props.addIcon
        config.deleteIcon = props.deleteIcon
        config.convertIcon = props.convertIcon
      }
    }
  })
  return config
}
