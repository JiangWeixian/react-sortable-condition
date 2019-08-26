import React from 'react'
import SortableCondition from '../../../../components/react-sortable-condition/index'
import { ConfigCondition } from '../../../../components/react-sortable-condition/Condition'

const Condition = () => {
  return (
    <SortableCondition>
      <ConfigCondition
        onAdd={() => console.log('add')}
        onClick={() => 'click'}
        onDelete={() => console.log('delelte')}
      />
    </SortableCondition>
  )
}

export default Condition
