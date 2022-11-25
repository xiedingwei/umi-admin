import React from 'react'
import './index.less'

export default function Loading() {
  return (
    <React.Fragment>
      {/* 加载中占位 */}
      <div className='loadingBody'
      >
        <div className='traditionalLoading' />
        <div className='loadingText'>加载中</div>
      </div>
    </React.Fragment>
  )
}
