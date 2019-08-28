import React from 'react'

import { ConditionTreeItem, NextPath, ConditionNodeData } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'
import { Condition } from '../Condition'
import { isAllNormalItems } from './isAllNormalItems'
import { isAllConditionItems } from './isAllConditionItems'
import { insertItems } from './insertItems'
import { getParentItem } from './getParentItem'

const isForbiddenDrag = (
  parentItem: ConditionTreeItem<any> | null,
  prevTreeData: ConditionTreeItem[],
  prevPath: NextPath = [],
): boolean => {
  if (!parentItem) {
    return true
  }
  // normal item children must be empty
  if (parentItem.type === 'normal') {
    return true
  }
  // item.children should >= 1
  const prevParentItem = getParentItem(prevTreeData, prevPath)
  if (prevParentItem && prevParentItem.children && prevParentItem.children.length === 1) {
    return true
  }
  return false
}

export const getDragTreedata = ({
  item,
  parentItem,
  prevTreeData = [],
  treeData = [],
  siblingItems = [],
  path = [],
  prevPath = [],
}: {
  item: ConditionTreeItem
  parentItem: ConditionTreeItem | null
  prevPath?: NextPath
  prevTreeData: ConditionTreeItem[]
  treeData?: ConditionTreeItem[]
  siblingItems?: ConditionTreeItem[]
  path?: NextPath
}): ConditionTreeItem[] => {
  if (isForbiddenDrag(parentItem, prevTreeData, prevPath)) {
    return prevTreeData
  }
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
    if (!isAllNormalItems(item.children)) {
      return prevTreeData
    }
    if (!parentItem) {
      return treeData
    }
    return insertItems({
      treeData,
      path,
      siblingItems,
      items: item.children,
      parentItem,
      needReplaced: true,
    })
  }
  return treeData
}
