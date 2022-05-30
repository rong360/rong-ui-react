import { useState, memo, forwardRef, useEffect, useMemo, useImperativeHandle } from 'react'
import { createNamespace, classNames, setDefaultProps } from '../_util'
import PropTypes from 'prop-types'
const { bem } = createNamespace('picker-column')

const range = (num, min, max) => {
  return Math.min(Math.max(num, min), max)
}

const PickerColumn = forwardRef((props, ref) => {
  const { column, isCascadingMenu, itemHeight, baseOffset, columnValue, columnIndex, onChange, timeStamp } = props
  const [offset, setOffset] = useState(0) // translate偏移量
  const [startY, setStartY] = useState(0) // 鼠标起始位置
  const [startOffset, setStartOffset] = useState(0)
  const [touchstartTime, setTouchstartTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const defaultDuration = 200 // 默认transition时间

  // 1,columnValue存在时计算默认selectedIndex。2，级联菜单联动时selectedIndex = 0
  useEffect(() => {
    let selectedIndex = 0
    column.forEach((item, index) => {
      if (item.value == columnValue || item.text === columnValue || item.title === columnValue) {
        selectedIndex = index
      }
    })
    setSelectedIndex(selectedIndex)
    emitChange()
  }, [column, columnValue, timeStamp])

  // selectedIndex change
  useEffect(() => {
    emitChange()
    resetOffset(selectedIndex)
  }, [selectedIndex])

  const emitChange = () => {
    let obj = column[selectedIndex]
    if (obj) onChange(columnIndex, selectedIndex, column)
  }

  const handleListTouchStart = e => {
    setDuration(0)
    setStartY(e.targetTouches[0].clientY)
    setTouchstartTime(new Date())
  }
  const handleListTouchMove = e => {
    let deltaY = e.targetTouches[0].clientY - startY
    let offset = range(startOffset + deltaY, -(column.length * itemHeight), itemHeight)
    setOffset(offset)
  }
  const handleListTouchEnd = e => {
    /**
       * 惯性滑动思路
       * 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动
       */
    const duration = new Date() - touchstartTime
    const distance = offset - startOffset
    const MOMENTUM_LIMIT_TIME = 300
    const MOMENTUM_LIMIT_DISTANCE = 15
    const allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;

    let selectedIndex = allowMomentum ? momentum(distance, duration) : getIndexByOffset(offset)

    setDuration(defaultDuration)
    setSelectedIndex(selectedIndex)
    resetOffset(selectedIndex)

  }

  const resetOffset = selectedIndex => {
    let _offset = -selectedIndex * itemHeight
    setOffset(_offset)
    setStartOffset(_offset)
  }

  const momentum = (distance, duration) => {
    const speed = Math.abs(distance / duration);
    distance = offset + (speed / 0.003) * (distance < 0 ? -1 : 1);
    const selectedIndex = getIndexByOffset(distance);
    return selectedIndex
  }

  const getIndexByOffset = (offset) => {
    return range(Math.round(-offset / itemHeight), 0, column.length - 1)
  }

  const toSetSelectedIndex = (selectedIndex) => {
    let offset = -selectedIndex * itemHeight
    setOffset(offset)
    setStartOffset(offset)
    setSelectedIndex(selectedIndex)
    setDuration(defaultDuration)
  }

  const ulStyle = {
    transform: `translate3d(0, ${offset + baseOffset}px, 0)`,
    transitionDuration: `${duration}ms`,
    transitionProperty: duration ? 'all' : 'none'
  }

  console.log('pickerColumn mounted or update')


  return <ul
    className={bem({ 'flex-1': !isCascadingMenu })}
    style={ulStyle}
    onTouchStart={handleListTouchStart}
    onTouchMove={handleListTouchMove}
    onTouchEnd={handleListTouchEnd}
  >
    {
      column.map((item, index) => {
        const text = item.text || item.title
        return <li key={text}>{text}</li>
      })
    }
  </ul>
})

setDefaultProps(PickerColumn, {
  column: {
    type: PropTypes.array
  },
  columnIndex: {
    type: PropTypes.number
  },
  columnValue: {
    type: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  },
  itemHeight: {
    type: PropTypes.number
  },
  baseOffset: {
    type: PropTypes.number
  },
  isCascadingMenu: {
    type: PropTypes.bool
  },
  itemHeight: {
    type: PropTypes.number
  },
  onChange: {
    type: PropTypes.func,
    default: (selectedVal, selectedIndex, columnIndex) => { }
  }
})

export default memo(PickerColumn)
