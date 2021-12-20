import React, { ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import classNames from 'classnames'


type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 是否禁用Input */
  disabled?: boolean
  /** 设置Input 大小，支持 lg 或者 sm */
  size?: InputSize
  /** 添加前缀，用于配置一些固定组合 */
  prepend?: string | ReactElement
  /** 添加后缀，用于配置一些固定组合 */
  append?: string | ReactElement
  /** 受控属性 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Input 输入框通过鼠标或键盘输入内容，是最基础的表单域的包装
 * 
 * ~~~js
 * import {Input} from 'component-library'
 * ~~~
 */
const Input: React.FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    prepend,
    append,
    style,
    ...restProps
  } = props

  const cnames = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={cnames} style={style}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      <input 
        className="input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="input-group-append">{append}</div>}
    </div>
  )
}

export default Input