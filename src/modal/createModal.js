import React from 'react'
import Modal from './modal'
import ReactDOM from 'react-dom'


const create = (options) => {
  if (typeof options === 'string') options = { content: options }

  let { target, ...other } = options
  let container = target || document.querySelector('#portal-target')
  let modalRef = React.createRef()
  if (!container) {
    container = document.createElement('div')
    container.id = 'portal-target'
    document.body.appendChild(container)
  }
  if (!other.onConfirm) other.onConfirm = function () { this.remove() }
  if (!other.onCancel) other.onCancel = function () { this.remove() }
  if (!other.onClose) other.onClose = function () { this.remove() }

  other.target = container
  other.fromInstance = true
  other.visible = true
  ReactDOM.render(<Modal ref={modalRef} {...other} />, container)

  // ReactDOM.render 不一定是同步的， $dialog直接返回ref，有可能返回的值为null
  return {
    remove () {
      modalRef.current&&modalRef.current.remove()
    },
    querySelector (selectors) {
      return modalRef.current.container.querySelector(selectors)
    }
  }
}


export default create