import React, { useState, useCallback } from 'react'
import SortableTree, { TreeItem } from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app

import { DragStateData, MoveStateData } from './typings'
import { conditions2trees } from './utils/conditions2trees'
import { isDragNormal } from './utils/isDragNormal'

export type SortableConditionProps = {
  onDragStateChanged?(value: DragStateData): void
  onMoveNode?(value: MoveStateData): void
}

export const SortableCondition = (props: SortableConditionProps) => {
  const [treeData, setTreeData] = useState<TreeItem[]>(
    conditions2trees([
      { title: 'and1', type: 'and', children: [{ title: 'Egg', type: 'normal' }] },
      {
        title: 'and2',
        type: 'and',
        children: [
          { title: 'Sharks1', type: 'normal', subtitle: 'sharks-sub' },
          { title: 'Sharks2', type: 'normal' },
        ],
      },
    ]),
  )
  const handleMoveNode = useCallback(
    (value: MoveStateData) => {
      console.log(value)
      if (isDragNormal(value.node)) {
        console.log(true)
      }
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
          setTreeData(treeData)
        }}
      />
    </div>
  )
}
