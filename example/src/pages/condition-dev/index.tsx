import React from 'react'

import SortableCondition from '../../../../components/react-sortable-condition'
import { ConfigCondition } from '../../../../components/react-sortable-condition/Condition'
import { ConfigPattern } from '../../../../components/react-sortable-condition/Pattern'
import { DataItem } from '../../../../components/react-sortable-condition/typings'
import { useTreeData } from '../../../../components/react-sortable-condition/useTreeData'

const data: DataItem[] = [
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

const TestPattern = ({ patterns, onChange }: { patterns?: any; onChange?: Function }) => {
  console.log('patterns', patterns)
  const handleClick = () => {
    console.log('clicked')
    if (onChange) {
      onChange({ patterns: 2 })
    }
  }
  return <span onClick={handleClick}>1</span>
}

const Condition = () => {
  const { treeData } = useTreeData({ initialTreeData: data })
  return (
    <div style={{ height: '400px' }}>
      <SortableCondition
        dataSource={treeData}
        onChange={v => console.log('change', v)}
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
        <ConfigPattern>
          <TestPattern />
        </ConfigPattern>
      </SortableCondition>
    </div>
  )
}

export default Condition
