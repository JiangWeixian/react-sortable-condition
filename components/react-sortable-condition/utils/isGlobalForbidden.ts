import { getDepth, getNodeAtPath } from 'react-sortable-tree'
import { ConditionTreeItem } from '../typings'

/**
 * forbidden from <SortableCondition />
 *
 */

export const isMaxDepthForbidden = (treeData: ConditionTreeItem[] = [], maxDepth?: number) => {
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
  return currentDepth >= maxDepth
}
