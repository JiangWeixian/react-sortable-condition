import React from 'react'

import { ConditionTreeItem, NextPath } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'
import { Condition } from '../Condition'
import { isAllNormalItems } from './isAllNormalItems'

export const getDrageTreedata = ({
  item,
  title = 'and',
  treeData = [],
  siblingItems = [],
  path = [],
}: {
  item: ConditionTreeItem
  title?: 'and' | 'or'
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
  return treeData
}
