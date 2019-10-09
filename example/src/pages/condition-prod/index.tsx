import React from 'react'

import SortableCondition from 'react-sortable-condition'
import 'react-sortable-condition/themes/antd.styl'

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
    <div style={{ height: '400px' }}>
      <SortableCondition
        defaultDataSource={data}
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
        <SortableCondition.Pattern>
          <TestPattern />
        </SortableCondition.Pattern>
      </SortableCondition>
    </div>
  )
}

export default Condition
