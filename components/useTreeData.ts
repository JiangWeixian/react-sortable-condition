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
    case 'INIT':
      return wrappTreeData(action.payload)
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
      return getDragTreedata(action.payload)
    default:
      return state
  }
}

const defaultTreeData: ConditionTreeItem[] = []

export const useTreeData = <T = any>({
  initialTreeData,
  treeData,
  onChange,
}: {
  initialTreeData?: DataItem<T>[]
  treeData?: ConditionTreeItem[]
  onChange?(value?: ConditionTreeItem[]): void
}) => {
  const wrappedTreeData = initialTreeData
    ? wrappTreeData(initialTreeData)
    : treeData || defaultTreeData
  const [state, dispatch] = useReducer(DataReducer, wrappedTreeData)
  /**
   * 实际上在`full control mode`下。并且使用`useTreeData`作为数据管理.
   * `treeData`变化并不会引起`useReducer`重新计算, 自然不会改变`state`.
   * `<Condition /> and <Pattern />`中使用还是第一次初始化的数据
   * - `data change`需要通过onChange方法
   * - 改变的`action`由`dispatch`发起, 数据计算方式保存在`DataReducer`中
   */
  const finalDispatch = (({ type, payload }: { type: any; payload: any }) => {
    if (treeData) {
      if (onChange) {
        onChange(DataReducer(treeData, { type, payload }))
      }
    } else {
      dispatch({ type, payload })
    }
  }) as React.Dispatch<Action<T>>
  return {
    treeData: state as ConditionTreeItem<T>[],
    dispatch: finalDispatch,
  }
}
