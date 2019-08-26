import React, { useCallback } from 'react'
import cx from 'classnames'
import isNull from 'lodash.isnull'

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
  const handleDeletePattern = useCallback(() => {
    if (!props.patternOnDelete) {
      return
    }
    props.patternOnDelete(props.path || [])
    if (props.onDelete) {
      props.onDelete(props.path || [])
    }
  }, [props.path])
  const handleConvert = useCallback(() => {
    if (!props.patternOnConvert) {
      return
    }
    console.log('convert')
    props.patternOnConvert(props.path || [])
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
    <div data-role="pattern-item" className={cx(styles.pattern, styles.item, props.className)}>
      <div data-role="content" onClick={props.onClick} className={styles.content}>
        <p>{PatterComponent}</p>
      </div>
      <div data-role="btns" className={styles.btns}>
        <a data-role="convert-btn" className={styles.btn} onClick={handleConvert}>
          <span className={styles.btn_content}>T</span>
        </a>
        {isNull(props.addIcon) ? null : (
          <a data-role="add-btn" className={styles.btn} onClick={handleAddPattern}>
            {props.addIcon ? props.addIcon : <span className={styles.btn_content}>+</span>}
          </a>
        )}
        {isNull(props.deleteIcon) ? null : (
          <a data-role="delete-btn" className={styles.btn} onClick={handleDeletePattern}>
            {props.deleteIcon ? props.deleteIcon : <span className={styles.btn_content}>-</span>}
          </a>
        )}
      </div>
    </div>
  )
}

export type PatternProps = ConfigPatternProps

export const ConfigPattern = (props: PatternProps) => {
  return <span>{props}</span>
}

ConfigPattern.displayName = 'Pattern'
