import React, { useCallback, useContext } from 'react'
import cx from 'classnames'
import isNull from 'lodash.isnull'

import { NextPath, NormalType, CustomPatternConfigs } from './typings'
import styles from './style/SortableCondition.styl'
import { ConfigContext } from './ConfigContext'

type Props<T = any> = {
  path?: NextPath
  type: NormalType
  patterns?: T
}

export const Pattern = (props: Props) => {
  const configs = useContext(ConfigContext).pattern
  const handleAddPattern = useCallback(() => {
    if (!configs.patternOnAdd) {
      return
    }
    configs.patternOnAdd(props.path || [])
    if (configs.onAdd) {
      configs.onAdd(props.path || [])
    }
  }, [props.path, configs.patternOnAdd])
  const handleDeletePattern = useCallback(() => {
    if (!configs.patternOnDelete) {
      return
    }
    configs.patternOnDelete(props.path || [])
    if (configs.onDelete) {
      configs.onDelete(props.path || [])
    }
  }, [props.path, configs.patternOnDelete])
  const handleConvert = useCallback(() => {
    if (!configs.patternOnConvert) {
      return
    }
    configs.patternOnConvert(props.path || [])
  }, [props.path, configs.patternOnConvert])
  const PatterComponent =
    configs.component && React.isValidElement(configs.component)
      ? React.cloneElement(configs.component, {
          patterns: props.patterns,
          onChange: ({ patterns }: { patterns: any }) => {
            if (configs.patternOnChange) {
              configs.patternOnChange(props.path || [], { patterns })
            }
          },
        })
      : 'this is pattern'
  return (
    <div data-role="pattern-item" className={cx(styles.pattern, styles.item, configs.className)}>
      <div data-role="content" onClick={configs.onClick} className={styles.content}>
        <p>{PatterComponent}</p>
      </div>
      <div data-role="btns" className={styles.btns}>
        <a data-role="convert-btn" className={styles.btn} onClick={handleConvert}>
          <span className={styles.btn_content}>T</span>
        </a>
        {isNull(configs.addIcon) ? null : (
          <a data-role="add-btn" className={styles.btn} onClick={handleAddPattern}>
            {configs.addIcon ? configs.addIcon : <span className={styles.btn_content}>+</span>}
          </a>
        )}
        {isNull(configs.deleteIcon) ? null : (
          <a data-role="delete-btn" className={styles.btn} onClick={handleDeletePattern}>
            {configs.deleteIcon ? (
              configs.deleteIcon
            ) : (
              <span className={styles.btn_content}>-</span>
            )}
          </a>
        )}
      </div>
    </div>
  )
}

export type PatternProps = CustomPatternConfigs

export const ConfigPattern = (props: PatternProps) => {
  return <span>{props}</span>
}

ConfigPattern.displayName = 'Pattern'
