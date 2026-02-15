import React, { useState, useEffect } from 'react'
import FormInput from '../components/FormInput'
import { validateRequestForm } from '../middleware/validate'
import * as requestsService from '../services/requests'

export default function RequestForm(){
  const [form, setForm] = useState({ title:'', description:'', amount:0 })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const draft = localStorage.getItem('request-draft')
    if(draft) setForm(JSON.parse(draft))
  },[])
  useEffect(()=>{ localStorage.setItem('request-draft', JSON.stringify(form)) }, [form])

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) =>{
    e.preventDefault()
    const v = validateRequestForm(form)
    setErrors(v)
    if(Object.keys(v).length) return
    setLoading(true)
    try{
      await requestsService.createRequest(form)
      localStorage.removeItem('request-draft')
      setForm({ title:'', description:'', amount:0 })
      alert('Solicitud creada')
    }catch(err){
      setErrors({ general: err?.response?.data?.message || 'Error creando solicitud' })
    }finally{ setLoading(false) }
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Nueva Solicitud</h3>
        <form onSubmit={onSubmit}>
          <FormInput name="title" value={form.title} onChange={onChange} label="Título" />
          <div className="form-row">
            <label>Descripción</label>
            <textarea name="description" value={form.description} onChange={onChange} rows={4}></textarea>
            {errors.description && <div className="error">{errors.description}</div>}
          </div>
          <FormInput name="amount" type="number" value={form.amount} onChange={onChange} label="Monto (USD)" />
          {errors.general && <div className="error">{errors.general}</div>}
          <button className="btn-press" disabled={loading}>{loading ? 'Guardando...' : 'Enviar solicitud'}</button>
        </form>
      </div>
    </div>
  )
}
