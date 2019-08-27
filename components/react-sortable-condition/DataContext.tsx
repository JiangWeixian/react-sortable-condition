import React from 'react'
import { ConditionTreeItem, Action } from './typings'

type Value = {
  treeData: ConditionTreeItem[]
  dispatch: React.Dispatch<Action>
}

export const DataContext = React.createContext<Value>({ treeData: [], dispatch: () => undefined })

export const DataProvider = ({ children, store }: { children?: React.ReactNode; store: Value }) => {
  return <DataContext.Provider value={store}>{children}</DataContext.Provider>
}
