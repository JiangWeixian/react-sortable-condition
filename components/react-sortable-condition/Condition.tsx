import React, { useCallback, useContext } from 'react'
import cx from 'classnames'
import isNull from 'lodash.isnull'

import { NextPath, ConditionType, CustomConditionConfigs } from './typings'
import { ConfigContext } from './ConfigContext'
import styles from './style/SortableCondition.styl'
import { DataContext } from './DataContext'

export type Props = {
  type?: ConditionType
  path?: NextPath
}

export const Condition = (props: Props) => {
  const configs = useContext(ConfigContext).condition
  const globalConfigs = useContext(ConfigContext).global
  const { treeData, dispatch } = useContext(DataContext)
  console.log(treeData, dispatch)
  const handleChangeConditionType = useCallback(() => {
    const nextType: ConditionType = props.type === 'and' ? 'or' : 'and'
    dispatch({ type: 'CHANGE_TYPE', payload: { path: props.path || [], type: nextType } })
    if (configs.onType) {
      configs.onType(props.path || [], { type: nextType })
    }
  }, [props.type || 'and', props.path, dispatch, configs.onType])
  const handleAddCondition = useCallback(() => {
    dispatch({ type: 'ADD', payload: { path: props.path || [], globalConfigs } })
    if (configs.onAdd) {
      configs.onAdd(props.path || [])
    }
  }, [props.path, dispatch, configs.onAdd, globalConfigs])
  const handleDeleteCondition = useCallback(() => {
    dispatch({ type: 'DELETE', payload: { path: props.path || [], globalConfigs } })
    if (configs.onDelete) {
      configs.onDelete(props.path || [])
    }
  }, [props.path, dispatch, configs.onDelete, globalConfigs])
  const handleConvertCondition = useCallback(() => {
    if (!configs.conditionOnConvert) {
      return
    }
    configs.conditionOnConvert(props.path || [])
  }, [props.path, configs.conditionOnConvert])
  const isRoot = props.path && props.path.length === 1 && props.path[0] === 0
  return (
    <div
      data-role="condition-item"
      className={cx(configs.className, styles.item, styles.condition)}
    >
      <div data-role="content" onClick={handleChangeConditionType} className={styles.content}>
        <p>{props.type}</p>
      </div>
      <div data-role="btns" className={styles.btns}>
        {isRoot || isNull(configs.convertIcon) ? null : (
          <a data-role="convert-btn" className={styles.btn} onClick={handleConvertCondition}>
            {configs.convertIcon ? (
              configs.convertIcon
            ) : (
              <span className={styles.btn_content}>T</span>
            )}
          </a>
        )}
        {isNull(configs.addIcon) ? null : (
          <a data-role="add-btn" className={styles.btn} onClick={handleAddCondition}>
            {configs.addIcon ? configs.addIcon : <span className={styles.btn_content}>+</span>}
          </a>
        )}
        {isNull(configs.deleteIcon) || isRoot ? null : (
          <a data-role="delete-btn" className={styles.btn} onClick={handleDeleteCondition}>
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

export type ConditionProps = CustomConditionConfigs

export const ConfigCondition = (props: ConditionProps) => {
  return <span>{props}</span>
}

ConfigCondition.displayName = 'Condition'
