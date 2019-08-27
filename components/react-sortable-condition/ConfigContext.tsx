import React from 'react'
import { Configs } from './typings'

const defaultConfigs: Omit<Configs, 'global'> = {
  pattern: {
    component: 'this is a pattern',
  },
  condition: {},
}

export const ConfigContext = React.createContext<Omit<Configs, 'global'>>(defaultConfigs)

type Props = {
  children?: React.ReactNode
  configs?: Omit<Configs, 'global'>
}

export const ConfigProvider = ({ configs = defaultConfigs, children }: Props) => {
  return <ConfigContext.Provider value={configs}>{children}</ConfigContext.Provider>
}
