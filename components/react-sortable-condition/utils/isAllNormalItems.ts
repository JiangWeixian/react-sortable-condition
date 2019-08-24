import { ConditionTreeItem } from '../typings'

export const isAllNormalItems = (items: ConditionTreeItem[] = []) => {
  return items.every(item => item.type === 'normal')
}
