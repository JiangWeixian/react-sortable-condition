import React from 'react'
import { Select } from 'antd'

const children: any[] = []
for (let i = 10; i < 36; i++) {
  children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>)
}

export const PatternSelector = () => {
  return (
    <div
      style={{
        height: '70px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        <Select defaultValue="lucy" style={{ width: 120, marginRight: '8px' }}>
          <Select.Option value="jack">Jack</Select.Option>
          <Select.Option value="lucy">Lucy</Select.Option>
          <Select.Option value="disabled" disabled>
            Disabled
          </Select.Option>
          <Select.Option value="Yiminghe">yiminghe</Select.Option>
        </Select>
        <Select defaultValue="eqaul" style={{ width: 120 }}>
          <Select.Option value="eqaul">=</Select.Option>
          <Select.Option value="no-eqaul">!=</Select.Option>
        </Select>
      </div>
      <Select
        mode="tags"
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        style={{ width: '100%' }}
      >
        {children}
      </Select>
    </div>
  )
}
