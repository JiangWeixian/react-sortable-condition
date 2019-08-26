import React, { useState, useCallback, useMemo } from 'react'
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
import { wrappTreeData } from './utils/wrappTreeData'
import { getDrageTreedata } from './utils/getDragTreedata'
import { getTypeChangeTreeData } from './utils/getTypeChangeTreeData'
import { getCountTreeData } from './utils/getCountTreeData'
import { extractConditionConfig } from './utils/extractConditionConfig'
import { extractPatternConfig } from './utils/extractPatternConfig'
import { getPatternsChangeTreeData } from './utils/getPatternsChangeTreeData'

export type SortableConditionProps<T> = {
  onDragState?(value: DragStateData<T>): void
  onMoveNode?(value: MoveStateData<T>): void
  onVisible?(value: VisibilityStateData<T>): void
  onChange?(value: ConditionTreeItem<T>[]): void
  children?: React.ReactNode
  dataSource: DataItem<T>[]
}

export function SortableCondition<T = any>(props: SortableConditionProps<T>) {
  const customConditionConfigs = useMemo(() => {
    return extractConditionConfig(props.children)
  }, [props.children])
  const defaultConditionConfigs = {
    conditionTypeOnChange: handleConditionTypeChange,
    conditionOnAdd: handleConditionAdd,
    conditionOnDelete: handleConditionDelete,
  }
  const conditionConfigs = {
    ...customConditionConfigs,
    ...defaultConditionConfigs,
  }
  const customPatternConfigs = useMemo(() => {
    return extractPatternConfig(props.children)
  }, [props.children])
  const defaultPatternConfigs = {
    patternOnAdd: handlePatternAdd,
    patternOnDelete: handlePatternDelete,
    patternOnChange: handlePatternChange,
  }
  const patternConfigs = {
    ...customPatternConfigs,
    ...defaultPatternConfigs,
  }
  const [treeData, setTreeData] = useState<ConditionTreeItem[]>(
    wrappTreeData({
      value: props.dataSource || [],
      conditionConfigs,
      patternConfigs,
    }),
  )
  function handleConditionTypeChange(path: NextPath, value: { type: ConditionType }) {
    setTreeData(prevTreeData => {
      const nextTreeData = getTypeChangeTreeData({
        treeData: prevTreeData,
        path,
        value,
      })
      return nextTreeData
    })
  }
  function handleConditionAdd(path: NextPath) {
    setTreeData(prevTreeData => {
      const nextTreeData = getCountTreeData({
        treeData: prevTreeData,
        path,
        conditionConfigs,
        patternConfigs,
      })
      return nextTreeData
    })
  }
  function handleConditionDelete(path: NextPath) {
    setTreeData(prevTreeData => {
      const nextTreeData = getCountTreeData({
        treeData: prevTreeData,
        path,
        type: 'reduce',
        patternConfigs,
      })
      return nextTreeData
    })
  }
  function handlePatternAdd(path: NextPath) {
    setTreeData(prevTreeData => {
      const nextTreeData = getCountTreeData({
        treeData: prevTreeData,
        path,
        conditionConfigs,
        patternConfigs,
      })
      return nextTreeData
    })
  }
  function handlePatternDelete(path: NextPath) {
    setTreeData(prevTreeData => {
      const nextTreeData = getCountTreeData({
        treeData: prevTreeData,
        path,
        patternConfigs,
        type: 'reduce',
      })
      return nextTreeData
    })
  }
  function handlePatternChange(path: NextPath, value: { patterns: any }) {
    setTreeData(prevTreeData => {
      const nextTreeData = getPatternsChangeTreeData({
        treeData: prevTreeData,
        path,
        value,
      })
      return nextTreeData
    })
  }
  const handleVisibleChange = useCallback(
    (value: VisibilityStateData) => {
      if (props.onVisible) {
        props.onVisible(value)
      }
      setTreeData(value.treeData)
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
        conditionConfigs,
      })
      if (props.onMoveNode) {
        props.onMoveNode({
          ...value,
          treeData: nextTreeData,
        })
      }
      setTreeData(nextTreeData)
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
    <div style={{ height: '400px' }}>
      <SortableTree
        onDragStateChanged={props.onDragState}
        onMoveNode={handleMoveNode}
        treeData={treeData}
        onVisibilityToggle={handleVisibleChange}
        onChange={handleOnChange}
      />
    </div>
  )
}
