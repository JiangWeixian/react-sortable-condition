import React from 'react'
import SortableCondition from '../../../../components/react-sortable-condition/index'
import { ConfigCondition } from '../../../../components/react-sortable-condition/Condition'
import { ConfigPattern } from '../../../../components/react-sortable-condition/Pattern'

const TestPattern = ({ patterns }: { patterns?: any }) => {
  console.log('patterns', patterns)
  return <span>1</span>
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
