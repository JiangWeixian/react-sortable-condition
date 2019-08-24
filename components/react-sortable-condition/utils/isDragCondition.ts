import { ConditionTreeItem } from '../typings'

export const isAllNormalItems = (nodes: ConditionTreeItem[]): boolean => {
  if (!nodes) {
    return true
  }
  if (!Array.isArray(nodes)) {
    return false
  }
  return false
}

export const isDragCondition = (node: ConditionTreeItem): boolean => {
  if (!node) {
    return false
  }
  return node.type === 'and' || node.type === 'or'
}
