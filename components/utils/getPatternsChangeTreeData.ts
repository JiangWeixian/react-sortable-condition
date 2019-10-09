import { ConditionTreeItem, NextPath } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'

export const getPatternsChangeTreeData = ({
  treeData = [],
  path = [],
  value = { patterns: undefined },
  item,
}: {
  treeData: ConditionTreeItem[]
  path: NextPath
  value: {
    patterns?: any
  }
  item?: ConditionTreeItem
}) => {
  if (!item) {
    return treeData
  }
  const nextTreeData = changeNodeAtPath({
    treeData,
    path,
    getNodeKey: data => data.treeIndex,
    newNode: {
      ...item,
      ...value,
    },
  }) as ConditionTreeItem[]
  return nextTreeData
}
