import { ConditionTreeItem, NextPath } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'

export const insertItems = ({
  path = [],
  items = [],
  siblingItems = [],
  treeData = [],
  parentItem,
  needReplaced = false,
}: {
  treeData: ConditionTreeItem[]
  path: NextPath
  parentItem: ConditionTreeItem
  items?: ConditionTreeItem[]
  siblingItems?: ConditionTreeItem[]
  needReplaced?: boolean
}) => {
  if (path.length <= 1) {
    return treeData
  }
  if (items.length === 0) {
    return treeData
  }
  const currentIndex = path[path.length - 1]
  const parentPath = path.slice(0, path.length - 1)
  const parentIndex = parentPath[parentPath.length - 1]
  const insertIndex = currentIndex - parentIndex
  if (needReplaced) {
    siblingItems.splice(insertIndex - 1, 1, ...(items || []))
  } else {
    siblingItems.splice(insertIndex, 0, ...(items || []))
  }
  return changeNodeAtPath({
    treeData,
    path: parentPath,
    newNode: {
      ...parentItem,
      children: siblingItems,
    },
    getNodeKey: data => data.treeIndex,
  }) as ConditionTreeItem[]
}
