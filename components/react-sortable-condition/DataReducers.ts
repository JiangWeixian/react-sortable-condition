import { ConditionTreeItem, DataItem, Action } from './typings'
import { useReducer } from 'react'
import { wrappTreeData } from './utils/wrappTreeData'
import { getTypeChangeTreeData } from './utils/getTypeChangeTreeData'

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
