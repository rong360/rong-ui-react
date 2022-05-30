import { memo, forwardRef, useContext, useState, useEffect, useMemo, useImperativeHandle, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom';

import { createNamespace, classNames, setDefaultProps } from '../_util'
import PropTypes from 'prop-types'
import PickerColumn from './picker-column'

const { bem } = createNamespace('picker')

class PickerPortal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.className = 'picker-portal'
    this.__handlePreventDefault__ = e => e.preventDefault()
    this.pickerRef = React.createRef()
  }
  componentDidMount () {
    this.el.addEventListener('touchmove', this.__handlePreventDefault__)
    document.body.appendChild(this.el)
  }
  componentWillUnmount () {
    this.el.removeEventListener('touchmove', this.__handlePreventDefault__)
    document.body.removeChild(this.el)
  }
  show () {
    this.pickerRef.current.show()
  }
  hide () {
    this.pickerRef.current.hide()
  }
  resetField () {
    this.pickerRef.current.resetField()
  }
  render () {
    return createPortal(<Picker {...this.props} ref={this.pickerRef} />, this.el)
  }
}

const Picker = forwardRef((props, ref) => {
  const { cancelBtnText, confirmBtnText, columns, columnsValue, visibleItemCount, onCancel, onConfirm, onChange } = props
  const [_showPicker, setShowPicker] = useState(false)
  const [_showMask, setShowMask] = useState(false)
  const [_showPanel, setShowPanel] = useState(false)
  const [_itemHeight, setItemHeight] = useState(0)
  const [_columns, setColumnsData] = useState([].concat(columns))
  const [_columnsValue, setColumnsDataValue] = useState([].concat(columnsValue))
  const [_timeStamp, setTimeStamp] = useState(new Date().getTime())

  const baseOffset = (_itemHeight * (visibleItemCount - 1)) / 2

  let pickerEl = null
  let columnsEl = null

  // 异步更新
  useEffect(() => setColumnsData([].concat(columns)), [columns])

  // useEffect(() => {
  //   document.body.appendChild(pickerEl)
  //   return () => document.body.removeChild(pickerEl)
  // }, [])

  // 获取li高度
  useEffect(() => {
    if (!_itemHeight) {
      let li = columnsEl.querySelector('li')
      if (li) setItemHeight(window.getComputedStyle(li).height.match(/\d*\.?\d*/)[0] * 1 || 44)
    }
  })

  const toShowPicker = () => {
    setShowPicker(true)
    setShowMask(true)
    setShowPanel(true)
  }
  const toHidePicker = () => {
    setShowPicker(false)
    setShowMask(false)
    setShowPanel(false)
  }

  useImperativeHandle(ref, () => ({
    show: toShowPicker,
    hide: toHidePicker,
    resetField () {
      setColumnsData([].concat(columns))
      setTimeStamp(new Date().getTime())
    }
  }))


  const handleColumnChange = useCallback((columnIndex, selectedIndex, column) => {
    let children = column[selectedIndex].children
    if (children) {
      _columns[columnIndex + 1] = children
      setTimeout(() => setColumnsData([].concat(_columns)), 10);
    }

    _columnsValue[columnIndex] = column[selectedIndex] // [ {text: "浙江省", value: "330000" }, { text: "绍兴市", value: "330600"}, { text: "上虞区", value: "330604" }]
    onChange(_columnsValue)
  }, [_columns])

  const handleCancelClick = e => {
    onCancel(_columnsValue)
    toHidePicker()
  }

  const handleConfirmClick = e => {
    onConfirm(_columnsValue)
    toHidePicker()
  }

  console.log('picker mounted or update')

  return <div className={bem({ show: _showPicker })} ref={el => pickerEl = el}>
    <div className={bem('mask', { show: _showMask })}></div>
    <div className={bem('panel', { show: _showPanel })}>
      <div className={bem('toolbar')}>
        <div className={bem('cancel')} onClick={handleCancelClick}>
          {cancelBtnText ? cancelBtnText : '取消'}
        </div>
        <div className={bem('confirm')} onClick={handleConfirmClick}>
          {confirmBtnText ? confirmBtnText : '确认'}
        </div>
      </div>
      <div className={classNames([bem('columns'), 'scroll-area'])} ref={el => columnsEl = el}>
        {
          _columns.map((column, index) => column.length ? <PickerColumn
            column={column}
            columnValue={columnsValue[index] != undefined ? columnsValue[index] : ''}
            columnIndex={index}
            itemHeight={_itemHeight}
            baseOffset={baseOffset}
            timeStamp={_timeStamp}
            onChange={handleColumnChange}
            key={index}
          /> : '')
        }
        <div className={bem('columns-mask')}></div>
        <div className={bem('columns-hairline')}></div>
      </div>
    </div>
  </div>
})

setDefaultProps(Picker, {
  columns: {
    type: PropTypes.array
  },
  columnsValue: {
    type: PropTypes.array
  },
  // 可见的选项个数
  visibleItemCount: {
    type: PropTypes.number,
    default: 6
  },
  // 取消按钮文字
  cancelBtnText: {
    type: PropTypes.node
  },
  // 确认按钮文字
  confirmBtnText: {
    type: PropTypes.node
  },
  // 选项改变时触发
  onChange: {
    type: PropTypes.func,
    default: () => { }
  },
  // 点击完成按钮时触发
  onConfirm: {
    type: PropTypes.func,
    default: () => { }
  },
  // 点击取消按钮时触发
  onCancel: {
    type: PropTypes.func,
    default: () => { }
  }
})

export default memo(PickerPortal)
