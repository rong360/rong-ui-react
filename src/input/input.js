import React from 'react'
import PropTypes from 'prop-types'
import AsyncValidator from 'async-validator'
import { setDefaultProps, classNames } from '../_util/assist'
import { Consumer } from '../form/formContext'

const prefixCls = 'r-input'

class Input extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      prePropsValue: props.value,
      validateState: '',
      validateMessage: '',
      focused: false,
      showEmailPan: false
    }
    // 不需要驱动视图更新的数据放这里
    this._state = {
      initialValue: '',
      validateDisabled: false,
      blurTimer: null,
      typing: false, // 键盘输入中文
      preValidateTime: '',
      isMounted: false
    }
    this.inputRef = React.createRef()
    this.inputWrapRef = React.createRef()
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
        console.log('Input mounted or updated')
        const { title, name, type, prepend, append, maxlength, disabled, readonly, autofocus } = this.props
        const { value, validateMessage } = this.state
        return (
          <div className={this.wrapCls} ref={this.inputWrapRef}>
            <div className={this.innerCls}>
              {title && <label className={this.labelCls} style={this.labelStyle}>{title}</label>}
              {prepend && <div className={this.prependCls}>
                {prepend}
              </div>}
              <div className={this.contentCls}>
                <input
                  type={this.inputType}
                  name={name}
                  value={value}
                  pattern={type === 'number' ? 'number' : ''}
                  maxLength={maxlength}
                  disabled={disabled}
                  readOnly={readonly}
                  autoFocus={autofocus}
                  placeholder={this.placeholderText}
                  className={this.inputCls}
                  autoComplete='off'
                  spellCheck='false'
                  {...this.dataset()}
                  ref={this.inputRef}
                  onInput={this.onFieldInput}
                  onChange={this.onFieldChange}
                  onFocus={this.onFieldFocus}
                  onBlur={this.onFieldBlur}
                  onCompositionStart={this.onFieldCompositionStart}
                  onCompositionEnd={this.onFieldCompositionEnd}
                />
                {this.showEditIcon && <div className={classNames(["input-edit", this.inputCls])}><span className="placeholder">{value}</span><span className="edit-icon"></span></div>}
                {this.showClear && <span className={this.clearCls} onClick={this.onClear}><svg width="14px" height="14px" style={this.clearStyle} viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-346.000000, -238.000000)" fill={this.clearStyle.color}>
                      <g transform="translate(346.000000, 238.000000)">
                        <path d="M7,0 C3.13354657,0 0,3.13354657 0,7 C0,10.8664534 3.13354657,14 7,14 C10.8664534,14 14,10.8664534 14,7 C14,3.13354657 10.8664534,0 7,0 Z M9.97021324,4.68998284 L7.66019608,7 L9.97021324,9.31001716 C10.1500343,9.49390441 10.1472721,9.78900245 9.96331618,9.97021324 C9.78215686,10.1472721 9.49115931,10.1472721 9.31001716,9.97021324 L7,7.66019608 L4.68998284,9.97021324 C4.50609559,10.1500343 4.21099755,10.1472721 4.02978676,9.96331618 C3.85272794,9.78215686 3.85272794,9.49115931 4.02978676,9.31001716 L6.33980392,7 L4.02978676,4.68998284 C3.84996569,4.50609559 3.85272794,4.21099755 4.03668382,4.02978676 C4.21784314,3.85272794 4.50884069,3.85272794 4.68998284,4.02978676 L7,6.33980392 L9.31001716,4.02978676 C9.49390441,3.84996569 9.78900245,3.85272794 9.97021324,4.03668382 C10.1472721,4.21784314 10.1472721,4.50884069 9.97021324,4.68998284 Z" id="Fill-1"></path>
                      </g>
                    </g>
                  </g>
                </svg></span>}
              </div>
              {append && <div className={this.appendCls}>
                {append}
              </div>}
              {this.showErrorMsg && <div className={this.errorCls}>
                {validateMessage}
              </div>}
            </div>
            {this.showEmailPanel && <div className={this.emailPanel}>
              {this.filteredEmailList.map((emailSuffix, idx) => <div className={this.emailPanelItem} key={idx} onClick={this.onEmailClick} dangerouslySetInnerHTML={{ __html: (this.state.value.split('@')[0] + '@' + emailSuffix).replace(this.state.value, function (text) { return `<font>${text}</font>` }) }}></div>)}
            </div>}
          </div>
        )
      }}
    </Consumer>
  }
  componentDidMount () {
    this.form && this.form.addField(this)
    this._state.initialValue = this._state.prevValue = this.state.value
    this._state.isMounted = true
    this.$el = this.inputWrapRef.current
  }
  componentWillUnmount () {
    this.form && this.form.removeField(this)
    this._state.isMounted = false
  }
  get wrapCls () {
    const { focused, value } = this.state
    const { type, labelPosition, textPosition, mode, className, readonly, showEdit } = this.props
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
        [`${prefixCls}-focused`]: focused,
        [`${prefixCls}-empty`]: value === '',
        [`${prefixCls}-error`]: this.showErrorMsg,
        [`${prefixCls}-show-clear`]: this.showClear,
        [`${prefixCls}-hidden`]: type === 'hidden',
        [`${prefixCls}-email`]: type === 'email',
        [`${prefixCls}-required`]: this.isRequired,
        [`${prefixCls}-readonly`]: !!readonly,
        [`${prefixCls}-placeholder`]: value === '',
        [`${prefixCls}-show-edit`]: showEdit
      }
    ])
  }
  get innerCls () {
    return `${prefixCls}-inner`
  }
  get labelCls () {
    return `${prefixCls}-label`
  }
  get labelStyle () {
    let style = {}
    if (this.labelWidth || this.labelWidth === 0) {
      style.width = this.labelWidth
    } else if (this.form && (this.form.labelWidth || this.form.labelWidth === 0)) {
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
  get placeholderText () {
    return this.props.placeholder || (this.form && this.form.placeholder) || ''
  }
  get clearStyle () {
    let style = { color: '#C8C7CC' }
    return this.props.inputClearStyle || (this.form && this.form.inputClearStyle) || style
  }
  get contentCls () {
    return `${prefixCls}-content`
  }
  get inputCls () {
    return `${prefixCls}-input`
  }
  get clearCls () {
    return `${prefixCls}-clear`
  }
  get unitCls () {
    return `${prefixCls}-unit`
  }
  get showClear () {
    return this.state.focused && String(this.state.value).length > 0
  }
  get errorCls () {
    return `${prefixCls}-error-tip`
  }
  get inputType () {
    const { type } = this.props // 'tel', 'number', 'text', 'IDCard'
    return type === 'IDCard' ? 'text' : type
  }
  get fieldRules () {
    const { title, type, rules } = this.props
    let defaultRules = [{ required: true, message: `${title}不能为空` }]
    if (type === 'IDCard') {
      defaultRules.push({
        validator (rule, value, callback) {
          if (!IDCardVerify(value)) {
            return new Error('身份证格式不正确')
          }
          callback()
        },
        trigger: 'blur'
      })
    } else if (type === 'email') {
      defaultRules.push({ type: "email", message: "邮箱格式不正确", trigger: "blur" })
    }
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
      (this.form ? this.form.showMessage && this.props.showMessage : this.props.showMessage)
  }
  get emailPanel () {
    return `${prefixCls}-email-panel`
  }
  get emailPanelItem () {
    return `${prefixCls}-email-panel--item`
  }
  get filteredEmailList () {
    const emailList = this.props.emailList
    const value = this.state.value
    const emailSuffix = value.split('@')[1]
    const arr = []
    if (!emailSuffix && value.length) {
      return emailList
    }
    for (var i = 0; i < emailList.length; i++) {
      let email = emailList[i].replace('@', '')
      if (email.indexOf(emailSuffix) > -1) {
        arr.push(email)
      }
    }
    return arr
  }
  get showEmailPanel () {
    const { value, showEmailPan } = this.state
    const currEmailSuffix = String(value).split("@")[1]
    return this.props.type === 'email' && showEmailPan &&
      (this.filteredEmailList.length > 1 || (this.filteredEmailList.length === 1 && this.filteredEmailList[0] !== currEmailSuffix))
  }
  get showEditIcon () {
    const { focused, value } = this.state
    const { showEdit } = this.props
    return showEdit && !focused && value != ''
  }
  // input添加dataset数据，外部可以通过e.target.dataset获取
  dataset () {
    let obj = {}
    for (let key in this.props) {
      if (key.startsWith('data-')) obj[key] = this.props[key]
    }
    return obj
  }
  onFieldInput = e => {
    this.setState({ validateState: '', validateMessage: '' })
    let iptValue = e.target.value
    let iptPrevValue = e.target.prevValue
    let { type, maxlength, fixed } = this.props

    if (type === 'number') {
      // 修复input 属性为 number，maxlength不起作用
      if (maxlength && iptValue.length > maxlength) {
        iptValue = iptValue.slice(0, maxlength)
      }
      // 限制小数位数
      let dotPos = iptValue.indexOf('.')
      if (fixed > 0 && dotPos > -1) iptValue = iptValue.substring(0, dotPos + fixed + 1)
      // 解决ios输入非数字时value清空问题
      if (e.nativeEvent && e.nativeEvent.data && e.nativeEvent.inputType) {
        let isNotNumber = !/[0-9]|\./.test(e.nativeEvent.data) && e.nativeEvent.inputType !== 'deleteContentBackward' // 键值为非数字，并且不是后退键
        let isDoubleDot = e.nativeEvent.data === '.' && iptPrevValue.includes('.') // 输入两个小数点
        let isIntDot = fixed <= 0 && e.nativeEvent.data === '.' // 要求是整数但输入了小数点
        if (isNotNumber || isDoubleDot || isIntDot) iptValue = iptPrevValue
      }
      // 整数时先清空，防止展示异常
      if (fixed <= 0) e.target.value = ''
    } else if (type === 'tel') {
      iptValue = telephoneClearNonNumbers(iptValue)
    } else if (type === 'IDCard') {
      iptValue = IDCardClearNonNumbers(iptValue)
    }

    if ((type === 'text' || type === 'email') && this._state.typing) return // 正在输入中文时不执行后面的代码

    e.target.value = iptValue
    e.target.prevValue = iptValue
  }
  // React的onInput和onChange并没有多少区别，其作用都是在用户持续输入的时候触发(先onInput,后onChange)，不在失去获取或者失去焦点的时候触发。
  onFieldChange = e => {
    let iptValue = e.target.value
    this.setValue(iptValue, function () {
      this.props.onInput({ event: e, component: this, value: iptValue })
    }, { event: e, from: 'change' })
  }
  onFieldFocus = e => {
    let { readonly, disabled, type } = this.props
    let iptValue = e.target.value
    if (readonly || disabled) return
    e.target.prevValue = iptValue
    e.target.lastValue = iptValue
    this.setState({ focused: true })
    this.props.onFocus({ event: e, component: this, value: iptValue })
    type === 'email' && this.setState({ showEmailPan: true })
  }
  onFieldBlur = e => {
    let iptValue = e.target.value
    let { onBlur } = this.props

    this.setValue(iptValue, function () {
      onBlur({ event: e, component: this, value: iptValue })
    }, { event: e, from: 'blur' })

    this._state.blurTimer = setTimeout(() => {
      this._state.isMounted && this.setState({ focused: false, showEmailPan: false })
    }, 200)
  }
  onClear = e => {
    if (this._state.blurTimer) clearTimeout(this._state.blurTimer)
    this.setValue('', function () {
      this.inputRef.current.focus()
    }, { event: e })
  }
  onEmailClick = e => {
    const value = e.target.innerText
    this.setValue(value, null, { event: e })
  }
  onFieldCompositionStart = e => {
    this._state.typing = true // 输入中文前
  }
  onFieldCompositionEnd = e => {
    this._state.typing = false // 输入中文后
  }
  getFilterRules (trigger) {
    return this.fieldRules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
  }
  validate (trigger, callback = function () { }) {
    // 防止blur后直接点击btn重复调用validate方法
    const timeNow = new Date().getTime()
    if (this._state.preValidateTime && (timeNow - this._state.preValidateTime) < 50) return
    this._state.preValidateTime = timeNow

    const { value } = this.state
    const { initialValue } = this._state
    const { name, title } = this.props
    const isMaskCode = initialValue.indexOf('*') > -1 && initialValue === value // 掩码
    const rules = this.getFilterRules(trigger)

    if (!this.isRequired || isMaskCode) {
      callback()
      return true
    }

    this._state.validateDisabled = false

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
    this._state.validateDisabled = true
    this.setState({ validateState: '', validateMessage: '' })
    this.setValue(this._state.initialValue, null, { from: 'reset' })
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
      if (from === 'blur' || from === 'reset') {
        if (this._state.validateDisabled) {
          this._state.validateDisabled = false
        } else {
          this.validate('blur')
        }
      }
    })
  }
}

