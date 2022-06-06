import React from 'react'

function BtnRequest( {obj, handleRequest} ) {
  return (
    <button style={{backgroundColor: '#4d8dff', border: '1px solid #fff', borderRadius: '2rem', fontSize: '1.4rem', color: '#fff', width: '14rem', height: '4rem'}} id="btnYC" onClick={() => handleRequest(obj)} >Yêu cầu tư vấn</button>
  )
}

export default BtnRequest;