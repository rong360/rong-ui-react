import React from 'react'
import PropTypes from 'prop-types'
import { setDefaultProps, classNames } from '../_util/assist'

const prefixCls = 'r-button'

class Button extends React.PureComponent {
  get wrapCls () {
    const { type, radius, fill, className } = this.props
    return classNames([
      prefixCls,
      `${prefixCls}-${type}`,
      className,
      {
        [`${prefixCls}-radius`]: radius,
        [`${prefixCls}-${type}-empty`]: !fill
      }
    ])
  }
  render () {
    const { children, onClick, style } = this.props
    console.log('button mounted or update')
    return <div className={this.wrapCls} style={style} onClick={onClick}>
      {children}
    </div>
  }
}

setDefaultProps(Button, {
  type: {
    type: PropTypes.string,
    default: 'default'
  },
  radius: {
    type: PropTypes.bool,
    default: false
  },
  fill: {
    type: PropTypes.bool,
    default: true
  },
  style: {
    type: PropTypes.object
  },
  className: {
    type: PropTypes.string
  },
  onClick: {
    type: PropTypes.func
  }
})

export default Button