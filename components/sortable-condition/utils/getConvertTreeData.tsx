import React from 'react'

import { ConditionTreeItem, NextPath, ConditionNodeData } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'
import { Condition } from '../Condition'
import { insertItems } from './insertItems'
import { getParentItem } from './getParentItem'
import { createPattern } from './factory'

export const getConvertTreedata = ({
  treeData = [],
  path = [],
  item,
}: {
  treeData?: ConditionTreeItem[]
  path?: NextPath
  item?: ConditionTreeItem
}): ConditionTreeItem[] => {
  const parentItem = getParentItem(treeData, path)
  if (!item) {
    return treeData
  }
  if (item.type === 'normal') {
    const nextTreeData = changeNodeAtPath({
      treeData,
      path,
      getNodeKey: data => data.treeIndex,
      newNode: {
        type: 'and',
        title: (props: ConditionNodeData) => (
          <Condition node={props.node} type={props.node.type} path={props.path} />
        ),
        children: [
          createPattern({
            expanded: false,
          }),
        ],
      },
    }) as ConditionTreeItem[]
    return nextTreeData
  }
  if (item.type === 'and' || item.type === 'or') {
    return insertItems({
      treeData,
      path,
      siblingItems: [],
      items: item.children,
      parentItem: parentItem as ConditionTreeItem,
    })
  }
  return treeData
}
