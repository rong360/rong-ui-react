import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { setDefaultProps, classNames } from '../_util/assist'
import withPreventScroll from '../_hoc/withPreventScroll'
import withHashChange from '../_hoc/withHashChange'
import { CSSTransition } from 'react-transition-group'

const prefixCls = 'r-modal'

class Modal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible,
      prevPropVisible: props.visible
    }
    this.container = props.target
    this.modal = React.createRef()
    this.modalWrap = React.createRef()
  }
  static getDerivedStateFromProps (nextProps, preState) {
    if (nextProps.visible !== preState.prevPropVisible) {
      return {
        visible: nextProps.visible,
        prevPropVisible: nextProps.visible
      }
    }
    return null
  }
  componentDidMount () {
    this.isMount = true
  }
  componentWillUnmount () {
    this.isMount = false
  }
  onEnter = () => {
    this.resetPos()
    this.props.withPreventScroll && this.props.withPreventScroll.init({ el: this.modal.current })
  }
  onExited = () => {
    this.isMount = false
    this.props.fromInstance && ReactDOM.unmountComponentAtNode(this.props.target)
  }
  onCancel = (e) => {
    this.props.onCancel && this.props.onCancel.call(this, e)
  }
  onConfirm = (e) => {
    this.props.onConfirm && this.props.onConfirm.call(this, e)
  }
  onClose = (e) => {
    this.props.onClose && this.props.onClose.call(this, e)
  }
  remove = () => {
    this.isMount && this.setState({ visible: false })
  }
  resetPos () {
    const modalWrap = this.modalWrap.current
    const dWidth = modalWrap.offsetWidth
    const dHeight = modalWrap.offsetHeight
    const wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

    if (dWidth > wWidth) modalWrap.style.width = wWidth + 'px'
    if (dHeight > wHeight) modalWrap.style.height = wHeight + 'px'

    switch (this.props.position.x) {
      case 'left':
        modalWrap.style.left = '0px'
        break
      case 'center':
        modalWrap.style.left = (wWidth - dWidth) / 2 + 'px'
        break
      case 'right':
        modalWrap.style.right = '0px'
        break
      default:
        modalWrap.style.left = this.props.position.x
    }

    switch (this.props.position.y) {
      case 'top':
        modalWrap.style.top = '0px'
        break
      case 'center':
        modalWrap.style.top = (wHeight - dHeight) / 2 + 'px'
        break
      case 'bottom':
        modalWrap.style.bottom = '0px'
        break
      default:
        modalWrap.style.top = this.props.position.y
    }
  }
  get wrapCls () {
    const {className, showCancel, showConfirm,  showClose, title} = this.props

    return classNames([
      prefixCls,
      className,
      {
        [`${prefixCls}-cancel-btn-show`]: showCancel,
        [`${prefixCls}-confirm-btn-show`]: showConfirm,
        [`${prefixCls}-close-btn-show`]: showClose,
        [`${prefixCls}-title-show`]: !!title
      }
    ])
  }
  render () {
    const { title, titleStyle, showClose, closeStyle, content, children, contentStyle, showCancel, cancelText, cancelStyle, showConfirm, confirmText, confirmStyle, cliperStyle, dlgStyle, fromInstance, cssTransitionClassName, cssTransitionTimeout, unmountOnExit } = this.props
    const contentNode = (
      <CSSTransition in={this.state.visible} appear classNames={cssTransitionClassName} timeout={cssTransitionTimeout} mountOnEnter={true} unmountOnExit={unmountOnExit} onEnter={this.onEnter} onExited={this.onExited}>
        <div className={this.wrapCls} ref={this.modal} style={cliperStyle}>
          <div className={`${prefixCls}-wrap`} ref={this.modalWrap} style={dlgStyle}>
            {title && <div className={`${prefixCls}-title`} style={titleStyle}>
              {title}
            </div>}
            {showClose && <div className={`${prefixCls}-close`} style={closeStyle} onClick={this.onClose}><svg width="11px" height="11px" viewBox="0 0 11 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-249.000000, -10.000000)"
                  fill="#999999">
                  <path d="M254.50013,14.8683272 L249.762514,10.1306735 C249.588122,9.95644215 249.305423,9.95644215 249.130794,10.1306735 C248.956402,10.3052215 248.956402,10.5880359 249.130794,10.7624255 L253.868428,15.500023 L249.130795,20.2376113 C248.956402,20.4120016 248.956402,20.6948302 249.130795,20.8692073 C249.305425,21.0435976 249.588125,21.0435976 249.76228,20.8692073 L254.499971,16.1315614 L259.237665,20.8692176 C259.411819,21.0435941 259.694768,21.0435941 259.869384,20.8692176 C260.043539,20.694828 260.043539,20.4120004 259.869384,20.2376239 L255.131668,15.4998705 L259.869205,10.7623788 C260.043598,10.5880017 260.043598,10.3053314 259.869205,10.1307828 C259.694588,9.95640572 259.411875,9.95640572 259.23772,10.1307828 L254.50013,14.8683272 Z"></path>
                </g>
              </g>
            </svg></div>}
            {(content || children) && <div className={`${prefixCls}-content`} style={contentStyle}>
              {content} {children}
            </div>}
            { (showCancel || showConfirm) && <div className={`${prefixCls}-btn`}>
              {showCancel && <div className={`${prefixCls}-cancel-btn`} style={cancelStyle} onClick={this.onCancel}>
                {cancelText}
              </div>}
              {showConfirm && <div className={`${prefixCls}-confirm-btn`} style={confirmStyle} onClick={this.onConfirm}>
                {confirmText}
              </div>}
            </div>}
          </div>
        </div>
      </CSSTransition>
    )
    return this.container && !fromInstance ? ReactDOM.createPortal(contentNode, this.container) : contentNode
  }
}

