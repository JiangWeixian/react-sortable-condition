import React from 'react'

import { ConditionTreeItem, NextPath, ConditionNodeData, ConditionConfigs } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'
import { Condition } from '../Condition'
import { isAllNormalItems } from './isAllNormalItems'
import { isAllConditionItems } from './isAllConditionItems'

const isForbiddenDrag = (parentItem: ConditionTreeItem | null): boolean => {
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
  title = 'and',
  prevTreeData = [],
  treeData = [],
  siblingItems = [],
  path = [],
  conditionConfigs = {},
}: {
  item: ConditionTreeItem
  parentItem: ConditionTreeItem | null
  title?: 'and' | 'or'
  prevTreeData: ConditionTreeItem[]
  treeData?: ConditionTreeItem[]
  siblingItems?: ConditionTreeItem[]
  path?: NextPath
  conditionConfigs: ConditionConfigs
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
          <Condition
            value={{ title, type: 'and' }}
            type={props.node.type}
            path={props.path}
            onTypeChange={conditionConfigs.conditionTypeOnChange}
          />
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
    }) as ConditionTreeItem[]
  }
  return treeData
}