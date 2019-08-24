import { ConditionTreeItem } from '../typings'

export const isDragNormal = (node: ConditionTreeItem = {} as ConditionTreeItem): boolean => {
  return node.type === 'normal'
}
