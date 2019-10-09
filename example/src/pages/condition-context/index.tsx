import React, { createContext, useContext } from 'react'

import SortableCondition from '../../../../components'
import { ConditionTreeItem, Action, DataItem } from '../../../../components/typings'

const data: any[] = [
  {
    type: 'and',
    expanded: true,
    children: [
      {
        type: 'and',
        children: [{ type: 'normal', patterns: { a: 2 } }],
      },
      {
        type: 'and',
        expanded: true,
        children: [{ type: 'normal', patterns: { a: 2 } }, { type: 'normal', patterns: { a: 2 } }],
      },
    ],
  },
]

const ReactSortableConditionContext = createContext<{
  treeData: ConditionTreeItem<any>[]
  dispatch: React.Dispatch<Action<any>>
}>({ treeData: [], dispatch: () => {} })

const ReactSortableConditionProvider = (props: { children?: React.ReactNode }) => {
  const { treeData, dispatch } = SortableCondition.useTreeData({ initialTreeData: data })
  return (
    <ReactSortableConditionContext.Provider value={{ treeData, dispatch }}>
      {props.children}
    </ReactSortableConditionContext.Provider>
  )
}

const ExtraButton = () => {
  const { dispatch, treeData } = useContext(ReactSortableConditionContext)
  const newData: DataItem[] = [
    {
      type: 'and',
      expanded: true,
      children: [
        {
          type: 'and',
          children: [{ type: 'normal', patterns: { a: 2 } }],
        },
        {
          type: 'and',
          expanded: true,
          children: [
            { type: 'normal', patterns: { a: 2 } },
            { type: 'normal', patterns: { a: 2 } },
          ],
        },
        {
          type: 'and',
          expanded: true,
          children: [
            { type: 'normal', patterns: { a: 2 } },
            { type: 'normal', patterns: { a: 2 } },
          ],
        },
      ],
    },
  ]
  return (
    <a
      onClick={() => {
        dispatch && dispatch({ type: 'INIT', payload: newData })
      }}
    >
      改变
    </a>
  )
}

const TestPattern = ({ patterns, onChange }: { patterns?: any; onChange?: Function }) => {
  const handleClick = () => {
    if (onChange) {
      onChange({ patterns: 2 })
    }
  }
  return <span onClick={handleClick}>1</span>
}

const Condition = () => {
  const { treeData, dispatch } = useContext(ReactSortableConditionContext)
  console.log('context', treeData)
  return (
    <div style={{ height: '400px' }}>
      <SortableCondition
        dataSource={treeData}
        onChange={v => {
          console.log('change', v)
          dispatch({ type: 'RESET', payload: v })
        }}
        onDragState={v => {
          console.log('drag', v)
        }}
        onVisible={v => console.log('visible', v)}
        onMoveNode={v => {
          console.log('move', v)
        }}
        maxDepth={3}
      >
        <SortableCondition.Condition
          onAdd={() => console.log('add')}
          onDelete={() => console.log('delelte')}
        />
        <SortableCondition.Pattern>
          <TestPattern />
        </SortableCondition.Pattern>
      </SortableCondition>
      <ExtraButton />
    </div>
  )
}

const Page = () => {
  return (
    <ReactSortableConditionProvider>
      <Condition />
    </ReactSortableConditionProvider>
  )
}

export default Page
