import React from 'react'

import { NormalItem } from './typings'
import styles from './style/SortableCondition.styl'

type Props = {
  onClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
  onAdd?: Function
  onDelete?: Function
  value: NormalItem
}

export const Normal = (props: Props) => {
  return (
    <div data-role="and-normal-item" className={styles.and}>
      <div data-role="content" onClick={props.onClick}>
        <p>{props.value.title}</p>
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

export type NormalProps = Omit<Props, 'value'>

export const ConfigNormal = (props: NormalProps) => {
  return <span>{props}</span>
}
