import React from 'react'

import SortableCondition from '../../../../components'
import { DataItem } from '../../../../components/typings'

const data: DataItem[] = [
  {
    type: 'and',
    expanded: true,
    children: [{ type: 'normal', patterns: { a: 2 } }, { type: 'normal', patterns: { a: 2 } }],
  },
]

const TestPattern = ({ patterns, onChange }: { patterns?: any; onChange?: Function }) => {
  console.log('patterns', patterns)
  const handleClick = () => {
    console.log('clicked')
    if (onChange) {
      onChange({ patterns: 2 })
    }
  }
  return <span onClick={handleClick}>{typeof patterns === 'number' ? patterns : 1}</span>
}

const Condition = () => {
  const { treeData, dispatch } = SortableCondition.useTreeData({ initialTreeData: data })
  return (
    <div style={{ height: '400px' }}>
      <SortableCondition
        dataSource={treeData}
        onChange={v => {
          console.log('change', v)
          dispatch({ type: 'RESET', payload: v })
        }}
        onDragState={v => console.log('drag', v)}
        onVisible={v => console.log('visible', v)}
        onMoveNode={v => console.log('move', v)}
        maxDepth={3}
      >
        <SortableCondition.Condition
          onAdd={() => console.log('add')}
          onDelete={() => console.log('delelte')}
          // addIcon={<Icon type="plus-circle" />}
          // deleteIcon={<Icon type="close-circle" />}
        />
        <SortableCondition.Pattern>
          <TestPattern />
        </SortableCondition.Pattern>
      </SortableCondition>
    </div>
  )
}

export default Condition
