import React, { useCallback } from 'react'

import { PatternItem, ConfigPatternProps, NextPath, PatternConfigs, NormalType } from './typings'
import styles from './style/SortableCondition.styl'

type Props = Omit<PatternConfigs, 'defaultPattern'> & {
  value: PatternItem
  path?: NextPath
  type: NormalType
}

export const Pattern = (props: Props) => {
  const handleAddPattern = useCallback(() => {
    if (!props.patternOnAdd) {
      return
    }
    props.patternOnAdd(props.path || [])
  }, [props.path])
  const handleReducePattern = useCallback(() => {
    if (!props.patternOnReduce) {
      return
    }
    props.patternOnReduce(props.path || [])
  }, [props.path])
  return (
    <div data-role="pattern-item" className={styles.pattern}>
      <div data-role="content" onClick={props.onClick}>
        <p>{props.value.title}</p>
        {props.value.subtitle ? <p>{props.value.subtitle}</p> : null}
      </div>
      <div data-role="btns" className={styles.btns}>
        <a data-role="add-btn" className={styles.btn} onClick={handleAddPattern}>
          +
        </a>
        <a data-role="reduce-btn" className={styles.btn} onClick={handleReducePattern}>
          -
        </a>
      </div>
    </div>
  )
}

export type PatternProps = ConfigPatternProps

export const ConfigPattern = (props: PatternProps) => {
  return <span>{props}</span>
}
