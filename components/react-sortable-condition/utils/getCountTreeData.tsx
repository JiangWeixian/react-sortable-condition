import React from 'react'
import {
  NextPath,
  ConditionTreeItem,
  ConditionNodeData,
  ConditionItem,
  PatternItem,
  GlobalConfigs,
} from '../typings'
import { getNodeAtPath, removeNodeAtPath } from 'react-sortable-tree'
import { insertItems } from './insertItems'
import { Condition } from '../Condition'
import { createPattern, createCondition } from './factory'
import { getParentItem } from './getParentItem'
import { isMaxDepthForbidden } from './isGlobalForbidden'

const isForbiddenCount = ({
  path = [],
  type = 'add',
  treeData,
}: {
  path: NextPath
  type: 'add' | 'reduce'
  treeData: ConditionTreeItem[]
}) => {
  if (path.length === 0 || treeData.length === 0) {
    return true
  }
  if (path.length <= 1 && type === 'reduce') {
    return true
  }
  return false
}

export const getCountTreeData = ({
  path = [],
  treeData = [],
  globalConfigs = {},
  type = 'add',
}: {
  path: NextPath
  treeData: ConditionTreeItem[]
  globalConfigs: GlobalConfigs
  type?: 'add' | 'reduce'
}) => {
  if (isForbiddenCount({ path, treeData, type })) {
    return treeData
  }
  const parentItem = getParentItem(treeData, path)
  // handle click root item
  if (!parentItem) {
    const child: ConditionTreeItem[] = [createCondition({})]
    return [
      {
        type: 'and',
        title: (props: ConditionNodeData) => <Condition path={props.path} type={props.node.type} />,
        children: child.concat(treeData),
        expanded: true,
      },
    ] as ConditionTreeItem[]
  }
  const item = getNodeAtPath({
    treeData,
    path,
    getNodeKey: data => data.treeIndex,
  })
  if (!item) {
    return treeData
  }
  // handle condition
  if (item.node.type === 'and' || item.node.type === 'or') {
    if (type === 'add') {
      const items: ConditionItem[] = [createCondition({})]
      const nextTreeData = insertItems({
        treeData,
        path,
        items,
        parentItem,
        siblingItems: parentItem.children,
        offset: -1,
      })
      if (isMaxDepthForbidden(nextTreeData, globalConfigs.maxDepth)) {
        return treeData
      }
      return nextTreeData
    } else {
      return removeNodeAtPath({
        treeData,
        path,
        getNodeKey: data => data.treeIndex,
      }) as ConditionTreeItem[]
    }
    // handle pattern
  } else if (item.node.type === 'normal') {
    if (type === 'add') {
      const items: PatternItem[] = [createPattern({})]
      return insertItems({
        treeData,
        path,
        items,
        parentItem,
        siblingItems: parentItem.children,
        offset: -1,
      })
    } else {
      return removeNodeAtPath({
        treeData,
        path,
        getNodeKey: data => data.treeIndex,
      }) as PatternItem[]
    }
  }
  return treeData
}
