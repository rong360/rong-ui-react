import React from 'react'
import PropTypes from 'prop-types'
import { setDefaultProps } from '../_util/assist'
import { memo, useMemo, useEffect, useRef } from "react";

const prefixCls = 'r-textscroll'

const copyList = (list) => {
  let arr = []
  let listCopyNum
  switch (list.length) {
    case 1:
      listCopyNum = 4
      break
    case 2:
      listCopyNum = 3
      break
    default:
      listCopyNum = 2
  }
  for (var i = 0; i < listCopyNum; i++) {
    arr = arr.concat(list)
  }
  return { arr, listCopyNum }
}

const animate = ({ target, gap, maxScrollleft }) => {
  let start = null

  function step (timestamp) {
    if (!start) start = timestamp
    let progress = timestamp - start

    if (progress > gap) {
      target.scrollLeft = target.scrollLeft >= maxScrollleft ? 0 : target.scrollLeft + 1
      start = timestamp
    }
    window.requestAnimationFrame(step)
  }
  window.requestAnimationFrame(step)
}

const TextScroll = ({ list, prepend, append }) => {
  const scrollbaRef = useRef()
  
  console.log('TextScroll mounted or updated')

  const { arr: scrollList, listCopyNum } = useMemo(() => copyList(list), [list])

  // setMaxScrollLeft
  useEffect(() => {
    let scrollbar = scrollbaRef.current
    let maxScrollleft = scrollbar.scrollWidth / listCopyNum
    animate({ target: scrollbar, gap: 10, maxScrollleft })
  }, [listCopyNum])

  return <div className={`${prefixCls}`}>
    {prepend}
    <div className={`${prefixCls}-scrollbar`} ref={scrollbaRef}>
      {
        scrollList.map((item, index) => {
          return <div className={`${prefixCls}-item`} key={index}>
            {item}
          </div>
        })
      }
    </div>
    {append}
  </div>
}

setDefaultProps(TextScroll, {
  list: {
    type: PropTypes.array,
    default: []
  },
  prepend: {
    type: PropTypes.node
  },
  append: {
    type: PropTypes.node
  }
})

export default memo(TextScroll)