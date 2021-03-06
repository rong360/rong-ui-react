import React from 'react'
import PropTypes from 'prop-types'
import AsyncValidator from 'async-validator'
import Modal from '../modal'
import { setDefaultProps, classNames } from '../_util/assist'
import { Consumer } from '../form/formContext'

const prefixCls = 'r-select2'

class Select2 extends React.PureComponent {
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
      picker: null,
      selectedIndex: -1,
      isMounted: false,
      lastScrollTop: -1
    }
    this.selectWrapRef = React.createRef()
    this.listRef = React.createRef()
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
        console.log('Select2 mounted or updated')
        const { title, prepend, append } = this.props
        const { validateMessage } = this.state
        return (
          <div className={this.wrapCls} ref={this.selectWrapRef}>
            <div className={this.innerCls}>
              <label className={this.labelCls} style={this.labelStyle}>{title}</label>
              {prepend && <div className={this.prependCls}>
                {prepend}
              </div>}
              <div className={this.contentCls} onClick={this.showPicker}>
                <div className={this.selectCls}>
                  {this.selectedOption.text || this.placeholderText}
                </div>
              </div>
              {append && <div className={this.appendCls}>
                {append}
              </div>}
              <div className={this.arrowCls}>
                <svg width="6px" height="10px" style={this.arrowStyle} viewBox="0 0 6 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-350.000000, -20.000000)" fill={this.arrowStyle.color || '#C8C7CC'}>
                      <g>
                        <g transform="translate(346.000000, 18.000000)">
                          <g transform="translate(7.000000, 7.000000) rotate(-270.000000) translate(-7.000000, -7.000000) translate(2.750000, 4.500000)">
                            <path d="M6.53188022,3.0259328 L3.02129527,6.5321515 C2.73046889,6.82261617 2.25894616,6.82261617 1.96811978,6.5321515 C1.67729341,6.24168683 1.67729341,5.77075056 1.96811978,5.48028589 L4.95211699,2.5 L1.96811978,-0.480285891 C1.67729341,-0.770750558 1.67729341,-1.24168683 1.96811978,-1.5321515 C2.25894616,-1.82261617 2.73046889,-1.82261617 3.02129527,-1.5321515 L6.53188022,1.9740672 C6.82270659,2.26453186 6.82270659,2.73546814 6.53188022,3.0259328 Z"
                              fillRule="nonzero" transform="translate(4.250000, 2.500000) rotate(-90.000000) translate(-4.250000, -2.500000) "></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
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
    this.form && this.form.addField(this)
    this._state.initialValue = this.state.value
    this._state.isMounted = true
    this.$el = this.selectWrapRef.current
  }
  componentWillUnmount () {
    this.form && this.form.removeField(this)
    this._state.isMounted = false
    this.removePicker()
  }
  get wrapCls () {
    const { value } = this.state
    const { labelPosition, textPosition, mode, className, readonly } = this.props
    const _labelPosition = labelPosition || (this.form && this.form.labelPosition) || 'left'
    const _textPosition = textPosition || (this.form && this.form.textPosition) || 'left'
    const _mode = mode || (this.form && this.form.mode) || 'default'
    return classNames([
      this.form && 'form-item',
      prefixCls,
      `${prefixCls}-label-${_labelPosition}`,
      `${prefixCls}-text-${_textPosition}`,
      `${prefixCls}-mode-${_mode}`,
      className,
      {
        [`${prefixCls}-empty`]: value == '',
        [`${prefixCls}-error`]: this.showErrorMsg,
        [`${prefixCls}-required`]: this.isRequired,
        [`${prefixCls}-readonly`]: !!readonly,
        [`${prefixCls}-placeholder`]: value == ''
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
    if (this.labelWidth || this.labelWidth == 0) {
      style.width = this.labelWidth
    } else if (this.form && (this.form.labelWidth || this.form.labelWidth == 0)) {
      style.width = this.form.labelWidth
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
    this._state.selectedIndex = -1
    for (var i = 0; i < data.length; i++) {
      if (data[i].value == value) {
        selectedOption = data[i]
        this._state.selectedIndex = i
        break
      }
    }
    return selectedOption
  }
  get placeholderText () {
    return this.props.placeholder || (this.form && this.form.placeholder) || ''
  }
  get arrowStyle () {
    let style = { color: '#666', width: '0.32rem' }
    return this.props.selectArrowStyle || (this.form && this.form.selectArrowStyle) || style
  }
  get contentCls () {
    return `${prefixCls}-content`
  }
  get selectCls () {
    return `${prefixCls}-select`
  }
  get arrowCls () {
    return `${prefixCls}-arrow-right`
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
    return this.props.required && this.fieldRules.length > 0
  }
  get showErrorMsg () {
    return this.state.validateState === 'error' &&
      (this.form ? this.form.showMessage && this.props.showMessage : this.props.showMessage)
  }
  showPicker = e => {
    const { data, pickerTitle, readonly, disabled } = this.props

    if (readonly || disabled) return

    const content = <>
      <div className={`${prefixCls}-header`}>{pickerTitle}</div>
      <div className={`${prefixCls}-close`} onClick={this.removePicker}></div>
      <div className={classNames([`${prefixCls}-list`, { 'scroll-area': data.length > 6 }])} ref={this.listRef}>
        {data.map(item => <div className={classNames([`${prefixCls}-item`, { active: item.value == this.state.value }])} key={item.value} onClick={e => this.confirmPicker({ e, value: item.value })}>{item.text}</div>)}
      </div>
    </>
    this._state.picker = Modal.create({
      content: content,
      showCancel: false,
      showConfirm: false,
      dlgStyle: { width: '100%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
      contentStyle: { padding: 0 },
      position: { x: 'center', y: 'bottom' },
      className: `${prefixCls}-modal`
    })
    if (this._state.lastScrollTop > -1) {
      this.listRef.current.scrollTop = this._state.lastScrollTop
    } else {
      const activeEl = this.listRef.current.querySelector('.active')
      activeEl && activeEl.scrollIntoView()
    }
  }
  getFilterRules (trigger) {
    return this.fieldRules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
  }
  validate (trigger, callback = function () { }) {
    const { value } = this.state
    const { initialValue } = this._state
    const { name, title } = this.props
    const rules = this.getFilterRules(trigger)
    const isInitialValue = this.isRequired && value !== '' && initialValue == value

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
    this.setValue(this._state.initialValue, null, { from: 'reset' })
  }
  confirmPicker ({ e, value }) {
    this._state.lastScrollTop = this.listRef.current.scrollTop
    this.setValue(value, function () {
      this.removePicker()
    }, { event: e, from: 'select' })
  }
  removePicker = () => {
    if (this._state.isMounted && this._state.picker) {
      this._state.picker.remove()
      this._state.picker = null
    }
  }
  /* 获取表单数据 */
  getValue () {
    return { name: this.props.name, value: this.state.value, title: this.props.title }
  }
  setValue (value, callback, options = {}) {
    const opts = Object.assign({ event: null, component: this, value: value }, options)
    const { from } = options

    this._state.isMounted && this.setState({ value: value }, () => {
      this.props.onChange(opts)
      this.form && this.form.onChange(opts)
      callback && callback.call(this)
      if (from === 'select') {
        this.validate('select')
      }
    })
  }
}

setDefaultProps(Select2, {
  title: {
    type: PropTypes.string
  },
  value: {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    default: ''
  },
  placeholder: {
    type: PropTypes.string
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
    type: PropTypes.bool,
    default: true
  },
  onChange: {
    type: PropTypes.func,
    default: () => { }
  },
  pickerTitle: {
    type: PropTypes.string
  },
  cancelBtnText: {
    type: PropTypes.string
  },
  confirmBtnText: {
    type: PropTypes.string
  },
  selectArrowStyle: {
    type: PropTypes.object
  },
  mode: {
    type: PropTypes.string
  }
})

export default Select2
