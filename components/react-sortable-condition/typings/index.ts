import {
  TreeItem,
  OnDragStateChangedData,
  NodeData,
  FullTree,
  OnMovePreviousAndNextLocation,
  OnVisibilityToggleData,
} from 'react-sortable-tree'

export interface ConditionItem extends TreeItem {
  type: ConditionType
  children?: (ConditionItem | NormalItem)[]
}

export interface NormalItem extends TreeItem {
  type: NormalType
  children?: undefined
}

export type ConditionTreeItem = ConditionItem | NormalItem

export type Validation = [boolean | undefined, string]

export type VisibilityStateData = OnVisibilityToggleData & {
  treeData: ConditionTreeItem[]
}

export type DragStateData = {
  draggedNode: ConditionTreeItem
} & OnDragStateChangedData

export type MoveStateData = {
  nextParentNode: ConditionTreeItem | null
  treeData: ConditionTreeItem[]
  node: ConditionTreeItem
  nextPath: number[]
} & NodeData &
  FullTree &
  OnMovePreviousAndNextLocation

export type NextPath = number[]

export type ConditionNodeData = NodeData & {
  node: ConditionItem
  path: NextPath
}

export type ConditionType = 'and' | 'or'

export type NormalType = 'normal'

export type ConditionTypeChangeCallback = (path: NextPath, value: { type: ConditionType }) => void
export type ConditionAddCallback = (path: NextPath) => void

export type ConfigConditionProps = {
  onClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
  onAdd?: Function
  onDelete?: Function
}

export type ConditionConfigs = ConfigConditionProps & {
  conditionTypeOnChange?: ConditionTypeChangeCallback
  conditionOnAdd?: ConditionAddCallback
  conditionOnReduce?: ConditionAddCallback
}
