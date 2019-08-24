import React, { useState } from 'react'
import SortableTree, { TreeItem } from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app

const SortableCondition = () => {
  const [treeData, setTreeData] = useState<TreeItem[]>([
    { title: 'Chicken', children: [{ title: 'Egg' }] },
    { title: 'Zoo', children: [{ title: 'Sharks1' }, { title: 'Sharks2' }] },
  ])
  return (
    <div style={{ height: 400 }}>
      <SortableTree treeData={treeData} onChange={treeData => setTreeData(treeData)} />
    </div>
  )
}

export default SortableCondition
