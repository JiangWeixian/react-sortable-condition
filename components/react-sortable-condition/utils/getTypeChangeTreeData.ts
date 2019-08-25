import { ConditionTreeItem, NextPath, ConditionType } from '../typings'
import { getNodeAtPath, changeNodeAtPath } from 'react-sortable-tree'

export const getTypeChangeTreeData = ({
  treeData = [],
  path = [],
  value = { type: 'and' },
}: {
  treeData: ConditionTreeItem[]
  path: NextPath
  value: { type: ConditionType }
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
