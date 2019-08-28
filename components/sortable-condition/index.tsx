import React, { useCallback, useMemo } from 'react'
import cx from 'classnames'
import SortableTree from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app

import {
  DragStateData,
  MoveStateData,
  ConditionTreeItem,
  VisibilityStateData,
  DataItem,
} from './typings'
import styles from './style/SortableCondition.css.json'
import { extractConditionConfig } from './utils/extractConditionConfig'
import { extractPatternConfig } from './utils/extractPatternConfig'
import { ConfigProvider } from './ConfigContext'
import { DataProvider } from './DataContext'
import { useTreeData as useDefaultTreeData } from './useTreeData'
import { ConfigCondition } from './Condition'
import { ConfigPattern } from './Pattern'

export type SortableConditionProps<T> = {
  onDragState?(value: DragStateData<T>): void
  onMoveNode?(value: MoveStateData<T>): void
  onVisible?(value: VisibilityStateData<T>): void
  onChange?(value: ConditionTreeItem<T>[]): void
  children?: React.ReactNode
  dataSource?: ConditionTreeItem<T>[]
  defaultDataSource?: DataItem<T>[]
  className?: string
  maxDepth?: number
}

function SortableCondition<T = any>(props: SortableConditionProps<T>) {
  const conditionConfigs = useMemo(() => {
    return extractConditionConfig(props.children)
  }, [props.children])
  const patternConfigs = useMemo(() => {
    return extractPatternConfig(props.children)
  }, [props.children])
  const globalConfigs = {
    maxDepth: props.maxDepth ? props.maxDepth + 1 : props.maxDepth,
  }
  const { treeData, dispatch } = useDefaultTreeData({
    initialTreeData: props.defaultDataSource,
    treeData: props.dataSource,
    controlled: !!props.dataSource,
  })
  const handleVisibleChange = useCallback(
    (value: VisibilityStateData) => {
      if (props.onVisible) {
        props.onVisible(value)
      }
      dispatch({ type: 'CHANGE_VISIABLE', payload: value.treeData })
    },
    [props.onVisible],
  )
  const handleMoveNode = useCallback(
    (value: MoveStateData) => {
      if (props.onMoveNode) {
        props.onMoveNode(value)
      }
      dispatch({
        type: 'MOVE',
        payload: {
          item: value.node,
          parentItem: value.nextParentNode,
          prevPath: value.prevPath,
          treeData: value.treeData,
          siblingItems: value.nextParentNode ? value.nextParentNode.children : [],
          path: value.nextPath,
        },
      })
    },
    [props.onMoveNode],
  )
  const handleOnChange = useCallback(
    (value: ConditionTreeItem[]) => {
      // do nothing
      if (props.onChange) {
        props.onChange(value)
      }
    },
    [props.onChange],
  )
  return (
    <ConfigProvider
      configs={{ pattern: patternConfigs, condition: conditionConfigs, global: globalConfigs }}
    >
      <DataProvider store={{ treeData, dispatch }}>
        <SortableTree
          onDragStateChanged={props.onDragState}
          onMoveNode={handleMoveNode}
          treeData={props.dataSource || treeData}
          onVisibilityToggle={handleVisibleChange}
          onChange={handleOnChange}
          className={cx(styles.sortableCondition, props.className)}
          maxDepth={props.maxDepth ? props.maxDepth + 1 : props.maxDepth}
        />
      </DataProvider>
    </ConfigProvider>
  )
}

namespace SortableCondition {
  export const Condition = ConfigCondition
  export const Pattern = ConfigPattern
  export const useTreeData = useDefaultTreeData
}

export default SortableCondition
