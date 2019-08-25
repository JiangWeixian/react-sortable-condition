import React from 'react'
import {
  NextPath,
  ConditionTreeItem,
  ConditionConfigs,
  ConditionNodeData,
  ConditionItem,
} from '../typings'
import { getNodeAtPath, removeNodeAtPath } from 'react-sortable-tree'
import { insertItems } from './insertItems'
import { Condition } from '../Condition'

const getParentItem = (treeData: ConditionTreeItem[], path: NextPath): ConditionTreeItem | null => {
  const parentPath = path.slice(0, path.length - 1)
  const parentItem = getNodeAtPath({
    treeData,
    path: parentPath,
    getNodeKey: data => data.treeIndex,
  })
  return parentItem ? (parentItem.node as ConditionTreeItem) : null
}

export const getCountTreeData = ({
  path = [],
  treeData = [],
  conditionConfigs = {},
  type = 'add',
}: {
  path: NextPath
  treeData: ConditionTreeItem[]
  conditionConfigs?: ConditionConfigs
  type?: 'add' | 'reduce'
}) => {
  if (path.length === 0 || treeData.length === 0) {
    return treeData
  }
  const parentItem = getParentItem(treeData, path)
  if (!parentItem) {
    return treeData
  }
  const item = getNodeAtPath({
    treeData,
    path,
    getNodeKey: data => data.treeIndex,
  })
  if (!item) {
    return treeData
  }
  // handle add condition
  if (item.node.type === 'and' || item.node.type === 'or') {
    if (type === 'add') {
      const items: ConditionItem[] = [
        {
          type: 'and',
          title: (props: ConditionNodeData) => (
            <Condition
              value={{ title: 'and', type: 'and' }}
              path={props.path}
              type={props.node.type}
              conditionOnAdd={conditionConfigs.conditionOnAdd}
              conditionTypeOnChange={conditionConfigs.conditionTypeOnChange}
              conditionOnReduce={conditionConfigs.conditionOnReduce}
            />
          ),
          children: undefined,
        },
      ]
      return insertItems({
        treeData,
        path,
        items,
        parentItem,
        siblingItems: parentItem.children,
      })
    } else {
      return removeNodeAtPath({
        treeData,
        path,
        getNodeKey: data => data.treeIndex,
      }) as ConditionTreeItem[]
    }
  }
  return treeData
}
