import React from 'react'
import PropTypes from 'prop-types'
import AsyncValidator from 'async-validator'
import { setDefaultProps, classNames } from '../_util/assist'
import { Consumer } from '../form/formContext'

const prefixCls = 'r-select3'

class Select3 extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      prePropsValue: props.value,
      validateState: '',
      validateMessage: ''
    }
    // 不需要驱动视图更新的数据放这里
    this._state = {
      initialValue: '',
      isMounted: false
    }
    this.selectWrapRef = React.createRef()
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.value !== prevState.prePropsValue) {
      return {
        value: nextProps.value,
        prePropsValue: nextProps.value
      }
    }
    return null
  }
  render () {
    return <Consumer>
      {(context) => {
        this.form = context
        console.log('Select3 mounted or updated')
        const { title, prepend, append, data } = this.props
        const { validateMessage } = this.state
        return (
          <div className={this.wrapCls} ref={this.selectWrapRef}>
            <div className={this.innerCls}>
              <label className={this.labelCls} style={this.labelStyle}>{title}</label>
              {prepend && <div className={this.prependCls}>
                {prepend}
              </div>}
              <div className={this.contentCls}>
                {
                  data.map(item => <div key={item.value} className={classNames([this.selectOptionCls, {active: this.state.value === item.value}])} onClick={(e) => this.onSelect(e, item)}>
                    {item.text}
                  </div>)
                }
              </div>
              {append && <div className={this.appendCls}>
                {append}
              </div>}
            </div>
            {this.selectedOption.children && this.selectedOption.children.length && <div className={this.wrapChildrenCls}>
              {
                this.selectedOption.children.map((item, index) => {
                  return <item.component {...item} data-index={index} item={item} key={item.name} />
                })
              }
            </div>}
            {this.showErrorMsg && <div className={this.errorCls}>
              {validateMessage}
            </div>}
          </div>
        )
      }}
    </Consumer>
  }
  componentDidMount () {
    this.form && this.form._state.fields.push(this)
    this._state.initialValue = this.state.value
    this._state.isMounted = true
    this.$el = this.selectWrapRef.current
  }
  componentWillUnmount () {
    this.form && this.form._state.fields.splice(this.form._state.fields.indexOf(this), 1)
    this._state.isMounted = false
  }
  get wrapCls () {
    const { value } = this.state
    const { labelPosition, textPosition, mode, className, readonly } = this.props
    const _labelPosition = labelPosition || (this.form && this.form.props.labelPosition) || 'left'
    const _textPosition = textPosition || (this.form && this.form.props.textPosition) || 'left'
    const _mode = mode || (this.form && this.form.props.mode) || 'default'
    return classNames([
      this.form && 'form-item',
      prefixCls,
      `${prefixCls}-label-${_labelPosition}`,
      `${prefixCls}-text-${_textPosition}`,
      `${prefixCls}-mode-${_mode}`,
      className,
      {
        [`${prefixCls}-empty`]: value === '',
        [`${prefixCls}-error`]: this.showErrorMsg,
        [`${prefixCls}-required`]: this.isRequired,
        [`${prefixCls}-readonly`]: !!readonly
      }
    ])
  }
  get innerCls () {
    return `${prefixCls}-inner`
  }
  get wrapChildrenCls () {
    return `${prefixCls}-children`
  }
  get labelCls () {
    return `${prefixCls}-label`
  }
  get labelStyle () {
    let style = {}
    if (this.labelWidth || this.labelWidth === 0) {
      style.width = this.labelWidth
    } else if (this.form && (this.form.props.labelWidth || this.form.props.labelWidth === 0)) {
      style.width = this.form.props.labelWidth
    }
    return style
  }
  get prependCls () {
    return `${prefixCls}-prepend`
  }
  get appendCls () {
    return `${prefixCls}-append`
  }
  get selectedOption () {
    let { data } = this.props
    let { value } = this.state
    let selectedOption = {}
    for (var i = 0; i < data.length; i++) {
      if (data[i].value === value) {
        selectedOption = data[i]
        break
      }
    }
    return selectedOption
  }
  get contentCls () {
    return `${prefixCls}-content`
  }
  get selectCls () {
    return `${prefixCls}-select`
  }
  get selectOptionCls () {
    return `${prefixCls}-select-option`
  }
  get errorCls () {
    return `${prefixCls}-error-tip`
  }
  get fieldRules () {
    const { title, rules } = this.props
    let defaultRules = [{ required: true, message: `${title}不能为空` }]
    return [].concat(rules ? rules : defaultRules)
  }
  get isRequired () {
    if (this.props.required === false) {
      return false
    }
    return this.fieldRules.some(item => item.required === true)
  }
  get showErrorMsg () {
    return this.state.validateState === 'error' &&
      (this.form ? this.form.props.showMessage && this.props.showMessage : this.props.showMessage)
  }
  onSelect (e, item) {
    const {readonly, disabled} = this.props
    if (readonly || disabled) return
    this.setValue(item.value, function() {}, {event: e, from: 'select'})
  }
  getFilterRules (trigger) {
    return this.fieldRules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
  }
  validate (trigger, callback = function () { }) {
    const { value } = this.state
    const { initialValue } = this._state
    const { name, title } = this.props
    const rules = this.getFilterRules(trigger)
    const isInitialValue = this.isRequired && value!=='' && initialValue === value

    if (!this.isRequired || isInitialValue) {
      callback()
      return true
    }

    const prop = name || title || 'prop'
    const descriptor = {}
    descriptor[prop] = rules
    const validator = new AsyncValidator(descriptor)
    const model = {}
    model[prop] = value
    validator.validate(model, { first: true, suppressWarning: true, component: this }).then(() => {
      this.setState({ validateState: 'success', validateMessage: '' })
      callback('')
    }).catch(({ errors, fields }) => {
      const errMsg = errors[0].message || ''
      this.setState({ validateState: 'error', validateMessage: errMsg })
      callback(errMsg)
    });
  }
  resetField () {
    this.setState({ validateState: '', validateMessage: '' })
    this.setValue(this._state.initialValue, null, {from: 'reset'})
  }
  /* 获取表单数据 */
  getValue () {
    return { name: this.props.name, value: this.state.value }
  }
  setValue (value, callback, options = {}) {
    const opts = Object.assign({ event: null, component: this, value: value }, options)
    const { from } = options

    this._state.isMounted && this.setState({ value: value }, () => {
      this.props.onChange(opts)
      this.form && this.form.onChange(opts)
      callback && callback.call(this)
      if (from === 'select') {
        this.validate('blur')
      }
    })
  }
}

setDefaultProps(Select3, {
  title: {
    type: PropTypes.string
  },
  value: {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    default: ''
  },
  disabled: {
    type: PropTypes.oneOf(['disabled', 1, 0, true, false])
  },
  readonly: {
    type: PropTypes.oneOf(['readonly', 1, 0, true, false])
  },
  labelPosition: {
    type: PropTypes.oneOf(['left', 'right', 'top'])
  },
  labelWidth: {
    type: PropTypes.string
  },
  textPosition: {
    type: PropTypes.oneOf(['left', 'center', 'right'])
  },
  data: {
    type: PropTypes.array,
    default: []
  },
  // 是否显示校验错误信息
  showMessage: {
    type: PropTypes.bool,
    default: true
  },
  // 校验规则
  rules: {
    type: PropTypes.array
  },
  required: {
    type: PropTypes.bool
  },
  onChange: {
    type: PropTypes.func,
    default: () => { }
  },
  mode: {
    type: PropTypes.string
  }
})

export default Select3