import { TreeItem } from 'react-sortable-tree'

export interface ConditionItem extends TreeItem {
  type: 'and' | 'or'
  children?: (ConditionItem | NormalItem)[]
}

export interface NormalItem extends TreeItem {
  type: 'normal'
  children?: undefined
}

export type ConditionTreeItem = ConditionItem | NormalItem

export type Validation = [boolean | undefined, string]
