import React from 'react'

import { ConditionTreeItem, NextPath } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'
import { Condition } from '../Condition'
import { isAllNormalItems } from './isAllNormalItems'
import { isAllConditionItems } from './isAllConditionItems'

export const getDrageTreedata = ({
  item,
  parentItem,
  title = 'and',
  prevTreeData = [],
  treeData = [],
  siblingItems = [],
  path = [],
}: {
  item: ConditionTreeItem
  parentItem: ConditionTreeItem | null
  title?: 'and' | 'or'
  prevTreeData?: ConditionTreeItem[]
  treeData?: ConditionTreeItem[]
  siblingItems?: ConditionTreeItem[]
  path?: NextPath
}) => {
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
        title: <Condition value={{ ...item, title, type: 'and' }} />,
        children: [item],
      },
    })
  }
  if (item.type === 'and' || item.type === 'or') {
    if (isAllConditionItems(siblingItems)) {
      return treeData
    }
    if (!isAllNormalItems(item.children)) {
      return prevTreeData
    }
    if (!parentItem) {
      return
    }
    const currentIndex = path[path.length - 1]
    const parentPath = path.slice(0, path.length - 1)
    const parentIndex = parentPath[parentPath.length - 1]
    const insertIndex = currentIndex - parentIndex
    siblingItems.splice(insertIndex, 0, ...(item.children || []))
    siblingItems.splice(insertIndex - 1, 1)
    return changeNodeAtPath({
      treeData,
      path: parentPath,
      newNode: {
        ...parentItem,
        children: siblingItems,
      },
      getNodeKey: data => data.treeIndex,
    })
  }
  return treeData
}
