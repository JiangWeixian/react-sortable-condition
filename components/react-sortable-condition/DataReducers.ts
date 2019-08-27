import { useReducer } from 'react'

import { ConditionTreeItem, DataItem, Action } from './typings'
import { wrappTreeData } from './utils/wrappTreeData'
import { getTypeChangeTreeData } from './utils/getTypeChangeTreeData'
import { getCountTreeData } from './utils/getCountTreeData'
import { getPatternsChangeTreeData } from './utils/getPatternsChangeTreeData'
import { getConvertTreedata } from './utils/getConvertTreeData'

const DataReducer = (state: ConditionTreeItem[] = [], action: Action): ConditionTreeItem[] => {
  switch (action.type) {
    case 'RESET':
      return action.payload
    case 'CHANGE_TYPE':
      return getTypeChangeTreeData({
        treeData: state,
        path: action.payload.path,
        value: { type: action.payload.type },
      })
    case 'ADD':
      return getCountTreeData({
        treeData: state,
        path: action.payload.path,
        globalConfigs: action.payload.globalConfigs,
      })
    case 'DELETE':
      return getCountTreeData({
        treeData: state,
        path: action.payload.path,
        globalConfigs: action.payload.globalConfigs,
        type: 'delete',
      })
    case 'CHANGE_PATTERN':
      return getPatternsChangeTreeData({
        treeData: state,
        path: action.payload.path,
        value: { patterns: action.payload.patterns },
      })
    case 'CONVERT':
      return getConvertTreedata({
        treeData: state,
        path: action.payload.path,
        globalConfigs: action.payload.globalConfigs,
      })
    default:
      return state
  }
}

export const useTreeData = ({ initialState = [] }: { initialState?: DataItem[] }) => {
  const wrappedTreeData = wrappTreeData(initialState)
  const [state, dispatch] = useReducer(DataReducer, wrappedTreeData)
  return {
    treeData: state,
    dispatch,
  }
}