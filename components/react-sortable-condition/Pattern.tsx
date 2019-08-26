import React, { useCallback } from 'react'

import { ConfigPatternProps, NextPath, PatternConfigs, NormalType } from './typings'
import styles from './style/SortableCondition.styl'

type Props<T = any> = Omit<PatternConfigs, 'defaultPattern'> & {
  path?: NextPath
  type: NormalType
  patterns?: T
}

export const Pattern = (props: Props) => {
  const handleAddPattern = useCallback(() => {
    if (!props.patternOnAdd) {
      return
    }
    props.patternOnAdd(props.path || [])
    if (props.onAdd) {
      props.onAdd(props.path || [])
    }
  }, [props.path])
  const handleReducePattern = useCallback(() => {
    if (!props.patternOnReduce) {
      return
    }
    props.patternOnReduce(props.path || [])
    if (props.onDelete) {
      props.onDelete(props.path || [])
    }
  }, [props.path])
  const PatterComponent =
    props.component && React.isValidElement(props.component)
      ? React.cloneElement(props.component, {
          patterns: props.patterns,
          onChange: ({ patterns }: { patterns: any }) => {
            if (props.patternOnChange) {
              props.patternOnChange(props.path || [], { patterns })
            }
          },
        })
      : 'this is pattern'
  return (
    <div data-role="pattern-item" className={styles.pattern}>
      <div data-role="content" onClick={props.onClick}>
        <p>{PatterComponent}</p>
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

ConfigPattern.displayName = 'Pattern'
