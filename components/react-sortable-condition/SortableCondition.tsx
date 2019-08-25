import React, { useState, useCallback } from 'react'
import SortableTree from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app

import { DragStateData, MoveStateData, ConditionTreeItem, NextPath, ConditionType } from './typings'
import { wrappTreeData } from './utils/wrappTreeData'
import { getDrageTreedata } from './utils/getDragTreedata'
import { getTypeChangeTreeData } from './utils/getTypeChangeTreeData'

export type SortableConditionProps = {
  onDragStateChanged?(value: DragStateData): void
  onMoveNode?(value: MoveStateData): void
}

const data: ConditionTreeItem[] = [
  {
    title: 'root',
    type: 'and',
    expanded: true,
    children: [
      { title: 'and1', type: 'and', children: [{ title: 'Egg', type: 'normal' }] },
      {
        title: 'and2',
        type: 'and',
        expanded: true,
        children: [
          { title: 'Sharks1', type: 'normal', subtitle: 'sharks-sub' },
          { title: 'Sharks2', type: 'normal' },
        ],
      },
    ],
  },
]

export const SortableCondition = (props: SortableConditionProps) => {
  const [treeData, setTreeData] = useState<ConditionTreeItem[]>(
    wrappTreeData({
      value: data,
      conditionConfigs: {
        conditionTypeOnChange: handleConditionTypeChange,
      },
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
        conditionConfigs: {
          conditionTypeOnChange: handleConditionTypeChange,
        },
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
        generateNodeProps={rowInfo => ({
          buttons: [
            <a className="Delete" onClick={() => console.log(rowInfo)}>
              click
            </a>,
            <a className="Delete">click</a>,
          ],
        })}
        onChange={treeData => {
          // console.log(treeData)
          // setTreeData(treeData)
        }}
      />
    </div>
  )
}
