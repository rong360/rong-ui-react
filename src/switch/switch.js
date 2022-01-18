import React from 'react'
import { memo, useEffect, useState, useRef } from "react"
import PropTypes from 'prop-types'
import { setDefaultProps, classNames } from '../_util/assist'

const prefixCls = 'r-switch'

const Switch = ({ defaultChecked, disabled, checkedChildren, unCheckedChildren, onChange }) => {
  const [onOff, setOnOff] = useState(defaultChecked)
  const [maxLeft, setMaxLeft] = useState()

  const switchRef = useRef()
  const circleRef = useRef()

  console.log('Switch mounted or updated')

  useEffect(() => {
    setOnOff(defaultChecked)
  }, [defaultChecked])

  useEffect(() => {
    setMaxLeft(switchRef.current.offsetWidth - circleRef.current.offsetWidth - 3)
  }, [])

  const wrapCls = classNames([
    prefixCls,
    {
      [`${prefixCls}-checked`]: onOff
    }
  ])
  const innerCls = `${prefixCls}-inner`

  const circleStyle = {
    left: onOff ? maxLeft + 'px' : ''
  }

  const onSwitchClick = (e) => {
    if (disabled) return
    let tempOnOff = !onOff
    setOnOff(tempOnOff)
    onChange && onChange(tempOnOff, e)
  }

  return <div className={wrapCls} ref={switchRef} onClick={onSwitchClick}>
    <div className={innerCls}>
      <div className='open'>{checkedChildren}</div>
      <div className='close'>{unCheckedChildren}</div>
    </div>
    <div className='circle' ref={circleRef} style={circleStyle}></div>
  </div>
}

setDefaultProps(Switch, {
  defaultChecked: {
    type: PropTypes.bool,
    default: false
  },
  disabled: {
    type: PropTypes.bool
  },
  checkedChildren: {
    type: PropTypes.node
  },
  unCheckedChildren: {
    type: PropTypes.node
  },
  onChange: {
    type: PropTypes.func
  }
})

export default memo(Switch)