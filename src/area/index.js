import { memo, forwardRef, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { createNamespace, classNames, setDefaultProps } from '../_util'
import PropTypes from 'prop-types'
import formContext from '../form/formContext'
import Picker from '../picker'
import AsyncValidator from 'async-validator'

const { name, bem } = createNamespace('area')

const Area = forwardRef((props, ref) => {
  const { title, detailTitle, name, placeholder, prepend, append, labelPosition, textPosition, labelWidth, cancelBtnText, confirmBtnText, areaList, areaValues, rules, required, onConfirm, onCancel } = props
  const [_labelWidth, setLabelWidth] = useState('')
  const [_cityValues, setCityValues] = useState(areaValues.slice(0, 3))
  const [_detailValue, setDetailValue] = useState(areaValues[3] || '')
  const [_detailFocused, setDetailFocused] = useState(false)
  const [_showMessage, setShowMessage] = useState(true)
  const [_validateMessage, setValidateMessage] = useState('')
  const _fieldRules = [].concat(rules || [{ required: true, message: `${detailTitle}不能为空` }])
  const _isRequired = required == false ? false : _fieldRules.some(item => item.required == true)

  const form = useContext(formContext)
  const pickerRef = useRef()
  let areaEl = null
  const _this = useRef({})

  useEffect(() => {
    setCityValues(areaValues.slice(0, 3))
    setDetailValue(areaValues[3] || '')
  }, [areaValues])

  const handleClearClick = e => setDetailValue('')

  const handlePickerClick = () => pickerRef.current.show()
  const handlePickerConfirm = useCallback((values) => {
    values.length = 3
    setCityValues(values.map(item => item.text || item.title))
    setValidateMessage('')
    onConfirm(values)
  }, [])
  const handlePickerCancel = useCallback((values) => onCancel(values), [])
  const handlePickerChange = useCallback((values) => {}, [])

  const handleDetailFocus = e => setDetailFocused(true)
  const handleDetailBlur = e => setTimeout(() => setDetailFocused(false), 200)
  const handleDetailChange = e => {
    setValidateMessage('')
    setDetailValue(e.target.value)
  }

  const getFilterRules = (trigger) => {
    return _fieldRules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) != -1)
  }

  const validate = (trigger, callback = function () { }) => {
    let rules = getFilterRules(trigger)

    if (!_isRequired) {
      callback('')
      return
    }
    let validateMessage = ''

    if (_cityValues.join('').length == 0) {
      validateMessage = '请选择省份'
      callback(validateMessage)
      setValidateMessage(validateMessage)
      return false
    }
    let descriptor = {}
    let prop = 'detail'
    descriptor[prop] = rules
    const validator = new AsyncValidator(descriptor)
    let model = {}

    model[prop] = _detailValue
    validator.validate(model).then(() => {
      validateMessage = ''
      setValidateMessage(validateMessage)
      callback(validateMessage)
    }).catch(({ errors, fields }) => {
      validateMessage = errors[0].message || 'error'
      setValidateMessage(validateMessage)
      callback(validateMessage)
    });
  }

  const getValue = () => ({ name, value: _cityValues.join(" ") + " " + _detailValue, title })
  const resetField = () => {
    pickerRef.current.resetField()
    setCityValues(areaValues.slice(0, 3))
    setDetailValue(areaValues[3] || '')
    setValidateMessage('')
  }

  // 给'this'添加方法，供form调用
  Object.assign(_this.current, {
    getValue,
    validate,
    resetField
  })


  useEffect(() => {
    _this.current.$el = areaEl
    form.addField(_this.current)

    setLabelWidth(labelWidth || form.labelWidth || '')
  }, [])

  console.log('area mounted or update')

  return <div className={classNames(['form-item', bem()])} ref={el => areaEl = el}>
    <div className={bem('inner')}>
      <label className={bem('label', { 'text-right': labelPosition == 'right' })} style={{ width: _labelWidth }}>{title}</label>
      {prepend && <div className={bem('prepend')}>{prepend}</div>}
      <div className={bem('content')} onClick={handlePickerClick}>
        <div className={bem('select', { 'text-right': textPosition == 'right', placeholder: _cityValues.join('').length == 0 })}>{_cityValues.join('-').length > 0 ? _cityValues.join('-') : '请选择省市区'}</div>
        <div className={bem('arrow-right')}>
          <svg width="1em"
            height="1em"
            viewBox="0 0 6 10">
            <g stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd">
              <g transform="translate(-350.000000, -20.000000)"
                fill="currentColor">
                <g>
                  <g transform="translate(346.000000, 18.000000)">
                    <g transform="translate(7.000000, 7.000000) rotate(-270.000000) translate(-7.000000, -7.000000) translate(2.750000, 4.500000)">
                      <path d="M6.53188022,3.0259328 L3.02129527,6.5321515 C2.73046889,6.82261617 2.25894616,6.82261617 1.96811978,6.5321515 C1.67729341,6.24168683 1.67729341,5.77075056 1.96811978,5.48028589 L4.95211699,2.5 L1.96811978,-0.480285891 C1.67729341,-0.770750558 1.67729341,-1.24168683 1.96811978,-1.5321515 C2.25894616,-1.82261617 2.73046889,-1.82261617 3.02129527,-1.5321515 L6.53188022,1.9740672 C6.82270659,2.26453186 6.82270659,2.73546814 6.53188022,3.0259328 Z"
                        fillRule="nonzero"
                        transform="translate(4.250000, 2.500000) rotate(-90.000000) translate(-4.250000, -2.500000) "></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <Picker
        columns={areaList}
        columnsValue={areaValues}
        cancelBtnText={cancelBtnText}
        confirmBtnText={confirmBtnText}
        onConfirm={handlePickerConfirm}
        onCancel={handlePickerCancel}
        onChange={handlePickerChange}
        ref={pickerRef}
      />
      {append && <div className={bem('append')}>{append}</div>}
    </div>
    <div className={bem('detail', { hide: _cityValues.join('').length == 0 })}>
      <label className={bem('label', { 'text-right': labelPosition == 'right' })} style={{ width: _labelWidth }}>{detailTitle}</label>
      <input
        className={bem('input', { 'text-right': textPosition == 'right' })}
        type="text"
        name="detail"
        placeholder={placeholder}
        value={_detailValue}
        autoComplete='off'
        onChange={handleDetailChange}
        onFocus={handleDetailFocus}
        onBlur={handleDetailBlur}
      />
      <a className={bem('clear', { show: _detailValue && _detailFocused })} onClick={handleClearClick}><svg width="1em"
        height="1em"
        viewBox="0 0 13 13">
        <g stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd">
          <g transform="translate(-347.000000, -16.000000)"
            fill="currentColor"
            fillRule="nonzero">
            <path d="M359.127301,19.2498723 C358.537222,18.2437191 357.756193,17.4627605 356.749987,16.8726113 C355.755019,16.2890502 354.673613,16 353.499991,16 C352.326369,16 351.241123,16.2824796 350.234952,16.8726113 C349.239967,17.4561724 348.462778,18.2437191 347.872682,19.2498723 C347.289173,20.2449454 347,21.326369 347,22.4999031 C347,23.6736134 347.282603,24.7587186 347.872682,25.7650303 C348.45619,26.7599449 349.239967,27.5436339 350.234952,28.1272126 C351.24114,28.7173618 352.326387,28.9999824 353.499991,28.9999824 C354.673596,28.9999824 355.755019,28.7107737 356.749987,28.1272126 C357.756175,27.5370634 358.543775,26.7599449 359.127301,25.7650303 C359.717397,24.7587186 360,23.6736134 360,22.4999031 C360,21.326369 359.710827,20.2449454 359.127301,19.2498723 Z M356.644682,24.862244 L355.847236,25.6446647 L353.500009,23.2823238 L351.1528,25.6446647 L350.355353,24.862244 L352.717623,22.4999031 L350.355353,20.1526586 L351.137756,19.3553177 L353.500009,21.7175 L355.847218,19.3553177 L356.644665,20.1526586 L354.282394,22.4999031 L356.644682,24.862244 Z"></path>
          </g>
        </g>
      </svg></a>
    </div>
    {_validateMessage && <div className={bem('error')}>{_validateMessage}</div>}
  </div>
})

