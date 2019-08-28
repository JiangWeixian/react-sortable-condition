import React from 'react'
import { Configs } from './typings'

const defaultConfigs: Configs = {
  pattern: {
    component: 'this is a pattern',
  },
  condition: {},
  global: {},
}

export const ConfigContext = React.createContext<Configs>(defaultConfigs)

type Props = {
  children?: React.ReactNode
  configs?: Configs
}

export const ConfigProvider = ({ configs = defaultConfigs, children }: Props) => {
  return <ConfigContext.Provider value={configs}>{children}</ConfigContext.Provider>
}
