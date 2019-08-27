import React, { useCallback, useMemo } from 'react'
import SortableTree from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app

import {
  DragStateData,
  MoveStateData,
  ConditionTreeItem,
  NextPath,
  ConditionType,
  VisibilityStateData,
  DataItem,
} from './typings'
import styles from './style/SortableCondition.styl'
import { getDrageTreedata } from './utils/getDragTreedata'
import { getCountTreeData } from './utils/getCountTreeData'
import { extractConditionConfig } from './utils/extractConditionConfig'
import { extractPatternConfig } from './utils/extractPatternConfig'
import { getPatternsChangeTreeData } from './utils/getPatternsChangeTreeData'
import { getConvertTreedata } from './utils/getConvertTreeData'
import { ConfigProvider } from './ConfigContext'
import { DataProvider } from './DataContext'
import { useTreeData } from './DataReducers'

export type SortableConditionProps<T> = {
  onDragState?(value: DragStateData<T>): void
  onMoveNode?(value: MoveStateData<T>): void
  onVisible?(value: VisibilityStateData<T>): void
  onChange?(value: ConditionTreeItem<T>[]): void
  children?: React.ReactNode
  dataSource: DataItem<T>[]
  maxDepth?: number
}

export function SortableCondition<T = any>(props: SortableConditionProps<T>) {
  const customConditionConfigs = useMemo(() => {
    return extractConditionConfig(props.children)
  }, [props.children])
  const defaultConditionConfigs = {
    conditionTypeOnChange: () => console.log('conditionTypechaneg'),
    conditionOnAdd: () => console.log('add'),
    conditionOnDelete: () => console.log('delete'),
    conditionOnConvert: handleConvert,
  }
  const conditionConfigs = {
    ...customConditionConfigs,
    ...defaultConditionConfigs,
  }
  const customPatternConfigs = useMemo(() => {
    return extractPatternConfig(props.children)
  }, [props.children])
  const defaultPatternConfigs = {
    patternOnAdd: () => console.log('add'),
    patternOnDelete: () => console.log('delete'),
    patternOnChange: handlePatternChange,
    patternOnConvert: handleConvert,
  }
  const patternConfigs = {
    ...customPatternConfigs,
    ...defaultPatternConfigs,
  }
  const globalConfigs = {
    maxDepth: props.maxDepth ? props.maxDepth + 1 : props.maxDepth,
  }
  const { treeData, dispatch } = useTreeData({ initialState: props.dataSource || [] })
  function handlePatternChange(path: NextPath, value: { patterns: any }) {
    // setTreeData(prevTreeData => {
    //   const nextTreeData = getPatternsChangeTreeData({
    //     treeData: prevTreeData,
    //     path,
    //     value,
    //   })
    //   return nextTreeData
    // })
  }
  function handleConvert(path: NextPath) {
    // setTreeData(prevTreeData => {
    //   const nextTreeData = getConvertTreedata({
    //     treeData: prevTreeData,
    //     path,
    //     globalConfigs,
    //   })
    //   return nextTreeData
    // })
  }
  const handleVisibleChange = useCallback(
    (value: VisibilityStateData) => {
      if (props.onVisible) {
        props.onVisible(value)
      }
      dispatch({ type: 'RESET', payload: value.treeData })
    },
    [props.onVisible],
  )
  const handleMoveNode = useCallback(
    (value: MoveStateData) => {
      const nextTreeData = getDrageTreedata({
        item: value.node,
        parentItem: value.nextParentNode,
        prevTreeData: treeData,
        treeData: value.treeData,
        siblingItems: value.nextParentNode ? value.nextParentNode.children : [],
        path: value.nextPath,
      })
      if (props.onMoveNode) {
        props.onMoveNode({
          ...value,
          treeData: nextTreeData,
        })
      }
      dispatch({ type: 'RESET', payload: nextTreeData })
    },
    [props.onMoveNode, treeData],
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
          treeData={treeData}
          onVisibilityToggle={handleVisibleChange}
          onChange={handleOnChange}
          className={styles.sortableCondition}
          maxDepth={props.maxDepth ? props.maxDepth + 1 : props.maxDepth}
        />
      </DataProvider>
    </ConfigProvider>
  )
}
