import React from 'react'

import { ConditionTreeItem, NextPath, ConditionNodeData, ConditionConfigs } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'
import { Condition } from '../Condition'
import { isAllNormalItems } from './isAllNormalItems'
import { isAllConditionItems } from './isAllConditionItems'
import { insertItems } from './insertItems'

const isForbiddenConvert = () => {
  // item.children should be same type as siblingitems
}

export const getConvertTreedata = ({
  item,
  parentItem,
  prevTreeData = [],
  treeData = [],
  siblingItems = [],
  path = [],
  conditionConfigs = {},
}: {
  item: ConditionTreeItem
  parentItem: ConditionTreeItem | null
  prevTreeData: ConditionTreeItem[]
  treeData?: ConditionTreeItem[]
  siblingItems?: ConditionTreeItem[]
  path?: NextPath
  conditionConfigs: ConditionConfigs
}): ConditionTreeItem[] => {
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
