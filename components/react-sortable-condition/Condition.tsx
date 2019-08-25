import React, { useCallback } from 'react'

import { ConditionItem, NextPath, ConditionType, ConditionTypeChangeCallback } from './typings'
import styles from './style/SortableCondition.styl'

type Props = {
  onClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
  onAdd?: Function
  onDelete?: Function
  value: ConditionItem
  path?: NextPath
  type: ConditionType
  onChange?: ConditionTypeChangeCallback
}

export const Condition = (props: Props) => {
  const handleChangeConditionType = useCallback(() => {
    if (!props.onChange) {
      return
    }
    const nextType: ConditionType = props.type === 'and' ? 'or' : 'and'
    props.onChange(props.path || [], { type: nextType })
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

export type ConditionProps = Omit<Props, 'value' | 'type' | 'onChange' | 'path'>

export const ConfigCondition = (props: ConditionProps) => {
  return <span>{props}</span>
}
