import React from 'react'

import { ConfigPatternProps, PatternConfigs } from '../typings'

const defaultConfig: PatternConfigs = {
  component: 'this is a pattern',
}

export const extractPatternConfig = (children?: React.ReactNode): PatternConfigs => {
  const config = defaultConfig
  if (!children) {
    return config
  }
  React.Children.forEach(children, child => {
    if (React.isValidElement<ConfigPatternProps>(child)) {
      const props = child.props
      const name = (child.type as any).displayName
      console.log(child)
      if (name && name === 'Pattern') {
        config.onAdd = props.onAdd
        config.onDelete = props.onDelete
        config.component = props.children || config.component
      }
    }
  })
  return config
}