setDefaultProps(Area, {
  title: {
    type: PropTypes.string,
    default: '标题'
  },
  detailTitle: {
    type: PropTypes.string,
    default: ''
  },
  labelWidth: {
    type: PropTypes.string
  },
  labelPosition: {
    type: PropTypes.oneOf(['left', 'right'])
  },
  textPosition: {
    type: PropTypes.oneOf(['left', 'right']),
    default: 'left'
  },
  prepend: {
    type: PropTypes.node
  },
  append: {
    type: PropTypes.node
  },
  showMessage: {
    type: PropTypes.bool,
    default: true
  },
  cancelBtnText: {
    type: PropTypes.node
  },
  confirmBtnText: {
    type: PropTypes.node
  },
  onConfirm: {
    type: PropTypes.func,
    default: () => { }
  },
  onCancel: {
    type: PropTypes.func,
    default: () => { }
  },
  // 省市县数据，二维数组 [[省], [市], [县]]
  areaList: {
    type: PropTypes.array,
    default: []
  },
  // 省市县选择的值['浙江省', '绍兴市', '上虞区']
  areaValues: {
    type: PropTypes.array,
    default: []
  },
  rules: {
    type: PropTypes.array
  },
  required: {
    type: PropTypes.bool,
    default: true
  },
  placeholder: {
    type: PropTypes.string,
    default: '具体到门牌号，最少4个字符'
  }
})
export default memo(Area)
