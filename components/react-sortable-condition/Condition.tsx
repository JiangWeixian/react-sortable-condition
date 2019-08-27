import React, { useContext } from 'react'
import cx from 'classnames'
import isNull from 'lodash.isnull'

import { NextPath, ConditionType, CustomConditionConfigs, ConditionItem } from './typings'
import { ConfigContext } from './ConfigContext'
import styles from './style/SortableCondition.styl'
import { DataContext } from './DataContext'
import { isForbiddenConvert } from './utils/rules'

export type Props = {
  type?: ConditionType
  path?: NextPath
  node: ConditionItem
}

export const Condition = (props: Props) => {
  const configs = useContext(ConfigContext).condition
  const globalConfigs = useContext(ConfigContext).global
  const { treeData, dispatch } = useContext(DataContext)
  const handleChangeConditionType = () => {
    const nextType: ConditionType = props.type === 'and' ? 'or' : 'and'
    dispatch({
      type: 'CHANGE_TYPE',
      payload: { path: props.path || [], type: nextType, node: props.node },
    })
    if (configs.onType) {
      configs.onType(props.node, props.path || [], { type: nextType })
    }
  }
  const handleAddCondition = () => {
    dispatch({ type: 'ADD', payload: { path: props.path || [], globalConfigs, node: props.node } })
    if (configs.onAdd) {
      configs.onAdd(props.node, props.path || [])
    }
  }
  const handleDeleteCondition = () => {
    dispatch({
      type: 'DELETE',
      payload: { path: props.path || [], globalConfigs, node: props.node },
    })
    if (configs.onDelete) {
      configs.onDelete(props.node, props.path || [])
    }
  }
  const handleConvertCondition = () => {
    dispatch({
      type: 'CONVERT',
      payload: { path: props.path || [], node: props.node },
    })
    if (configs.onConvert) {
      configs.onConvert(props.node, props.path || [])
    }
  }
  const isNoConvertIcon =
    isForbiddenConvert({ treeData, path: props.path, globalConfigs }) || isNull(configs.convertIcon)
  return (
    <div
      data-role="condition-item"
      className={cx(configs.className, styles.item, styles.condition)}
    >
      <div data-role="content" onClick={handleChangeConditionType} className={styles.content}>
        <p>{props.type}</p>
      </div>
      <div data-role="btns" className={styles.btns}>
        {isNoConvertIcon ? null : (
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
        {isNull(configs.deleteIcon) ? null : (
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
