import { ConditionTreeItem } from '../typings'

export const isAllConditionItems = (items: ConditionTreeItem[] = []) => {
  return items.every(item => item.type === 'and' || item.type === 'or')
}
