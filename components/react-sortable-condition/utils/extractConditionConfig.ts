import React from 'react'

import { ConfigConditionProps } from '../typings'

const defaultConfig: ConfigConditionProps = {}

export const extractConditionConfig = (children?: React.ReactNode): ConfigConditionProps => {
  const config = defaultConfig
  if (!children) {
    return config
  }
  React.Children.forEach(children, child => {
    if (React.isValidElement<ConfigConditionProps>(child)) {
      const props = child.props
      const name = (child.type as any).displayName
      if (name && name === 'Condition') {
        config.onAdd = props.onAdd
        config.onDelete = props.onDelete
        config.onType = props.onType
        config.className = props.className
        config.addIcon = props.addIcon
        config.deleteIcon = props.deleteIcon
      }
    }
  })
  return config
}
