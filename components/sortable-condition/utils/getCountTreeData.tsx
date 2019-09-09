import React from 'react'
import {
  NextPath,
  ConditionTreeItem,
  ConditionNodeData,
  ConditionItem,
  PatternItem,
} from '../typings'
import { removeNodeAtPath } from 'react-sortable-tree'
import { insertItems } from './insertItems'
import { Condition } from '../Condition'
import { createPattern, createCondition } from './factory'
import { getParentItem } from './getParentItem'

export const getCountTreeData = ({
  path = [],
  treeData = [],
  type = 'add',
  item,
}: {
  path: NextPath
  treeData: ConditionTreeItem[]
  item?: ConditionTreeItem
  type?: 'add' | 'delete'
}) => {
  const parentItem = getParentItem(treeData, path)
  // handle click root item
  if (!parentItem) {
    const child: ConditionTreeItem[] = [createCondition({})]
    return [
      {
        type: 'and',
        title: (props: ConditionNodeData) => (
          <Condition node={props.node} path={props.path} type={props.node.type} />
        ),
        children: child.concat(treeData),
        expanded: true,
      },
    ] as ConditionTreeItem[]
  }
  if (!item) {
    return treeData
  }
  // handle condition
  if (item.type === 'and' || item.type === 'or') {
    if (type === 'add') {
      const items: ConditionItem[] = [createCondition({})]
      const nextTreeData = insertItems({
        treeData,
        path,
        items,
        parentItem,
        siblingItems: parentItem.children,
        offset: -1,
      })
      return nextTreeData
    } else {
      return removeNodeAtPath({
        treeData,
        path,
        getNodeKey: data => data.treeIndex,
      }) as ConditionTreeItem[]
    }
    // handle pattern
  } else if (item.type === 'normal') {
    if (type === 'add') {
      const items: PatternItem[] = [createPattern({})]
      return insertItems({
        treeData,
        path,
        items,
        parentItem,
        siblingItems: parentItem.children,
        offset: -1,
      })
    } else {
      return removeNodeAtPath({
        treeData,
        path,
        getNodeKey: data => data.treeIndex,
      }) as PatternItem[]
    }
  }
  return treeData
}
