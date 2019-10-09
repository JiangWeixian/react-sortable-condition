import { ConditionTreeItem, NextPath, ConditionType } from '../typings'
import { changeNodeAtPath } from 'react-sortable-tree'

export const getTypeChangeTreeData = ({
  treeData = [],
  path = [],
  value = { type: 'and' },
  item,
}: {
  treeData: ConditionTreeItem[]
  path: NextPath
  item?: ConditionTreeItem
  value: { type: ConditionType }
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
