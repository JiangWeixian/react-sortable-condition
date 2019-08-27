import { ConditionTreeItem, NextPath, GlobalConfigs } from '../typings'
import { getParentItem } from './getParentItem'

import memoize from 'lodash.memoize'
import { getNodeAtPath, getDepth } from 'react-sortable-tree'

export const isMaxDepthForbidden = (
  treeData: ConditionTreeItem[] = [],
  maxDepth?: number,
  path: NextPath = [],
) => {
  if (!maxDepth) {
    return false
  }
  const root = getNodeAtPath({
    path: [0],
    treeData,
    getNodeKey: data => data.treeIndex,
  })
  if (!root) {
    return false
  }
  const currentDepth = getDepth(root.node, 0)
  return path.length >= currentDepth && currentDepth >= maxDepth
}

export const isForbiddenConvert = memoize(
  ({
    treeData = [],
    path = [],
    globalConfigs,
  }: {
    treeData?: ConditionTreeItem[]
    path?: NextPath
    globalConfigs: GlobalConfigs
  }) => {
    const isRoot = path && path.length === 1 && path[0] === 0
    // can't convert root
    if (isRoot) {
      return true
    }
    const parentItem = getParentItem(treeData, path)
    // can't convert item.children > 1
    if (parentItem && parentItem.children && parentItem.children.length !== 1) {
      return true
    }
    // cant convert depper than maxDepath
    if (
      globalConfigs.maxDepth &&
      globalConfigs.maxDepth > 0 &&
      isMaxDepthForbidden(treeData, globalConfigs.maxDepth - 1, path)
    ) {
      return true
    }
    return false
  },
)
