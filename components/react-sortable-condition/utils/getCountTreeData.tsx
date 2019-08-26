import React from 'react'
import {
  NextPath,
  ConditionTreeItem,
  ConditionConfigs,
  ConditionNodeData,
  ConditionItem,
  PatternItem,
  PatternNodeData,
  PatternConfigs,
} from '../typings'
import { getNodeAtPath, removeNodeAtPath } from 'react-sortable-tree'
import { insertItems } from './insertItems'
import { Condition } from '../Condition'
import { Pattern } from '../Pattern'

const isForbiddenCount = ({
  path = [],
  type = 'add',
  treeData,
}: {
  path: NextPath
  type: 'add' | 'reduce'
  treeData: ConditionTreeItem[]
}) => {
  if (path.length === 0 || treeData.length === 0) {
    return true
  }
  if (path.length <= 1 && type === 'reduce') {
    return true
  }
  return false
}

const getParentItem = (treeData: ConditionTreeItem[], path: NextPath): ConditionTreeItem | null => {
  if (path.length <= 1) {
    return null
  }
  const parentPath = path.slice(0, path.length - 1)
  const parentItem = getNodeAtPath({
    treeData,
    path: parentPath,
    getNodeKey: data => data.treeIndex,
  })
  return parentItem ? (parentItem.node as ConditionTreeItem) : null
}

export const getCountTreeData = ({
  path = [],
  treeData = [],
  conditionConfigs = {},
  type = 'add',
  patternConfigs,
}: {
  path: NextPath
  treeData: ConditionTreeItem[]
  conditionConfigs?: ConditionConfigs
  patternConfigs: PatternConfigs
  type?: 'add' | 'reduce'
}) => {
  if (isForbiddenCount({ path, treeData, type })) {
    return treeData
  }
  const parentItem = getParentItem(treeData, path)
  // handle click root item
  if (!parentItem) {
    const child: ConditionTreeItem[] = [
      {
        type: 'and',
        title: (props: ConditionNodeData) => (
          <Condition {...conditionConfigs} path={props.path} type={props.node.type} />
        ),
        expanded: true,
      },
    ]
    return [
      {
        type: 'and',
        title: (props: ConditionNodeData) => (
          <Condition {...conditionConfigs} path={props.path} type={props.node.type} />
        ),
        children: child.concat(treeData),
        expanded: true,
      },
    ] as ConditionTreeItem[]
  }
  const item = getNodeAtPath({
    treeData,
    path,
    getNodeKey: data => data.treeIndex,
  })
  if (!item) {
    return treeData
  }
  // handle condition
  if (item.node.type === 'and' || item.node.type === 'or') {
    if (type === 'add') {
      const items: ConditionItem[] = [
        {
          type: 'and',
          title: (props: ConditionNodeData) => (
            <Condition {...conditionConfigs} path={props.path} type={props.node.type} />
          ),
          children: undefined,
        },
      ]
      return insertItems({
        treeData,
        path,
        items,
        parentItem,
        siblingItems: parentItem.children,
        offset: -1,
      })
    } else {
      return removeNodeAtPath({
        treeData,
        path,
        getNodeKey: data => data.treeIndex,
      }) as ConditionTreeItem[]
    }
    // handle pattern
  } else if (item.node.type === 'normal') {
    if (type === 'add') {
      const items: PatternItem[] = [
        {
          type: 'normal',
          title: (props: PatternNodeData) => (
            <Pattern
              {...patternConfigs}
              path={props.path}
              type="normal"
              patterns={props.node.patterns}
            />
          ),
          patterns: {},
          children: undefined,
        },
      ]
      return insertItems({
        treeData,
        path,
        items,
        parentItem,
        siblingItems: parentItem.children,
        offset: -1,
      })
    } else {
      return removeNodeAtPath({
        treeData,
        path,
        getNodeKey: data => data.treeIndex,
      }) as PatternItem[]
    }
  }
  return treeData
}
