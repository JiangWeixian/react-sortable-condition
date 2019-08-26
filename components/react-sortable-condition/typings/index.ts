import {
  TreeItem,
  OnDragStateChangedData,
  NodeData,
  FullTree,
  OnMovePreviousAndNextLocation,
  OnVisibilityToggleData,
} from 'react-sortable-tree'

export interface ConditionItem<T = any> extends TreeItem {
  type: ConditionType
  children?: (ConditionItem<T> | PatternItem<T>)[]
}

export interface PatternItem<T = any> extends TreeItem {
  type: NormalType
  children?: undefined
  patterns: T
}

export type ConditionTreeItem<T = any> = ConditionItem<T> | PatternItem<T>

export type Validation = [boolean | undefined, string]

export type VisibilityStateData<T = any> = OnVisibilityToggleData & {
  treeData: ConditionTreeItem<T>[]
}

export type DragStateData<T = any> = {
  draggedNode: ConditionTreeItem<T>
} & OnDragStateChangedData

export type MoveStateData<T = any> = {
  nextParentNode: ConditionTreeItem<T> | null
  treeData: ConditionTreeItem<T>[]
  node: ConditionTreeItem<T>
  nextPath: number[]
} & NodeData &
  FullTree &
  OnMovePreviousAndNextLocation

export type NextPath = number[]

export type ConditionNodeData<T = any> = NodeData & {
  node: ConditionItem<T>
  path: NextPath
}

export type PatternNodeData<T = any> = NodeData & {
  node: PatternItem<T>
  path: NextPath
}

export type ConditionType = 'and' | 'or'

export type NormalType = 'normal'

export type ConditionTypeChangeCallback = (path: NextPath, value: { type: ConditionType }) => void
export type CountCallback = (path: NextPath) => void

export type ConfigConditionProps = {
  onClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
  onAdd?: CountCallback
  onDelete?: CountCallback
}

export type ConditionConfigs = ConfigConditionProps & {
  conditionTypeOnChange?: ConditionTypeChangeCallback
  conditionOnAdd?: CountCallback
  conditionOnReduce?: CountCallback
}

export type ConfigPatternProps = {
  onClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
  onAdd?: CountCallback
  onDelete?: CountCallback
  defaultPattern: React.ReactNode
  children?: React.ReactNode
}

export type PatternConfigs = ConfigPatternProps & {
  patternOnAdd?: CountCallback
  patternOnReduce?: CountCallback
}
