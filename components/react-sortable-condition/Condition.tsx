import React, { useCallback } from 'react'
import cx from 'classnames'
import isNull from 'lodash.isnull'

import { NextPath, ConditionType, ConfigConditionProps, ConditionConfigs } from './typings'
import styles from './style/SortableCondition.styl'

export type Props = ConditionConfigs & {
  type?: ConditionType
  path?: NextPath
}

export const Condition = (props: Props) => {
  const handleChangeConditionType = useCallback(() => {
    if (!props.conditionTypeOnChange) {
      return
    }
    const nextType: ConditionType = props.type === 'and' ? 'or' : 'and'
    props.conditionTypeOnChange(props.path || [], { type: nextType })
    if (props.onType) {
      props.onType(props.path || [], { type: nextType })
    }
  }, [props.type || 'and', props.path])
  const handleAddCondition = useCallback(() => {
    if (!props.conditionOnAdd) {
      return
    }
    props.conditionOnAdd(props.path || [])
    if (props.onAdd) {
      props.onAdd(props.path || [])
    }
  }, [props.path])
  const handleDeleteCondition = useCallback(() => {
    if (!props.conditionOnDelete) {
      return
    }
    if (props.onDelete) {
      props.onDelete(props.path || [])
    }
    props.conditionOnDelete(props.path || [])
  }, [props.path])
  const handleConvertCondition = useCallback(() => {
    if (!props.conditionOnConvert) {
      return
    }
    props.conditionOnConvert(props.path || [])
  }, [props.path])
  const isRoot = props.path && props.path.length === 1 && props.path[0] === 0
  return (
    <div data-role="condition-item" className={cx(props.className, styles.item, styles.condition)}>
      <div data-role="content" onClick={handleChangeConditionType} className={styles.content}>
        <p>{props.type}</p>
      </div>
      <div data-role="btns" className={styles.btns}>
        {isRoot ? null : (
          <a data-role="convert-btn" className={styles.btn} onClick={handleConvertCondition}>
            <span className={styles.btn_content}>T</span>
          </a>
        )}
        {isNull(props.addIcon) ? null : (
          <a data-role="add-btn" className={styles.btn} onClick={handleAddCondition}>
            {props.addIcon ? props.addIcon : <span className={styles.btn_content}>+</span>}
          </a>
        )}
        {isNull(props.deleteIcon) || isRoot ? null : (
          <a data-role="delete-btn" className={styles.btn} onClick={handleDeleteCondition}>
            {props.deleteIcon ? props.deleteIcon : <span className={styles.btn_content}>-</span>}
          </a>
        )}
      </div>
    </div>
  )
}

export type ConditionProps = ConfigConditionProps

export const ConfigCondition = (props: ConditionProps) => {
  return <span>{props}</span>
}

ConfigCondition.displayName = 'Condition'
