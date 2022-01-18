import React from 'react'
import { classNames } from '../../_util/assist'

const prefixCls = 'r-icon'

const Icon = ({children, className}) => {
  return <span className={classNames([prefixCls, className])}>
    {children}
  </span>
}

export default Icon