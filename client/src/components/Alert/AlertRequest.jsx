import React, { forwardRef } from 'react'

function AlertRequest(props, ref) {
  return (
    <div style={{display: 'none'}} className="blur" id="identify" ref={ref}>
            <div className="blur_overllay" />
            <div className="identify_alert">
              <span className="identify_alert-text">Bạn phải đăng nhập mới được sử dụng tính năng này</span>
              <button onClick={() => document.querySelector('#identify').style.display = 'none'} className="identify_alert-btn">OK</button>
            </div>
    </div>
  )
}

export default forwardRef(AlertRequest);