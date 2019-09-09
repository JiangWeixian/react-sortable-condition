import {
  ConditionTreeItem,
  NextPath,
  GlobalConfigs,
  CanDragNodeData,
  CanDropNodeData,
} from '../typings'
import { getParentItem } from './getParentItem'

import { getNodeAtPath, getDepth } from 'react-sortable-tree'
import { isAllNormalItems } from './isAllNormalItems'

export const isMaxDepthForbidden = (
  treeData: ConditionTreeItem[] = [],
  maxDepth?: number,
  path: NextPath = [],
  actionType: 'convert' | 'count' = 'count',
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
  return actionType === 'convert'
    ? path.length > currentDepth && currentDepth >= maxDepth
    : currentDepth >= maxDepth
}

export const isForbiddenConvert = ({
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
    isMaxDepthForbidden(treeData, globalConfigs.maxDepth - 1, path, 'convert')
  ) {
    return true
  }
  return false
}

export const isForbiddenCount = ({
  path = [],
  treeData = [],
  globalConfigs,
}: {
  path?: NextPath
  treeData: ConditionTreeItem[]
  globalConfigs: GlobalConfigs
}) => {
  // can't delete root
  if ((path && path.length === 1 && path[0] === 0) || treeData.length === 0) {
    // only add icon in root will improve depth
    // cant add node make treeData depper than maxDepath
    if (
      globalConfigs.maxDepth &&
      globalConfigs.maxDepth > 0 &&
      isMaxDepthForbidden(treeData, globalConfigs.maxDepth - 1, path)
    ) {
      return { add: true, delete: true }
    }
    return { add: false, delete: true }
  }
  const parentItem = getParentItem(treeData, path)
  // children can't less than 1
  const forbiddenDelete = parentItem && parentItem.children && parentItem.children.length <= 1
  return { add: false, delete: forbiddenDelete }
}

export const isCanDrag = (info: CanDragNodeData) => {
  // only drag item.children > 1
  if (info.parentNode && info.parentNode.children && info.parentNode.children.length === 1) {
    return false
  }
  return true
}

export const isCanDrop = (data: CanDropNodeData) => {
  // can't drop node into parentitem
  if (data.nextParent && data.nextParent.type === 'normal') {
    return false
  }
  // can't spread condition.all-condition-chidlren
  if (data.node.type !== 'normal' && data.node.children && !isAllNormalItems(data.node.children)) {
    return false
  }
  return true
}
