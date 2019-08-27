import { useReducer } from 'react'

import { ConditionTreeItem, DataItem, Action } from './typings'
import { wrappTreeData } from './utils/wrappTreeData'
import { getTypeChangeTreeData } from './utils/getTypeChangeTreeData'
import { getCountTreeData } from './utils/getCountTreeData'
import { getPatternsChangeTreeData } from './utils/getPatternsChangeTreeData'
import { getConvertTreedata } from './utils/getConvertTreeData'
import { getDragTreedata } from './utils/getDragTreedata'

const DataReducer = (state: ConditionTreeItem[] = [], action: Action): ConditionTreeItem[] => {
  switch (action.type) {
    case 'RESET':
      return action.payload
    case 'CHANGE_TYPE':
      return getTypeChangeTreeData({
        treeData: state,
        path: action.payload.path,
        value: { type: action.payload.type },
        item: action.payload.node,
      })
    case 'ADD':
      return getCountTreeData({
        treeData: state,
        path: action.payload.path,
        item: action.payload.node,
      })
    case 'DELETE':
      return getCountTreeData({
        treeData: state,
        path: action.payload.path,
        type: 'delete',
        item: action.payload.node,
      })
    case 'CHANGE_PATTERN':
      return getPatternsChangeTreeData({
        treeData: state,
        path: action.payload.path,
        value: { patterns: action.payload.patterns },
        item: action.payload.node,
      })
    case 'CONVERT':
      return getConvertTreedata({
        treeData: state,
        path: action.payload.path,
        item: action.payload.node,
      })
    case 'CHANGE_VISIABLE':
      return action.payload
    case 'MOVE':
      return getDragTreedata({
        ...action.payload,
        prevTreeData: state,
      })
    default:
      return state
  }
}

export const useTreeData = <T = any>({
  initialTreeData = [],
  controlled = false,
}: {
  initialTreeData?: DataItem<T>[]
  controlled?: boolean
}) => {
  const wrappedTreeData = wrappTreeData(initialTreeData)
  const [state, dispatch] = useReducer(DataReducer, wrappedTreeData)
  const _dispatch = controlled
    ? (..._arg: any[]) => {
        // do nothing
      }
    : dispatch
  return {
    treeData: state as ConditionTreeItem<T>[],
    dispatch: _dispatch as React.Dispatch<Action<T>>,
  }
}
