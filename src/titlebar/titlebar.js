import React, { memo } from 'react'
import PropTypes from 'prop-types'

const prefixCls = 'r-titlebar'

const Titlebar = memo(({ theme, l, title, r, children, showBackto, backArrowStyle, onBack, className }) => {
  const wrapCls = [prefixCls, `${prefixCls}-theme-${theme}`, className].filter(Boolean).join(' ')

  console.log('Titlebar mounted or updated')

  return (
    <div className={wrapCls}>
      {showBackto && <div className='l-operate' onClick={(e) => onBack && onBack(e)}>
        {l ? l : <div className="back"><svg width="10px"
          height="21px"
          style={backArrowStyle}
          viewBox="0 0 10 21"
          version="1.1">
          <g stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round">
            <g transform="translate(-16.000000, -33.000000)"
              stroke="currentColor"
            >
              <polyline id="Path-2"
                points="25.758131 34 16 43.3837058 26 53"></polyline>
            </g>
          </g>
        </svg></div>}
      </div>}
      <div className='c-operate'>
        {title || children}
      </div>
      {r && <div className='r-operate'>{r}</div>}
    </div>
  )
})
Titlebar.defaultProps = {
  theme: 'a',
  showBackto: true
}
Titlebar.propTypes = {
  theme: PropTypes.string,
  showBackto: PropTypes.bool,
  backArrowStyle: PropTypes.object
}

export default Titlebar
