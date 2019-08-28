import { ConditionTreeItem, NextPath } from '../typings'
import { getNodeAtPath } from 'react-sortable-tree'

export const getParentItem = (
  treeData: ConditionTreeItem[],
  path: NextPath,
): ConditionTreeItem | null => {
  if (path.length <= 1) {
    return null
  }
  const parentPath = path.slice(0, path.length - 1)
  const parentItem = getNodeAtPath({
    treeData,
    path: parentPath,
    getNodeKey: data => data.treeIndex,
  })
  return parentItem ? (parentItem.node as ConditionTreeItem) : null
}
