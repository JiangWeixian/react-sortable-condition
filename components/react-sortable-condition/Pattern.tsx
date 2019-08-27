import React, { useContext } from 'react'
import cx from 'classnames'
import isNull from 'lodash.isnull'

import { NextPath, NormalType, CustomPatternConfigs, PatternItem } from './typings'
import styles from './style/SortableCondition.styl'
import { ConfigContext } from './ConfigContext'
import { DataContext } from './DataContext'

type Props<T = any> = {
  path?: NextPath
  type: NormalType
  node: PatternItem
  patterns?: T
}

export const Pattern = (props: Props) => {
  const configs = useContext(ConfigContext).pattern
  const globalConfigs = useContext(ConfigContext).global
  const { treeData, dispatch } = useContext(DataContext)
  const handleAddPattern = () => {
    dispatch({ type: 'ADD', payload: { path: props.path || [], globalConfigs, node: props.node } })
    if (configs.onAdd) {
      configs.onAdd(props.path || [])
    }
  }
  const handleDeletePattern = () => {
    dispatch({
      type: 'DELETE',
      payload: { path: props.path || [], globalConfigs, node: props.node },
    })
    if (configs.onDelete) {
      configs.onDelete(props.path || [])
    }
  }
  const handleConvert = () => {
    dispatch({
      type: 'CONVERT',
      payload: { path: props.path || [], globalConfigs, node: props.node },
    })
  }
  const PatterComponent =
    configs.component && React.isValidElement(configs.component)
      ? React.cloneElement(configs.component, {
          patterns: props.patterns,
          onChange: ({ patterns }: { patterns: any }) => {
            dispatch({
              type: 'CHANGE_PATTERN',
              payload: { path: props.path || [], patterns, node: props.node },
            })
          },
        })
      : 'this is pattern'
  return (
    <div data-role="pattern-item" className={cx(styles.pattern, styles.item, configs.className)}>
      <div data-role="content" onClick={configs.onClick} className={styles.content}>
        <p>{PatterComponent}</p>
      </div>
      <div data-role="btns" className={styles.btns}>
        {isNull(configs.convertIcon) ? null : (
          <a data-role="convert-btn" className={styles.btn} onClick={handleConvert}>
            {configs.convertIcon ? (
              configs.convertIcon
            ) : (
              <span className={styles.btn_content}>T</span>
            )}
          </a>
        )}
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
