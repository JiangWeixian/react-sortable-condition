import React from 'react'
import { ConditionTreeItem } from './typings'

export const DataContext = React.createContext<ConditionTreeItem[]>([])

export const DataProvider = ({
  children,
  store,
}: {
  children?: React.ReactNode
  store: ConditionTreeItem[]
}) => {
  return <DataContext.Provider value={store}>{children}</DataContext.Provider>
}
