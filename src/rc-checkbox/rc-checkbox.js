import React from 'react'
import PropTypes from 'prop-types'
import { setDefaultProps, classNames } from '../_util/assist'
import './style/rc-checkbox.less'

const prefixCls = 'rc-checkbox'

class RcCheckbox extends React.PureComponent {
  constructor (props) {
    super(props)

    const checked = 'checked' in props ? props.checked : props.defaultChecked

    this.state = {
      checked: checked
    }
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    if ('checked' in nextProps) {
      return {
        checked: nextProps.checked
      }
    }
    return null
  }
  get wrapCls () {
    const {className, disabled, type} = this.props
    const {checked} = this.state
    return classNames([
      prefixCls,
      className, 
      `${prefixCls}--${type}`,
      {
        [`${prefixCls}--${type}-checked`]: checked,
        [`${prefixCls}--${type}-disabled`]: disabled
      }
    ])
  }
  handleChange = (e) => {
    const { disabled, onChange } = this.props
    if (disabled) return
    if (!('checked' in this.props)) {
      this.setState({
        checked: e.target.checked
      })
    }
    onChange&&onChange({
      target: {
        ...this.props,
        checked: e.target.checked,
      },
      stopPropagation() {
        e.stopPropagation();
      },
      preventDefault() {
        e.preventDefault();
      },
      nativeEvent: e.nativeEvent,
      component: this
    })
  }
  saveInput = (node) => {
    this.input = node
  }
  componentDidMount () {
    this.props.onMounted && this.props.onMounted(this)
  }
  componentDidUpdate () {
    this.props.onUpdated && this.props.onUpdated(this)
  }
  render () {
    const {style, name, id, type, readOnly, disabled, value} = this.props
    let {checked} = this.state

    console.log('rc-checkbox mounted or updated')

    return <span className={this.wrapCls} style={style}>
      <input
        name={name}
        id={id}
        type={type}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        checked={checked}
        className={`${prefixCls}-input`}
        onChange={this.handleChange}
        ref = {this.saveInput}
      />
      <span className={`${prefixCls}-inner`} />
    </span>
  }
}

setDefaultProps(RcCheckbox, {
  className: {
    type: PropTypes.string
  },
  style: {
    type: PropTypes.object
  },
  type: {
    type: PropTypes.oneOf(['checkbox', 'radio']),
    default: 'checkbox'
  },
  defaultChecked: {
    type: PropTypes.bool,
    default: false
  },
  disabled: {
    type: PropTypes.bool,
    default: false
  },
  readOnly: {
    type: PropTypes.bool,
    default: false
  },
  onChange: {
    type: PropTypes.func
  },
  onMounted: {
    type: PropTypes.func
  },
  onUpdated: {
    type: PropTypes.func
  }
})

export default RcCheckbox