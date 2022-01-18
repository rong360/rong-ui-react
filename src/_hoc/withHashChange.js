import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

function hashChange (WrappedComponent) {
  class HashChange extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
    static defaultProps = {
      removeDialogOnHashChange: true
    }
    static propTypes = {
      removeDialogOnHashChange: PropTypes.bool
    }
    handleRemove = () => {
      this.props.fromInstance && ReactDOM.unmountComponentAtNode(this.props.portalTarget)
    }
    componentDidMount () {
      const { removeDialogOnHashChange, fromInstance } = this.props
      removeDialogOnHashChange && fromInstance && window.addEventListener('hashchange', this.handleRemove)
      removeDialogOnHashChange && fromInstance && window.addEventListener('pushstate', this.handleRemove)
      removeDialogOnHashChange && fromInstance && window.addEventListener('replacestate', this.handleRemove)
      removeDialogOnHashChange && fromInstance && window.addEventListener('popstate', this.handleRemove)
    }
    componentWillUnmount () {
      const { removeDialogOnHashChange, fromInstance } = this.props
      removeDialogOnHashChange && fromInstance && window.removeEventListener('hashchange', this.handleRemove)
      removeDialogOnHashChange && fromInstance && window.removeEventListener('pushstate', this.handleRemove)
      removeDialogOnHashChange && fromInstance && window.removeEventListener('replacestate', this.handleRemove)
      removeDialogOnHashChange && fromInstance && window.removeEventListener('popstate', this.handleRemove)
    }
    render () {
      let { forwardedRef, ...rest } = this.props
      return <WrappedComponent ref={forwardedRef} {...rest} />
    }
  }
  return React.forwardRef((props, ref) => {
    return <HashChange {...props} forwardedRef={ref} />
  })
}

export default hashChange