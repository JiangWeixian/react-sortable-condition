import React from 'react'

import { ConditionTreeItem, NextPath, ConditionNodeData } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'
import { Condition } from '../Condition'
import { isAllNormalItems } from './isAllNormalItems'
import { isAllConditionItems } from './isAllConditionItems'
import { insertItems } from './insertItems'

export const getDragTreedata = ({
  item,
  nextParentItem,
  treeData = [],
  siblingItems = [],
  path = [],
}: {
  item: ConditionTreeItem
  nextParentItem: ConditionTreeItem | null
  treeData?: ConditionTreeItem[]
  siblingItems?: ConditionTreeItem[]
  path?: NextPath
}): ConditionTreeItem[] => {
  if (item.type === 'normal') {
    if (isAllNormalItems(siblingItems)) {
      return treeData
    }
    return changeNodeAtPath({
      treeData,
      path,
      getNodeKey: data => data.treeIndex,
      newNode: {
        type: 'and',
        title: (props: ConditionNodeData) => (
          <Condition node={props.node} type={props.node.type} path={props.path} />
        ),
        children: [item],
      },
    }) as ConditionTreeItem[]
  }
  if (item.type === 'and' || item.type === 'or') {
    if (isAllConditionItems(siblingItems)) {
      return treeData
    }
    if (!nextParentItem) {
      return treeData
    }
    // spreed condition.children
    return insertItems({
      treeData,
      path,
      siblingItems,
      items: item.children,
      parentItem: nextParentItem,
      needReplaced: true,
    })
  }
  return treeData
}
