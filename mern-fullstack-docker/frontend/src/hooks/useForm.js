import { useState } from 'react'

export default function useForm(initial, key){
  const [values, setValues] = useState(()=>{
    if(!key) return initial
    try{ const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial }catch(e){ return initial }
  })
  const setField = (name, value) => setValues(v => { const next = { ...v, [name]: value }; if(key) localStorage.setItem(key, JSON.stringify(next)); return next })
  const reset = () => { setValues(initial); if(key) localStorage.removeItem(key) }
  return { values, setValues, setField, reset }
}
