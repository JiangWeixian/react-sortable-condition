import React from 'react'

import { ConditionTreeItem, NextPath, ConditionNodeData, GlobalConfigs } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'
import { Condition } from '../Condition'
import { insertItems } from './insertItems'
import { getParentItem } from './getParentItem'
import { createPattern } from './factory'
import { isMaxDepthForbidden } from './isGlobalForbidden'

/**
 * convert action is after drag. silibingitems will only be
 * - all normal
 * - all condition
 * is only work in parentItem.singleChildren
 * @param param parentItem
 */
const isForbiddenConvert = (parentItem?: ConditionTreeItem | null) => {
  if (!parentItem) {
    return true
  }
  if (parentItem.children && parentItem.children.length !== 1) {
    return true
  }
  return false
}

export const getConvertTreedata = ({
  treeData = [],
  path = [],
  globalConfigs = {},
  item,
}: {
  treeData?: ConditionTreeItem[]
  path?: NextPath
  globalConfigs: GlobalConfigs
  item?: ConditionTreeItem
}): ConditionTreeItem[] => {
  const parentItem = getParentItem(treeData, path)
  if (isForbiddenConvert(parentItem)) {
    return treeData
  }
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
    if (isMaxDepthForbidden(nextTreeData, globalConfigs.maxDepth)) {
      return treeData
    }
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
