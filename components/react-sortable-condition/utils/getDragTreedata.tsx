import React from 'react'

import { ConditionTreeItem, NextPath, ConditionNodeData, ConditionConfigs } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'
import { Condition } from '../Condition'
import { isAllNormalItems } from './isAllNormalItems'
import { isAllConditionItems } from './isAllConditionItems'
import { insertItems } from './insertItems'

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
            conditionTypeOnChange={conditionConfigs.conditionTypeOnChange}
            conditionOnAdd={conditionConfigs.conditionOnAdd}
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
