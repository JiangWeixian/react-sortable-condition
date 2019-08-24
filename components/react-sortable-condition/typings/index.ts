import {
  TreeItem,
  OnDragStateChangedData,
  NodeData,
  FullTree,
  OnMovePreviousAndNextLocation,
} from 'react-sortable-tree'

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

export type DragStateData = {
  draggedNode: ConditionTreeItem
} & OnDragStateChangedData

export type MoveStateData = {
  nextParentNode: ConditionTreeItem | null
  treeData: ConditionTreeItem[]
  node: ConditionTreeItem
} & NodeData &
  FullTree &
  OnMovePreviousAndNextLocation

export type NextPath = number[]
