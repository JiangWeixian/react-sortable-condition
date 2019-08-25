import React, { useCallback } from 'react'

import {
  ConditionItem,
  NextPath,
  ConditionType,
  ConditionTypeChangeCallback,
  ConfigConditionProps,
} from './typings'
import styles from './style/SortableCondition.styl'

type Props = ConfigConditionProps & {
  value: ConditionItem
  path?: NextPath
  type: ConditionType
  onTypeChange?: ConditionTypeChangeCallback
}

export const Condition = (props: Props) => {
  const handleChangeConditionType = useCallback(() => {
    if (!props.onTypeChange) {
      return
    }
    const nextType: ConditionType = props.type === 'and' ? 'or' : 'and'
    props.onTypeChange(props.path || [], { type: nextType })
  }, [props.type || 'and', props.path])
  return (
    <div
      data-role="and-condition-item"
      className={styles.condition}
      onClick={handleChangeConditionType}
    >
      <div data-role="content" onClick={props.onClick}>
        <p>{props.type}</p>
        {props.value.subtitle ? <p>{props.value.subtitle}</p> : null}
      </div>
      <div data-role="btns" className={styles.btns}>
        <a data-role="add-btn" className={styles.btn}>
          +
        </a>
        <a data-role="reduce-btn" className={styles.btn}>
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
