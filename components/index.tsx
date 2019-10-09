import React, { useCallback, useMemo, useEffect, useRef } from 'react'
import cx from 'classnames'
import SortableTree from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app

import {
  DragStateData,
  MoveStateData,
  ConditionTreeItem,
  VisibilityStateData,
  DataItem,
  RowInfo,
} from './typings'
import styles from './style/SortableCondition.css.json'
import './style/SortableCondition.css'
import { extractConditionConfig } from './utils/extractConditionConfig'
import { extractPatternConfig } from './utils/extractPatternConfig'
import { ConfigProvider } from './ConfigContext'
import { DataProvider } from './DataContext'
import { useTreeData as useDefaultTreeData } from './useTreeData'
import { ConfigCondition } from './Condition'
import { ConfigPattern } from './Pattern'
import { isCanDrag, isCanDrop } from './utils/rules'

export type SortableConditionProps<T> = {
  onDragState?(value: DragStateData<T>): void
  onMoveNode?(value: MoveStateData<T>): void
  onVisible?(value: VisibilityStateData<T>): void
  onChange?(value: ConditionTreeItem<T>[]): void
  children?: React.ReactNode
  dataSource?: ConditionTreeItem<T>[]
  defaultDataSource?: DataItem<T>[]
  className?: string
  style?: React.CSSProperties
  maxDepth?: number
  /**
   * global row height
   */
  rowHeight?: number
  /**
   * width of line between item
   */
  indent?: number
}

const defaultRowHeight = 62

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
  })
  const listRef = useRef()
  const dragInterval = useRef<NodeJS.Timeout>()
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
          nextParentItem: value.nextParentNode,
          treeData: value.treeData,
          siblingItems: value.nextParentNode ? value.nextParentNode.children : [],
          path: value.nextPath,
        },
      })
    },
    [props.onMoveNode],
  )
  // bugs fixed refs: https://github.com/frontend-collective/react-sortable-tree/issues/264
  useEffect(() => {
    if (listRef.current) {
      const recompute = () => {
        ;(listRef.current as any).wrappedInstance.current.recomputeRowHeights()
      }
      dragInterval.current = setInterval(recompute, 250)
      return () => {
        ;(listRef.current as any).wrappedInstance.current.recomputeRowHeights()
        dragInterval.current && clearInterval(dragInterval.current)
      }
    }
  }, [treeData, props.dataSource])
  useEffect(() => {
    // do nothing
    if (props.onChange) {
      props.onChange(treeData)
    }
  }, [props.onChange, treeData])
  // get row height
  const getRowHeight = useCallback(
    (info: RowInfo) => {
      if (props.rowHeight) {
        return props.rowHeight
      }
      if (info.node.type !== 'normal') {
        return conditionConfigs.rowHeight || defaultRowHeight
      }
      if (info.node.type === 'normal') {
        return patternConfigs.rowHeight || defaultRowHeight
      }
      return defaultRowHeight
    },
    [props.rowHeight, conditionConfigs.rowHeight, patternConfigs.rowHeight],
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
          rowHeight={getRowHeight as any}
          scaffoldBlockPxWidth={props.indent}
          canDrag={isCanDrag}
          canDrop={isCanDrop as any}
          reactVirtualizedListProps={{
            autoHeight: true,
            ref: listRef,
          }}
          style={props.style}
          onChange={() => {
            // do nothing
          }}
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
