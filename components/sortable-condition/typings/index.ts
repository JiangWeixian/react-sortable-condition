import {
  TreeItem,
  OnDragStateChangedData,
  NodeData,
  FullTree,
  OnMovePreviousAndNextLocation,
  OnVisibilityToggleData,
  ExtendedNodeData,
} from 'react-sortable-tree'

export interface ConditionDataItem<T = any> extends TreeItem {
  type: ConditionType
  title?: undefined
  subtitle?: undefined
  children: (ConditionDataItem<T> | PatternDataItem<T>)[]
}

export interface PatternDataItem<T = any> extends TreeItem {
  type: NormalType
  title?: undefined
  subtitle?: undefined
  children?: undefined
  patterns?: T
}

export type DataItem<T = any> = ConditionDataItem<T> | PatternDataItem<T>

export interface ConditionItem<T = any> extends TreeItem {
  type: ConditionType
  subtitle?: undefined
  children: (ConditionItem<T> | PatternItem<T>)[]
}

export interface PatternItem<T = any> extends TreeItem {
  type: NormalType
  children?: undefined
  subtitle?: undefined
  patterns?: T
}

export type ConditionTreeItem<T = any> = ConditionItem<T> | PatternItem<T>

export type Validation = [boolean | undefined, string]

export type CanDragNodeData<T = any> = ExtendedNodeData & {
  node: ConditionTreeItem<T>
  parentNode: ConditionItem<T> | null
}

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
  prevPath: number[]
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

export type ConditionTypeChangeCallback<T> = (
  node: ConditionItem<T>,
  path: NextPath,
  value: { type: ConditionType },
) => void
export type ConditionConvertCallback<T> = (node: ConditionItem<T>, path: NextPath) => void
export type PatternConvertCallback<T> = (node: PatternItem<T>, path: NextPath) => void
export type PatternCountCallback<T = any> = (node: PatternItem<T>, path: NextPath) => void
export type ConditionCallback<T = any> = (node: ConditionItem<T>, path: NextPath) => void
export type PatternChangeCallback<T> = (path: NextPath, value: { patterns?: T }) => void
export type IconSets = {
  addIcon?: React.ReactNode | null
  deleteIcon?: React.ReactNode | null
  convertIcon?: React.ReactNode | null
}

export type CustomConditionConfigs<T = any> = {
  onAdd?: ConditionCallback<T>
  onDelete?: ConditionCallback<T>
  onType?: ConditionTypeChangeCallback<T>
  onConvert?: ConditionConvertCallback<T>
  className?: string
  rowHeight?: number
} & IconSets

export type ConditionConfigs = CustomConditionConfigs

export type CustomPatternConfigs<T = any> = {
  onAdd?: PatternCountCallback<T>
  onDelete?: PatternCountCallback<T>
  onConvert?: PatternConvertCallback<T>
  children?: React.ReactNode
  className?: string
  rowHeight?: number
} & IconSets

export type PatternConfigs = CustomPatternConfigs & {
  component: React.ReactNode
}

export type GlobalConfigs = {
  maxDepth?: number
}

export type Configs = {
  global: GlobalConfigs
  pattern: PatternConfigs
  condition: ConditionConfigs
}

export type RowInfo = {
  index: number
  node: ConditionTreeItem
  path: NextPath
  treeIndex: number
}

export type Action<T = any> =
  | { type: 'RESET'; payload: ConditionTreeItem<T>[] }
  | {
      type: 'CHANGE_TYPE'
      payload: { type: ConditionType; path: NextPath; node: ConditionItem<T> }
    }
  | {
      type: 'ADD'
      payload: { path: NextPath; node: ConditionTreeItem<T> }
    }
  | {
      type: 'DELETE'
      payload: { path: NextPath; node: ConditionTreeItem<T> }
    }
  | { type: 'CHANGE_PATTERN'; payload: { path: NextPath; patterns: T; node: PatternItem<T> } }
  | {
      type: 'CONVERT'
      payload: { path: NextPath; node: ConditionTreeItem<T> }
    }
  | { type: 'CHANGE_VISIABLE'; payload: ConditionTreeItem<T>[] }
  | {
      type: 'MOVE'
      payload: {
        item: ConditionTreeItem<T>
        prevPath?: NextPath
        parentItem: ConditionTreeItem<T> | null
        treeData?: ConditionTreeItem<T>[]
        siblingItems?: ConditionTreeItem<T>[]
        path?: NextPath
      }
    }
