import createModel from './createModal'

let globalConfig = {
  confirmText: '我知道了'
}

const tip = (options) => {
  if (typeof options === 'string') options = { content: options }
  options.showCancel = false
  if (!options.confirmText) options.confirmText = globalConfig.confirmText
  return createModel(options)
}

tip.config = function (options = {}) {
  globalConfig = Object.assign(globalConfig, options)
}

export default tip