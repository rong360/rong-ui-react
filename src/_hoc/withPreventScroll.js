import React, { Component } from 'react'

function preventScroll (WrappedComponent) {
  class PreventScroll extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
    componentDidMount () { }
    componentWillUnmount () {
      if (this.el) {
        this.el.removeEventListener('touchstart', this.el.__handleTouchstart__, false)
        this.el.removeEventListener('touchmove', this.el.__handleTouchmove__, false)
        delete this.el.__handleTouchstart__
        delete this.el.__handleTouchmove__
      }
    }
    init = ({ el }) => {
      this.el = el
      this.bindEvent()
    }
    bindEvent () {
      let currentScrollArea = null
      let mouseInfo = {
        startX: 0,
        startY: 0,
        direction: ''
      }
      const searchScrollArea = (el) => {
        let scrollArea = null
        while (el) {
          if (el.className && el.className.indexOf && el.className.indexOf('scroll-area') > -1) {
            scrollArea = el
            break
          }
          el = el.parentNode
        }
        return scrollArea
      }
      const handleTouchstart = (e) => {
        currentScrollArea = searchScrollArea(e.target)
        mouseInfo.startX = e.targetTouches[0].clientX
        mouseInfo.startY = e.targetTouches[0].clientY
      }
      const handleTouchmove = (e) => {
        mouseInfo.direction = getDirection(mouseInfo.startX, mouseInfo.startY, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if (!currentScrollArea || currentScrollArea && ((mouseInfo.direction === 2 && currentScrollArea.scrollTop === 0) || (mouseInfo.direction === 1 && currentScrollArea.scrollTop >= (currentScrollArea.scrollHeight - currentScrollArea.offsetHeight))) && e.cancelable) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
      this.el.__handleTouchstart__ = handleTouchstart
      this.el.__handleTouchmove__ = handleTouchmove
      this.el.addEventListener('touchstart', this.el.__handleTouchstart__, false)
      this.el.addEventListener('touchmove', this.el.__handleTouchmove__, false)
    }
    render () {
      let { forwardedRef, ...rest } = this.props
      return <WrappedComponent ref={forwardedRef} {...rest} withPreventScroll={this} />
    }
  }
  return React.forwardRef((props, ref) => {
    return <PreventScroll {...props} forwardedRef={ref} />
  })
}

// 获得角度
function getAngle (angx, angy) {
  return Math.atan2(angy, angx) * 180 / Math.PI
}

// 根据起点终 点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection (startx, starty, endx, endy) {
  var angx = endx - startx;
  var angy = endy - starty;
  var result = 0;

  // 如果滑动距离太短
  if (Math.abs(angx) < 5 && Math.abs(angy) < 5) {
    return result
  }
  var angle = getAngle(angx, angy);
  if (angle >= -135 && angle <= -45) {
    result = 1
  } else if (angle > 45 && angle < 135) {
    result = 2
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3
  } else if (angle >= -45 && angle <= 45) {
    result = 4
  }
  return result
}

export default preventScroll