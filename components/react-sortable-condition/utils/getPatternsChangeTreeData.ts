import { ConditionTreeItem, NextPath } from '../typings'
import { getNodeAtPath, changeNodeAtPath } from 'react-sortable-tree'

export const getPatternsChangeTreeData = ({
  treeData = [],
  path = [],
  value = { patterns: {} },
}: {
  treeData: ConditionTreeItem[]
  path: NextPath
  value: {
    patterns: any
  }
}) => {
  const item = getNodeAtPath({
    treeData,
    path,
    getNodeKey: data => data.treeIndex,
  })
  if (!item) {
    return treeData
  }
  const nextTreeData = changeNodeAtPath({
    treeData,
    path,
    getNodeKey: data => data.treeIndex,
    newNode: {
      ...item.node,
      ...value,
    },
  }) as ConditionTreeItem[]
  return nextTreeData
}
