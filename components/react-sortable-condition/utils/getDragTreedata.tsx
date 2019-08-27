import React from 'react'

import { ConditionTreeItem, NextPath, ConditionNodeData } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'
import { Condition } from '../Condition'
import { isAllNormalItems } from './isAllNormalItems'
import { isAllConditionItems } from './isAllConditionItems'
import { insertItems } from './insertItems'

const isForbiddenDrag = (parentItem: ConditionTreeItem<any> | null): boolean => {
  // normal item children must be empty
  if (!parentItem) {
    return true
  }
  if (parentItem.type === 'normal') {
    return true
  }
  return false
}

export const getDrageTreedata = ({
  item,
  parentItem,
  prevTreeData = [],
  treeData = [],
  siblingItems = [],
  path = [],
}: {
  item: ConditionTreeItem
  parentItem: ConditionTreeItem | null
  prevTreeData: ConditionTreeItem[]
  treeData?: ConditionTreeItem[]
  siblingItems?: ConditionTreeItem[]
  path?: NextPath
}): ConditionTreeItem[] => {
  if (isForbiddenDrag(parentItem)) {
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
