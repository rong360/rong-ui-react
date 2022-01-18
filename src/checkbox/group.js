import React, {forwardRef, memo, useCallback, useEffect, useState} from 'react'
import Checkbox from './checkbox'
import { classNames } from '../_util/assist'
import { Provider } from './groupContext'

const prefixCls = 'r-checkbox-group'

const CheckboxGroup = forwardRef((props, ref) => {
  let {children, options=[], className, style, ...restProps} = props
  let [value, setValue] = useState(restProps.value || []) 

  console.log('group mounted or update')

  useEffect(() => {
    if ('value' in restProps) {
      setValue(restProps.value || [])
    }
  }, [restProps.value]) // eslint-disable-line

  let getOptions = () => options.map(option => {
    if (typeof option === 'string') {
      return {
        label: option,
        value: option,
        style: {},
        disabled: false,
        onChange: () => {}
      }
    }
    return option
  })
 
  if (options.length) {
    children = getOptions().map(option => (
      <Checkbox
        key={option.value.toString()}
        disabled={'disabled' in option ? option.disabled : restProps.disabled}
        value={option.value}
        type={option.type}
        name={option.name}
        checked={value.indexOf(option.value) !== -1}
        onChange={option.onChange}
        style={option.style}
        className={option.className}
      >
        {option.label}
      </Checkbox>
    ))
  }

  let onChange = useCallback((e) => {
    let newValue = context.fields.filter(item => item.state.checked === true).map(item => item.props.value)
    if (!('value' in props)) {
      setValue(newValue)
    }
    restProps.onChange&&restProps.onChange(newValue, e)
  }, [])

  let context = React.useMemo(() => ({
    onChange,
    value,
    disabled: props.disabled,
    name: props.name,
    fields: []
  }), [value, props.disabled, props.name, onChange])

  let wrapCls = classNames([
    prefixCls,
    props.className
  ])
  
  return <div className={wrapCls} style={style}>
    <Provider value={context}>
      {children}
    </Provider>
  </div>
})

CheckboxGroup.displayName = 'CheckboxGroup'

export default memo(CheckboxGroup)