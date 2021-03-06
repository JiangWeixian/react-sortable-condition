import React from 'react'

import { CustomPatternConfigs, PatternConfigs } from '../typings'

const defaultConfig: PatternConfigs = {
  component: 'this is a pattern',
}

export const extractPatternConfig = (children?: React.ReactNode): PatternConfigs => {
  const config = defaultConfig
  if (!children) {
    return config
  }
  React.Children.forEach(children, child => {
    if (React.isValidElement<CustomPatternConfigs>(child)) {
      const props = child.props
      const name = (child.type as any).displayName
      if (name && name === 'Pattern') {
        config.onAdd = props.onAdd
        config.onDelete = props.onDelete
        config.onConvert = props.onConvert
        config.component = props.children || config.component
        config.className = props.className
        config.addIcon = props.addIcon
        config.deleteIcon = props.deleteIcon
        config.convertIcon = props.convertIcon
        config.rowHeight = props.rowHeight
      }
    }
  })
  return config
}
