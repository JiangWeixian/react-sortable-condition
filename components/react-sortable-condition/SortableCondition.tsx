import React, { useState } from 'react'
import SortableTree, { TreeItem } from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app

import { conditions2trees } from './utils/conditions2trees'

export const SortableCondition = () => {
  const [treeData, setTreeData] = useState<TreeItem[]>(
    conditions2trees([
      { type: 'and', children: [{ title: 'Egg', type: 'normal' }] },
      {
        type: 'and',
        children: [
          { title: 'Sharks1', type: 'normal', subtitle: 'sharks-sub' },
          { title: 'Sharks2', type: 'normal' },
        ],
      },
    ]),
  )
  console.log(treeData)
  return (
    <div style={{ height: 400 }}>
      <SortableTree treeData={treeData} onChange={treeData => setTreeData(treeData)} />
    </div>
  )
}
