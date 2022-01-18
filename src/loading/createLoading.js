import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Modal from '../modal'
import { classNames } from '../_util/assist'
import LoadingCircle from '../icons/loading-circle'

const prefixCls = 'r-loading'

let globalConfig = {
  icon: <LoadingCircle />
}

const LoadingBox = forwardRef((props, ref) => {
  const { icon: defaultIcon, text: defaultText, textStyle } = props
  const [icon, setIcon] = useState(defaultIcon)
  const [text, setText] = useState(defaultText)

  useImperativeHandle(ref, () => ({
    setIcon: (icon) => setIcon(icon),
    setText: (text) => setText(text)
  }))

  return <>
    {icon}
    {text && <div className='loading-text' style={textStyle}>
      {text}
    </div>}
  </>
})

const createLoading = (options = {}) => {
  const { icon, text, textStyle } = options
  let loadingBox

  options = Object.assign({
    content: <LoadingBox
      icon={icon || globalConfig.icon}
      text={text || globalConfig.text}
      textStyle={textStyle}
      ref={(el) => loadingBox = el}
    />,
    showCancel: false,
    showConfirm: false
  }, options)

  options.className = classNames([prefixCls, options.className])

  const loading = Modal.create(options)

  loading.update = ({ icon, text } = {}) => {
    if (icon) loadingBox.setIcon(icon)
    if (text) loadingBox.setText(text)
  }

  return loading
}

export const setGlobalConfig = (options = {}) => {
  globalConfig = Object.assign(globalConfig, options)
}


export default createLoading