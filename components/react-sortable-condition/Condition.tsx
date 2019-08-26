import React, { useCallback } from 'react'

import { NextPath, ConditionType, ConfigConditionProps, ConditionConfigs } from './typings'
import styles from './style/SortableCondition.styl'

export type Props = ConditionConfigs & {
  type?: ConditionType
  path?: NextPath
}

export const Condition = (props: Props) => {
  const handleChangeConditionType = useCallback(() => {
    if (!props.conditionTypeOnChange) {
      return
    }
    const nextType: ConditionType = props.type === 'and' ? 'or' : 'and'
    props.conditionTypeOnChange(props.path || [], { type: nextType })
    if (props.onType) {
      props.onType(props.path || [], { type: nextType })
    }
  }, [props.type || 'and', props.path])
  const handleAddCondition = useCallback(() => {
    if (!props.conditionOnAdd) {
      return
    }
    props.conditionOnAdd(props.path || [])
    if (props.onAdd) {
      props.onAdd(props.path || [])
    }
  }, [props.path])
  const handleReduceCondition = useCallback(() => {
    if (!props.conditionOnReduce) {
      return
    }
    if (props.onDelete) {
      props.onDelete(props.path || [])
    }
    props.conditionOnReduce(props.path || [])
  }, [props.path])
  return (
    <div data-role="condition-item" className={styles.condition}>
      <div data-role="content" onClick={handleChangeConditionType}>
        <p>{props.type}</p>
      </div>
      <div data-role="btns" className={styles.btns}>
        <a data-role="add-btn" className={styles.btn} onClick={handleAddCondition}>
          +
        </a>
        <a data-role="reduce-btn" className={styles.btn} onClick={handleReduceCondition}>
          -
        </a>
      </div>
    </div>
  )
}

export type ConditionProps = ConfigConditionProps

export const ConfigCondition = (props: ConditionProps) => {
  return <span>{props}</span>
}

ConfigCondition.displayName = 'Condition'
