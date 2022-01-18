import React from 'react'
import RcCheckbox from '../rc-checkbox'
import Group from './group'
import { classNames } from '../_util/assist'
import { Consumer } from './groupContext'

const prefixCls = 'r-checkbox'

class Checkbox extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      checked: false
    }
  }
  get wrapCls () {
    let { className, disabled } = this.props
    return classNames([
      prefixCls,
      className,
      {
        [`${prefixCls}-checked`]: this.state.checked,
        [`${prefixCls}-required`]: disabled
      }
    ])
  }
  onRcCheckboxChange = (e) => {
    this.setState({ checked: e.target.checked }, () => {
      this.props.onChange && this.props.onChange(e)
      this.group && this.group.onChange(e)
    })
  }
  onRcCheckboxUpdated = (RcCheckbox) => {
    this.setState({checked: RcCheckbox.state.checked})
  }
  onRcCheckboxMounted = (RcCheckbox) => {
    this.setState({checked: RcCheckbox.state.checked})
  }
  componentDidMount () {
    this.group && this.group.fields.push(this)
  }
  render () {
    let { children, style, className, ...restProps } = this.props

    console.log('checkbox mounted or update')

    return <Consumer>
      {
        (context) => {
          this.group = context

          if (this.group) {
            restProps.checked = this.group.value.indexOf(this.props.value) !== -1
            restProps.name = restProps.name || this.group.name
            restProps.disabled = restProps.disabled || this.group.disabled
          }

          return <label className={this.wrapCls} style={style}>
            <RcCheckbox {...restProps} onChange={this.onRcCheckboxChange} onMounted={this.onRcCheckboxMounted} onUpdated={this.onRcCheckboxUpdated} />
            <span>{children}</span>
          </label>
        }
      }
    </Consumer>
  }
}


Checkbox.Group = Group

export default Checkbox