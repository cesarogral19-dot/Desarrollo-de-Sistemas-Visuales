import React from 'react'

export default function FormInput({ label, error, ...props }){
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      const el = e.currentTarget
      el.classList.add('input-press')
      setTimeout(()=> el.classList.remove('input-press'), 120)
    }
    if(props.onKeyDown) props.onKeyDown(e)
  }

  return (
    <div className="form-row">
      {label && <label>{label}</label>}
      <input {...props} onKeyDown={handleKeyDown} />
      {error && <div className="error">{error}</div>}
    </div>
  )
} 
