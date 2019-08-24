import { ConditionTreeItem, ConditionItem, NextPath } from '../typings'

const getParentItem = (
  treeData: ConditionTreeItem[] = [],
  nextPaths: NextPath = [],
): null | ConditionItem => {
  let parentItem = null
  if (nextPaths.length <= 1) {
    return parentItem
  }
  const paths = nextPaths.slice(0, nextPaths.length - 1)
  let currentTreeData = treeData
  paths.forEach((p: number) => {
    parentItem = currentTreeData[p]
    currentTreeData = parentItem.children || []
  })
  return parentItem
}

export const getSiblingItems = (treeData: ConditionTreeItem[] = [], nextPaths: NextPath = []) => {
  if (nextPaths.length <= 1) {
    return null
  }
  const parentItem = getParentItem(treeData, nextPaths)
  if (!parentItem) {
    return null
  }
  if (!parentItem.children) {
    return null
  }
  const path = nextPaths[nextPaths.length - 1]
  const prevPath = path - 1
  const nextPath = path + 1
  return prevPath < 0
    ? [parentItem.children[nextPath]]
    : [parentItem.children[prevPath], parentItem.children[nextPath]]
}
