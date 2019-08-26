import React from 'react'

import { ConfigPatternProps } from '../typings'

const defaultConfig: ConfigPatternProps = {
  defaultPattern: 'this is a pattern',
}

export const extractPatternConfig = (children?: React.ReactNode): ConfigPatternProps => {
  const config = defaultConfig
  if (!children) {
    return config
  }
  React.Children.forEach(children, child => {
    if (React.isValidElement<ConfigPatternProps>(child)) {
      const props = child.props
      const name = (child.type as any).displayName
      if (name && name === 'Pattern') {
        config.onAdd = props.onAdd
        config.onDelete = props.onDelete
        config.defaultPattern = props.children || config.defaultPattern
      }
    }
  })
  return config
}
