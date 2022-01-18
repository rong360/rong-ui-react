import React, { forwardRef, useState, useRef, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { setDefaultProps, classNames } from '../_util/assist'
import withPreventScroll from '../_hoc/withPreventScroll'

const prefixCls = 'r-flexfixed'

const FlexFixed = forwardRef((props, ref) => {
  const { header, footer, extra, children, className, onScroll, onScrollDebounce, withPreventScroll, hideFooterOnKeyboardShow } = props
  const doc = document.documentElement || document.body

  const [showFooter, setShowFooter] = useState(true)
  const [docHeight] = useState(doc.clientHeight)

  const wrapCls = classNames([prefixCls, className])
  const innerCls = `${prefixCls}-inner`

  const flexFixedRef = useRef()

  const onMainTouchStart = (e) => {
    let main = e.currentTarget
    main.maxScrollTop = main.scrollHeight - main.offsetHeight

  }

  const onMainScroll = (e) => {
    let main = e.currentTarget
    let scrollTop = main.scrollTop
    let direction = ''
    if (scrollTop > main.prevScrollTop) {
      direction = 'up'
    } else if (scrollTop < main.prevScrollTop) {
      direction = 'down'
    }

    if (e.target.timer) clearTimeout(e.target.timer)

    e.target.timer = setTimeout(() => {
      onScrollDebounce && onScrollDebounce({
        scrollTop: main.scrollTop,
        maxScrollTop: main.maxScrollTop,
        direction
      })
    }, 150);
    onScroll && onScroll({
      scrollTop: main.scrollTop,
      maxScrollTop: main.maxScrollTop,
      direction
    })
    main.prevScrollTop = scrollTop
  }

  // 阻止页面滚动
  useEffect(() => {
    withPreventScroll && withPreventScroll.init({ el: flexFixedRef.current })
  }, [withPreventScroll])

  // 安卓键盘弹起时隐藏footer
  useEffect(() => {
    if (hideFooterOnKeyboardShow) {
      function hideFooterOnScroll () {
        setShowFooter(doc.scrollTop === 0)
      }
      function hideFooterOnResize () {
        setShowFooter((doc.clientHeight / docHeight) > 0.8)
      }
      document.addEventListener('scroll', hideFooterOnScroll, false)
      window.addEventListener('resize', hideFooterOnResize, false)
      return () => {
        document.removeEventListener('scroll', hideFooterOnScroll, false)
        window.removeEventListener('resize', hideFooterOnResize, false)
      }
    }
  }, [])

  console.log('flexfixed mounted or updated')

  return <div className={wrapCls} ref={flexFixedRef}>
    <div className={innerCls}>
      {header && <header>
        {header}
      </header>}
      <main className='scroll-area' onScroll={onMainScroll} onTouchStart={onMainTouchStart}>
        {children}
      </main>
      {footer && <footer style={{ display: showFooter ? '' : 'none' }}>
        {footer}
      </footer>}
    </div>
    {extra}
  </div>
})

setDefaultProps(FlexFixed, {
  className: {
    type: PropTypes.string
  },
  header: {
    type: PropTypes.node
  },
  footer: {
    type: PropTypes.node
  },
  extra: {
    type: PropTypes.node
  },
  onScroll: {
    type: PropTypes.func
  },
  onScrollDebounce: {
    type: PropTypes.func
  },
  hideFooterOnKeyboardShow: {
    type: PropTypes.bool,
    default: true
  }
})

export default withPreventScroll(memo(FlexFixed))