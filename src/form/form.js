import React from 'react'
import PropTypes from 'prop-types'
import { setDefaultProps, classNames } from '../_util/assist'
import { Provider } from './formContext'

const prefixCls = 'r-form'

class Form extends React.PureComponent {
  constructor(props) {
    super(props)

    this.addField = (field) => {
      this.setState(state => ({
        fields: state.fields.concat(field)
      }), () => {
        this.onFieldsChange(this.state.fields)
      })
    }

    this.removeField = (field) => {
      this.setState(state => {
        let fields = [...state.fields]
        fields.splice(fields.indexOf(field), 1)
        return {
          fields: fields
        }
      }, () => {
        this.onFieldsChange(this.state.fields)
      })
    }

    this.state = {
      ...this.props,
      fields: [],
      addField: this.addField,
      removeField: this.removeField,
      onChange: this.onChange
    }

  }
  render () {
    console.log('Form mounted or updated')
    return <div className={this.wrapCls}>
      <Provider value={this.state}>{this.props.children}</Provider>
    </div>
  }
  get wrapCls () {
    return classNames([
      `${prefixCls}`,
      this.props.className
    ])
  }
  onChange = (obj) => {
    this.props.onChange(obj)
    this.onFieldsChange()
  }
  onFieldsChange () {
    this.props.onFieldsChange(this.state.fields)
    this.checkCompleted()
  }
  checkCompleted () {
    let isCompleted = this.state.fields.every(field => {
      return field.fieldRules.length ? field.state.value !== '' : true
    })
    this.props.onComplete({ isCompleted, component: this })
  }
  validate (callback) {
    return new Promise(resolve => {
      let valid = true
      let validateMessage = []
      let firstInvalidField = null
      let count = 0
      this.state.fields.forEach(field => {
        field.validate('', errors => {
          if (errors) {
            valid = false
            if (!firstInvalidField) {
              firstInvalidField = field
            }
            validateMessage.push(errors)
          }
          if (++count === this.state.fields.length) {
            resolve(valid, errors)
            if (typeof callback === 'function') {
              callback(valid, validateMessage)
              firstInvalidField && firstInvalidField.$el.scrollIntoView()
            }
          }
        })
      })
    })
  }
  validateOneByOne (callback) {
    return new Promise(resolve => {
      let fields = [...this.state.fields]
      function next (fields = []) {
        let field = fields.shift()
        if (field) {
          field.validate('', errors => {
            if (!errors) {
              next(fields)
            } else {
              callback && callback(false, errors)
              resolve(false, errors)
              field.$el.scrollIntoView()
            }
          })
        } else {
          callback && callback(true)
          resolve(true)
        }
      }
      next(fields)
    })
  }
  /* 获取表单数据 */
  getValue () {
    return this.state.fields.map(field => field.getValue())
  }
  getSerializeValue () {
    let fieldsValue = this.getValue()
    return fieldsValue.map(obj => obj.name + '=' + obj.value).join('&')
  }
  getObjectValue () {
    let fieldsValue = this.getValue()
    return Object.assign({}, ...fieldsValue.map(obj => ({ [obj.name]: obj.value })))
  }
  resetFields () {
    this.state.fields.forEach(field => field.resetField())
  }
}

setDefaultProps(Form, {
  placeholder: {
    type: PropTypes.string
  },
  labelPosition: {
    type: PropTypes.oneOf(['left', 'right', 'top'])
  },
  labelWidth: {
    type: PropTypes.string
  },
  textPosition: {
    type: PropTypes.oneOf(['left', 'center', 'right'])
  },
  inputClearStyle: {
    type: PropTypes.object
  },
  // 是否显示校验错误信息
  showMessage: {
    type: PropTypes.bool,
    default: true
  },
  className: {
    type: PropTypes.string
  },
  mode: {
    type: PropTypes.string
  },
  onComplete: {
    type: PropTypes.func,
    default: () => { }
  },
  onChange: {
    type: PropTypes.func,
    default: () => { }
  },
  onFieldsChange: {
    type: PropTypes.func,
    default: () => { }
  },
  selectCancelBtnText: {
    type: PropTypes.string
  },
  selectConfirmBtnText: {
    type: PropTypes.string
  },
  selectArrowStyle: {
    type: PropTypes.object
  }
})

export default Form
