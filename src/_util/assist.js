export function setDefaultProps(component, props = {}) {
  let defaultProps = {}
  let propTypes = {}
  for (let key in props) {
    defaultProps[key] = props[key].default
    propTypes[key] = props[key].type
  }
  component['defaultProps'] = defaultProps
  component['propTypes'] = propTypes
}

export function classNames(classes = []) {
  let arr = []
  classes.forEach(item => {
    if (typeof item === 'object') {
      for (let key in item) {
        if (item[key] === true) {
          arr.push(key)
        }
      }
    } else {
      arr.push(item)
    }
  })

  return arr.filter(Boolean).join(' ')
}