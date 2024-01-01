import React from 'react'

const Alert = (props) => {
  const capitalise=(text)=>{
    if(text==='danger') text='error';
    return text[0].toUpperCase()+text.slice(1);
  }

  return (
    <div style={{height:"40px",marginTop:"4px"}}>
      { props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
            {capitalise(props.alert.type)} : {props.alert.msg}
      </div>}
    </div>
  )
}

export default Alert
