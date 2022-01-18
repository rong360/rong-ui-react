import createToast, { setGlobalConfig } from './createToast'

const negetiveToast = (options) => {
  if (typeof options === 'string') {
    options = {
      content: options
    }
  }
  options.type = 'negetive'
  createToast(options)
}

const positiveToast = (options) => {
  if (typeof options === 'string') {
    options = {
      content: options
    }
  }
  options.type = 'positive'
  createToast(options)
}

const Toast = {
  create: createToast,
  config: setGlobalConfig,
  negetive: negetiveToast,
  positive: positiveToast
}
export default Toast