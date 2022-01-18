import React from 'react'
import PropTypes from 'prop-types'
import Picker from 'better-picker'
import memoize from "memoize-one";
import { setDefaultProps, classNames } from '../_util/assist'
import { Consumer } from '../form/formContext'

const prefixCls = 'r-datepicker'


class DatePicker extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      prePropsValue: props.value,
      count: 0
    }
    this._state = {
      picker: null,
      pickerData: [],
      pickerSelectedIndex: [],
      yearIndexInColumnsOrder: -1,
      monthIndexInColumnsOrder: -1,
      dayIndexInColumnsOrder: -1
    }
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
  componentWillUnmount () {
    this.removePiker()
  }
  render () {
    const { children, columnsOrder, className, mode } = this.props
    const { value } = this.state
    this.initPickerData(value, columnsOrder)
    return <Consumer>
      {
        (context) => {
          this.form = context
          console.log('DatePicker mounted or updated')
          const placeholderText = this.placeholderText(value)
          return <div className={this.wrapCls} onClick={this.showPicker}>
            {
              children ? children : placeholderText
            }
          </div>
        }
      }
    </Consumer>
  }
  get wrapCls () {
    let { className, readonly, disabled } = this.props
    let { value } = this.state
    let _mode = this.props.mode || (this.form && this.form.props.mode) || 'default'
    return classNames([
      `${prefixCls}`,
      `${prefixCls}-mode-${_mode}`,
      className,
      {
        [`${prefixCls}-empty`]: value === '',
        [`${prefixCls}-disabled`]: !!disabled,
        [`${prefixCls}-readonly`]: !!readonly
      }
    ])
  }
  placeholderText = memoize(value => {
    let { text } = this.generateResult()
    let { placeholder } = this.props
    if (placeholder === undefined && this.form && this.form.props.placeholder) placeholder = this.form.props.placeholder
    if (placeholder === undefined) placeholder = '请选择'
    return value === '' ? placeholder : text
  })
  initPickerData = memoize((value, columnsOrder) => {
    let isValidDate = !isNaN(new Date(value).getTime())
    let today = isValidDate ? new Date(value) : new Date()
    let thisYear = today.getFullYear()
    let thisMonth = today.getMonth()
    let thisDay = today.getDate()
    this._state.thisYear = thisYear
    let time = {
      year: this.generateYearData(),
      month: this.generateMonthData(),
      day: this.generateDayData(this.getMaxDate(thisYear, thisMonth))
    }
    let timeSelectedIndex = {
      year: time.year.findIndex(item => item.value * 1 === thisYear),
      month: time.month.findIndex(item => item.value * 1 === thisMonth + 1),
      day: time.day.findIndex(item => item.value * 1 === thisDay)
    }
    this._state.pickerData = columnsOrder.map(item => time[item])
    this._state.pickerSelectedIndex = columnsOrder.map(item => timeSelectedIndex[item] < 0 ? 0 : timeSelectedIndex[item])
    // 查找year、month、day 在columnsOrder的索引
    for (let i = 0; i < columnsOrder.length; i++) {
      let type = columnsOrder[i]
      if (type === 'year') {
        this._state.yearIndexInColumnsOrder = i
      } else if (type === 'month') {
        this._state.monthIndexInColumnsOrder = i
      } else if (type === 'day') {
        this._state.dayIndexInColumnsOrder = i
      }
    }
    // 异步数据时更新picker
    if (this._state.picker) {
      this.removePiker()
      this.showPicker()
    }
  })
  showPicker = e => {
    let { disabled, pickerTitle, pickerCancelBtnText, pickerConfirmBtnText, mode } = this.props
    if (disabled) return
    let { pickerData, pickerSelectedIndex } = this._state
    let _pickerCancelBtnText = pickerCancelBtnText || (this.form && this.form.props.datePickerCancelBtnText)
    let _pickerConfirmBtnText = pickerConfirmBtnText || (this.form && this.form.props.datePickerConfirmBtnText)
    let _mode = mode || (this.form && this.form.props.mode) || 'default'
    let picker = new Picker({
      data: pickerData,
      selectedIndex: pickerSelectedIndex,
      title: pickerTitle
    });
    pickerCancelBtnText && (picker.cancelEl.innerHTML = _pickerCancelBtnText)
    pickerConfirmBtnText && (picker.confirmEl.innerHTML = _pickerConfirmBtnText)
    picker.pickerEl.setAttribute('mode', _mode)
    picker.on('picker.change', (index, selectedIndex) => {
      this._state.pickerSelectedIndex[index] = selectedIndex;
      // 年或月变化时更新天数
      if ((index === this._state.yearIndexInColumnsOrder || index === this._state.monthIndexInColumnsOrder) && this._state.monthIndexInColumnsOrder > -1) {
        this.refillDates();
      }
    });
    picker.on('picker.select', (index, selectedIndex) => {
      this.onConfirm();
      this.removePiker()
    });
    picker.on('picker.cancel', () => {
      this.removePiker()
      this.props.onCancel()
    });
    picker.maskEl.onclick = () => {
      picker.trigger('picker.cancel')
    }
    picker.show()
    this._state.picker = picker
  }
  removePiker () {
    let picker = this._state.picker
    if (picker && picker.pickerEl) {
      picker.pickerEl.parentNode.removeChild(picker.pickerEl);
      this._state.picker = null
    }
  }
  refillDates () {
    let { pickerData, yearIndexInColumnsOrder, monthIndexInColumnsOrder, dayIndexInColumnsOrder, pickerSelectedIndex } = this._state
    let thisYear = pickerData[yearIndexInColumnsOrder][pickerSelectedIndex[yearIndexInColumnsOrder]].value
    let thisMonth = pickerData[monthIndexInColumnsOrder][pickerSelectedIndex[monthIndexInColumnsOrder]].value
    let maxDate = this.getMaxDate(thisYear, thisMonth - 1)
    let dates = this.generateDayData(maxDate)
    let dateSelectedIndex = pickerSelectedIndex[dayIndexInColumnsOrder]

    this._state.picker.refillColumn(dayIndexInColumnsOrder, dates);

    if (dateSelectedIndex > (maxDate - 1)) {
      pickerSelectedIndex[dayIndexInColumnsOrder] = maxDate - 1;
      this._state.picker.scrollColumn(dayIndexInColumnsOrder, pickerSelectedIndex[dayIndexInColumnsOrder]);
    }
  }
  onConfirm () {
    let { year, month, day, text, value } = this.generateResult()
    this.setState({
      value: value
    }, () => {
      this.props.onConfirm({
        year: year.value,
        month: month.value,
        day: day.value,
        date: day.value,
        text,
        value
      });
    })
  }
  generateYearData () {
    let { startYear, endYear, offsetYear, yearsLength, pickerFormatter } = this.props
    startYear = (startYear * 1 || this._state.thisYear) + offsetYear * 1
    yearsLength = yearsLength * 1
    yearsLength = Math.max(yearsLength, 1)
    endYear = endYear * 1 || (startYear + yearsLength)

    return new Array(endYear - startYear).fill('').map((item, index) => {
      let year = startYear + index
      return { text: `${(pickerFormatter && pickerFormatter('year', year)) || year}`, value: `${year}` }
    })
  }
  generateMonthData () {
    let { language, pickerFormatter } = this.props
    let en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let id = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    let result = [];
    for (var i = 0; i < 12; i++) {
      let text = this.valueFormatTwoDigitInteger(i + 1)
      if (language === 'en') {
        text = en[i]
      } else if (language === 'id') {
        text = id[i]
      }
      result.push({
        text: `${(pickerFormatter && pickerFormatter('month', text)) || text}`,
        value: this.valueFormatTwoDigitInteger(i + 1)
      })
    }
    return result;
  }
  generateDayData (maxDate = 31) {
    let { pickerFormatter } = this.props
    let result = []
    for (var i = 1; i <= maxDate; i++) {
      let day = this.valueFormatTwoDigitInteger(i)
      result.push({
        text: `${(pickerFormatter && pickerFormatter('day', day)) || day}`,
        value: day
      })
    }
    return result;
  }
  generateResult () {
    let { textFormat, valueFormat } = this.props
    let { pickerData, pickerSelectedIndex, yearIndexInColumnsOrder, monthIndexInColumnsOrder, dayIndexInColumnsOrder } = this._state
    let year = yearIndexInColumnsOrder > -1 ? pickerData[yearIndexInColumnsOrder][pickerSelectedIndex[yearIndexInColumnsOrder]] : {}
    let month = monthIndexInColumnsOrder > -1 ? pickerData[monthIndexInColumnsOrder][pickerSelectedIndex[monthIndexInColumnsOrder]] : {}
    let day = dayIndexInColumnsOrder > -1 ? pickerData[dayIndexInColumnsOrder][pickerSelectedIndex[dayIndexInColumnsOrder]] : {}

    let text = typeof textFormat == 'function' ? textFormat({ year, month, day }) : textFormat.replace('yyyy', year.text).replace('mm', month.value).replace('dd', day.value).replace(/\/undefined/g, '')
    let value = typeof valueFormat == 'function' ? valueFormat({ year, month, day }) : valueFormat.replace('yyyy', year.value).replace('mm', month.value).replace('dd', day.value).replace(/\/undefined/g, '')

    return { year, month, day, value, text }
  }
  getMaxDate (year, month) { // month 从0开始
    return (new Date(new Date(year, month + 1, 1) - 1)).getDate();
  }
  valueFormatTwoDigitInteger (value) {
    value = value.toString()
    return (value.length === 1 ? '0' : '') + value
  }
}

setDefaultProps(DatePicker, {
  value: {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    default: ''
  },
  startYear: {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },
  endYear: {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },
  offsetYear: {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    default: 0
  },
  yearsLength: {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    default: 10
  },
  columnsOrder: {
    type: PropTypes.array,
    default: ['year', 'month', 'day']
  },
  language: {
    type: PropTypes.string,
    default: 'zh' // 中文 'zh'、 英文 'en'、 印尼 'id'
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
  textFormat: {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    default: 'yyyy/mm/dd'
  },
  valueFormat: {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    default: 'yyyy/mm/dd'
  },
  pickerFormatter: {
    type: PropTypes.func
  },
  pickerTitle: {
    type: PropTypes.string
  },
  pickerCancelBtnText: {
    type: PropTypes.string
  },
  pickerConfirmBtnText: {
    type: PropTypes.string
  },
  onConfirm: {
    type: PropTypes.func,
    default: () => { }
  },
  onCancel: {
    type: PropTypes.func,
    default: () => { }
  },
  mode: {
    type: PropTypes.string
  }
})

export default DatePicker