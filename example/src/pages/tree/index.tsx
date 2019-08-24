import React, { Component } from 'react'
import SortableTree, { TreeItem } from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app

type State = {
  treeData: TreeItem
}

export default class Tree extends Component<{}, State> {
  state = {
    treeData: [
      { title: 'Chicken', children: [{ title: 'Egg' }] },
      { title: 'Zoo', children: [{ title: 'Sharks1' }, { title: 'Sharks2' }] },
    ],
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData as any}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    )
  }
}