setDefaultProps(Modal, {
  // 标题
  title: {
    type: PropTypes.string
  },
  titleStyle: {
    type: PropTypes.object,
    default: {}
  },
  // closeBtn
  showClose: {
    type: PropTypes.bool,
    default: false
  },
  closeStyle: {
    type: PropTypes.object,
    default: {}
  },
  onClose: {
    type: PropTypes.func
  },
  // 内容
  content: {
    type: PropTypes.node,
    default: ''
  },
  contentStyle: {
    type: PropTypes.object
  },
  // cancelBtn
  cancelText: {
    type: PropTypes.node,
    default: '取消'
  },
  showCancel: {
    type: PropTypes.bool,
    default: true
  },
  cancelStyle: {
    type: PropTypes.object,
    default: {}
  },
  onCancel: {
    type: PropTypes.func
  },
  // confirmBtn
  confirmText: {
    type: PropTypes.node,
    default: '确定'
  },
  showConfirm: {
    type: PropTypes.bool,
    default: true
  },
  confirmStyle: {
    type: PropTypes.object,
    default: {}
  },
  onConfirm: {
    type: PropTypes.func
  },
  // 显示位置
  position: {
    type: PropTypes.object,
    default: { x: 'center', y: 'center' }
  },
  // hash变化时移除modal
  removeModalOnHashChange: {
    type: PropTypes.bool,
    default: true
  },
  // 自定义class
  className: {
    type: PropTypes.string,
    default: ''
  },
  // 可见
  visible: {
    type: PropTypes.bool,
    default: false
  },
  // cssTransition className
  cssTransitionClassName: {
    type: PropTypes.string,
    default: `${prefixCls}-fade`
  },
  // cssTransition timeout
  cssTransitionTimeout: {
    type: PropTypes.number,
    default: 300
  },
  // ummountOnExit 默认为false，表示当传入in的值为false值，CSSTransition中的元素不从dom中移除，传true时则会被移除
  unmountOnExit: {
    type: PropTypes.bool,
    default: false
  },
  // 遮罩层
  cliperStyle: {
    type: PropTypes.object
  },
  // modal框
  dlgStyle: {
    type: PropTypes.object
  }
})

Modal = withPreventScroll(Modal)
Modal = withHashChange(Modal)



export default Modal