setDefaultProps(Input, {
  type: {
    type: PropTypes.string,
    default: 'text'
  },
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
  maxlength: {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },
  fixed: {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },
  disabled: {
    type: PropTypes.oneOf(['disabled', 1, 0, true, false])
  },
  readonly: {
    type: PropTypes.oneOf(['readonly', 1, 0, true, false])
  },
  autofocus: {
    type: PropTypes.oneOf(['autofocus', 1, 0, true, false])
  },
  emailList: {
    type: PropTypes.array,
    default: []
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
  inputClearStyle: {
    type: PropTypes.object
  },
  showEdit: {
    type: PropTypes.bool
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
  onInput: {
    type: PropTypes.func,
    default: () => { }
  },
  onFocus: {
    type: PropTypes.func,
    default: () => { }
  },
  onBlur: {
    type: PropTypes.func,
    default: () => { }
  },
  mode: {
    type: PropTypes.string
  }
})

function telephoneClearNonNumbers (str) {
  // 先把非数字的都替换掉，除了数字和.
  str = str.replace(/[^\d]/g, "")
  return str
}

function IDCardClearNonNumbers (str) {
  // 身份证不超过15或18位数字，最后一位是X或者x，超过18截掉
  if (str.length > 18) {
    str = str.substr(0, 18)
  }
  if (str.length < 15 || str.length > 15 && str.length < 18) {
    str = str.replace(/[^\d]/g, "")
  }
  if (str.length == 15 || str.length == 18) {
    let str1 = str.substr(0, str.length - 1)
    let str2 = str.substr(str.length - 1, 1)
    str1 = str1.replace(/[^\d]/g, "")
    str2 = str2.replace(/[^\dXx]/g, "")
    str = str1 + str2
  }
  return str
}

function IDCardVerify (idcard) {
  var pass = false;
  var area = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  }
  var Y, JYM, ereg;
  var S, M;
  var idcardArray = [];
  idcardArray = idcard.split("");
  if (area[parseInt(idcard.substr(0, 2))] == null) {
    return false;
  }
  switch (idcard.length) {
    case 15:
      pass = false;
      break;
    case 18:
      if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
      } else {
        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {
        S = (parseInt(idcardArray[0]) + parseInt(idcardArray[10])) * 7 + (parseInt(idcardArray[1]) + parseInt(idcardArray[11])) * 9 + (parseInt(idcardArray[2]) + parseInt(idcardArray[12])) * 10 + (parseInt(idcardArray[3]) + parseInt(idcardArray[13])) * 5 + (parseInt(idcardArray[4]) + parseInt(idcardArray[14])) * 8 + (parseInt(idcardArray[5]) + parseInt(idcardArray[15])) * 4 + (parseInt(idcardArray[6]) + parseInt(idcardArray[16])) * 2 + parseInt(idcardArray[7]) * 1 + parseInt(idcardArray[8]) * 6 + parseInt(idcardArray[9]) * 3;
        Y = S % 11;
        M = "F";
        JYM = "10X98765432";
        M = JYM.substr(Y, 1);
        if (M.toLowerCase() == idcardArray[17].toLowerCase()) {
          pass = true;
        } else {
          pass = false;
        }
      } else {
        pass = false;
      }
      break;
    default:
      pass = false;
      break;
  };

  return pass;
}

export default Input
