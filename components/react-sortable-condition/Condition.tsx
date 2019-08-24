import React from 'react'

import { ConditionItem } from './typings'
import styles from './style/SortableCondition.styl'

type Props = {
  onClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
  onAdd?: Function
  onDelete?: Function
  value: ConditionItem
}

export const Condition = (props: Props) => {
  return (
    <div data-role="and-condition-item" className={styles.and}>
      <div data-role="content" onClick={props.onClick}>
        <p>{props.value.title ? props.value.title : props.value.type}</p>
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

export type ConditionProps = Omit<Props, 'value'>

export const ConfigCondition = (props: ConditionProps) => {
  return <span>{props}</span>
}
