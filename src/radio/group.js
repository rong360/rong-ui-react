import React, {forwardRef, memo, useCallback, useEffect, useState} from 'react'
import Radio from './radio'
import { classNames } from '../_util/assist'
import { Provider } from './groupContext'

const prefixCls = 'r-radio-group'

const RadioGroup = forwardRef((props, ref) => {
  let {children, options=[], className, style, ...restProps} = props
  let [value, setValue] = useState(restProps.value || '') 

  console.log('radio group mounted or update')

  useEffect(() => {
    if ('value' in restProps) {
      setValue(restProps.value || '')
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
      <Radio
        key={option.value.toString()}
        disabled={'disabled' in option ? option.disabled : restProps.disabled}
        value={option.value}
        name={option.name}
        checked={value === option.value}
        onChange={option.onChange}
        style={option.style}
        className={option.className}
      >
        {option.label}
      </Radio>
    ))
  }

  let onChange = useCallback((e) => {
    let newValue = e.target.value
    if (!('value' in props)) {
      setValue(newValue)
    }
    restProps.onChange&&restProps.onChange(e)
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
    props.className,
    {
      [`${prefixCls}-button`]: props.optionType === 'button'
    }
  ])
  
  return <div className={wrapCls} style={style}>
    <Provider value={context}>
      {children}
    </Provider>
  </div>
})

RadioGroup.displayName = 'RadioGroup'

export default memo(RadioGroup)