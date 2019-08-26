import React from 'react'
import SortableCondition from '../../../../components/react-sortable-condition/index'
import { ConfigCondition } from '../../../../components/react-sortable-condition/Condition'
import { ConfigPattern } from '../../../../components/react-sortable-condition/Pattern'

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
    <SortableCondition>
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
