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
} from './typings'
import { wrappTreeData } from './utils/wrappTreeData'
import { getDrageTreedata } from './utils/getDragTreedata'
import { getTypeChangeTreeData } from './utils/getTypeChangeTreeData'
import { getCountTreeData } from './utils/getCountTreeData'
import { extractConditionConfig } from './utils/extractConditionConfig'
import { extractPatternConfig } from './utils/extractPatternConfig'

export type SortableConditionProps = {
  onDragStateChanged?(value: DragStateData): void
  onMoveNode?(value: MoveStateData): void
  children?: React.ReactNode
}

const data: ConditionTreeItem[] = [
  {
    title: 'root',
    type: 'and',
    expanded: true,
    children: [
      {
        title: 'and1',
        type: 'and',
        children: [{ title: 'Egg', type: 'normal', patterns: { a: 2 } }],
      },
      {
        title: 'and2',
        type: 'and',
        expanded: true,
        children: [
          { title: 'Sharks1', type: 'normal', patterns: { a: 2 } },
          { title: 'Sharks2', type: 'normal', patterns: { a: 2 } },
        ],
      },
    ],
  },
]

export const SortableCondition = (props: SortableConditionProps) => {
  const customConditionConfigs = useMemo(() => {
    return extractConditionConfig(props.children)
  }, [props.children])
  const defaultConditionConfigs = {
    conditionTypeOnChange: handleConditionTypeChange,
    conditionOnAdd: handleConditionAdd,
    conditionOnReduce: handleConditionReduce,
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
    patternOnReduce: handlePatternReduce,
  }
  const patternConfigs = {
    ...customPatternConfigs,
    ...defaultPatternConfigs,
  }
  console.log(patternConfigs)
  const [treeData, setTreeData] = useState<ConditionTreeItem[]>(
    wrappTreeData({
      value: data,
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
  function handleConditionReduce(path: NextPath) {
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
  function handlePatternReduce(path: NextPath) {
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
  const handleVisibleChange = useCallback((value: VisibilityStateData) => {
    setTreeData(value.treeData)
  }, [])
  const handleMoveNode = useCallback(
    (value: MoveStateData) => {
      const nextTreeData = getDrageTreedata({
        item: value.node,
        parentItem: value.nextParentNode,
        title: 'and',
        prevTreeData: treeData,
        treeData: value.treeData,
        siblingItems: value.nextParentNode!.children,
        path: value.nextPath,
        conditionConfigs,
      })
      setTreeData(nextTreeData)
    },
    [props.onMoveNode, treeData],
  )
  return (
    <div style={{ height: '400px' }}>
      <SortableTree
        onDragStateChanged={props.onDragStateChanged}
        onMoveNode={handleMoveNode}
        treeData={treeData}
        onVisibilityToggle={handleVisibleChange}
        onChange={treeData => {
          console.log(treeData)
          // setTreeData(treeData)
        }}
      />
    </div>
  )
}
