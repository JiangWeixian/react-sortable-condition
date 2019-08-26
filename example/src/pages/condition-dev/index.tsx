import React from 'react'
import SortableCondition from '../../../../components/react-sortable-condition/index'
import { ConfigCondition } from '../../../../components/react-sortable-condition/Condition'
import { ConfigPattern } from '../../../../components/react-sortable-condition/Pattern'
import { ConditionTreeItem } from '../../../../components/react-sortable-condition/typings'

const data: ConditionTreeItem[] = [
  {
    title: 'root',
    type: 'and',
    expanded: true,
    children: [
      {
        title: 'and1',
        type: 'and',
        children: [{ title: 'Egg', type: 'normal', patterns: { a: 2 } }],
      },
      {
        title: 'and2',
        type: 'and',
        expanded: true,
        children: [
          { title: 'Sharks1', type: 'normal', patterns: { a: 2 } },
          { title: 'Sharks2', type: 'normal', patterns: { a: 2 } },
        ],
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
  return (
    <SortableCondition
      dataSource={data}
      onChange={v => console.log('change', v)}
      onDragState={v => console.log('drag', v)}
      onVisible={v => console.log('visible', v)}
      onMoveNode={v => console.log('move', v)}
    >
      <ConfigCondition
        onAdd={() => console.log('add')}
        onClick={() => 'click'}
        onDelete={() => console.log('delelte')}
      />
      <ConfigPattern>
        <TestPattern />
      </ConfigPattern>
    </SortableCondition>
  )
}

export default Condition
