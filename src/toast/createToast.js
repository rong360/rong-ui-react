import React from 'react'
import Modal from '../modal'
import { classNames } from '../_util/assist'

const prefixCls = 'r-toast'

let globalConfig = {
  time: 2000
}

const icon = {
  positive: <svg width="1em" height="1em" viewBox="0 0 30 30">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-77.000000, -20.000000)" fill="currentColor">
        <g>
          <g transform="translate(77.000000, 20.000000)">
            <path d="M13.4659914,17.5856229 L9.558401,13.7544462 C8.969842,13.177381 8.015575,13.177381 7.427016,13.7544462 C6.8383645,14.3315115 6.8383645,15.2671279 7.427016,15.8441931 L12.4001555,20.7200817 C12.6945765,21.0087531 13.080283,21.1530194 13.4659895,21.1530194 C13.851696,21.1530194 14.2374025,21.0087531 14.531682,20.7202205 L23.057296,12.3613126 C23.645855,11.7842341 23.645855,10.848631 23.057296,10.2715923 C22.468737,9.69452705 21.5144885,9.69452705 20.9259295,10.2715923 L13.4659914,17.5856229 Z M15.000032,0.00322180328 C23.284256,0.00322180328 30,6.6099182 30,14.7597531 C30,22.9095261 23.284256,29.5162534 15.000032,29.5162534 C6.715712,29.5162534 -3.19999999e-05,22.9095261 -3.19999999e-05,14.7597531 C-3.19999999e-05,6.6099182 6.715712,0.00322180328 15.000032,0.00322180328 Z"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>,
  negetive: <svg width="1em" height="1em" viewBox="0 0 30 30">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-77.000000, -20.000000)" fill="currentColor">
        <path d="M92.999937,20 C101.28427,20 107,26.7157122 107,35.0000315 C107,43.2842878 100.28427,50 91.999937,50 C83.7157296,50 77,43.2842878 77,35.0000315 C77,26.7157122 84.7157296,20 92.999937,20 Z M91.99995,40.500039 C91.1715594,40.500039 90.4999667,41.1716022 90.4999667,42.0000005 C90.4999667,42.8284513 91.1715594,43.5000145 91.99995,43.5000145 C92.8284396,43.5000145 93.4999334,42.8284513 93.4999334,42.0000005 C93.4999334,41.1716022 92.8284396,40.500039 91.99995,40.500039 Z M91.99995,27.4999935 C91.1715594,27.4999935 90.4999667,28.1715917 90.4999667,29.0000075 L90.4999667,37.0000005 C90.4999667,37.8284513 91.1715594,38.5000145 91.99995,38.5000145 C92.8284396,38.5000145 93.4999334,37.8284513 93.4999334,37.0000005 L93.4999334,29.0000075 C93.4999334,28.1715917 92.8284396,27.4999935 91.99995,27.4999935 Z"></path>
      </g>
    </g>
  </svg>
}

const createToast = (options) => {
  if (typeof options === 'string') {
    options = {
      content: options
    }
  }

  options = Object.assign({
    type: 'long',
    showCancel: false,
    showConfirm: false
  }, options)

  options.className = classNames([prefixCls, options.className, `${prefixCls}-${options.type}`])

  if (options.type === 'positive' || options.type === 'negetive') {
    options.content = <>
      <div className={`${prefixCls}-icon`}>{icon[options.type]}</div>
      {options.content}
    </>
  }

  let toast = Modal.create(options)

  setTimeout(() => {
    toast.remove()
    options.callback && options.callback()
  }, options.time || globalConfig.time);

  return toast
}

export const setGlobalConfig = (options = {}) => {
  globalConfig = Object.assign(globalConfig, options)
}

export default createToast