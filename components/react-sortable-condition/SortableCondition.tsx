import React, { useState, useCallback } from 'react'
import SortableTree, { TreeItem } from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app

import { DragStateData, MoveStateData } from './typings'
import { conditions2trees } from './utils/conditions2trees'
import { getDrageTreedata } from './utils/getDragTreedata'

export type SortableConditionProps = {
  onDragStateChanged?(value: DragStateData): void
  onMoveNode?(value: MoveStateData): void
}

export const SortableCondition = (props: SortableConditionProps) => {
  const [treeData, setTreeData] = useState<TreeItem[]>(
    conditions2trees([
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
    ]),
  )
  const handleMoveNode = useCallback(
    (value: MoveStateData) => {
      // handleDrag(
      //   value.node,
      //   'and',
      //   value.treeData,
      //   value.nextPath,
      // )
      console.log(value)
      const nextTreeData = getDrageTreedata(
        value.node,
        'and',
        value.treeData,
        value.nextParentNode!.children,
        value.nextPath,
      )
      setTreeData(nextTreeData)
    },
    [props.onMoveNode],
  )
  return (
    <div style={{ height: '400px' }}>
      <SortableTree
        onDragStateChanged={props.onDragStateChanged}
        onMoveNode={handleMoveNode}
        treeData={treeData}
        onChange={treeData => {
          console.log(treeData)
          // setTreeData(treeData)
        }}
      />
    </div>
  )
}
