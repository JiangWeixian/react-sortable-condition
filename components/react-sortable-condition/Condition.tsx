import React, { useCallback } from 'react'

import {
  ConditionItem,
  NextPath,
  ConditionType,
  ConfigConditionProps,
  ConditionConfigs,
} from './typings'
import styles from './style/SortableCondition.styl'

type Props = ConditionConfigs & {
  type?: ConditionType
  path?: NextPath
  value: ConditionItem
}

export const Condition = (props: Props) => {
  const handleChangeConditionType = useCallback(() => {
    if (!props.conditionTypeOnChange) {
      return
    }
    const nextType: ConditionType = props.type === 'and' ? 'or' : 'and'
    props.conditionTypeOnChange(props.path || [], { type: nextType })
  }, [props.type || 'and', props.path])
  const handleAddCondition = useCallback(() => {
    if (!props.conditionOnAdd) {
      return
    }
    props.conditionOnAdd(props.path || [])
  }, [props.path])
  return (
    <div data-role="and-condition-item" className={styles.condition}>
      <div data-role="content" onClick={handleChangeConditionType}>
        <p>{props.type}</p>
        {props.value.subtitle ? <p>{props.value.subtitle}</p> : null}
      </div>
      <div data-role="btns" className={styles.btns}>
        <a data-role="add-btn" className={styles.btn} onClick={handleAddCondition}>
          +
        </a>
        <a data-role="reduce-btn" className={styles.btn} onClick={() => props.onDelete!()}>
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
