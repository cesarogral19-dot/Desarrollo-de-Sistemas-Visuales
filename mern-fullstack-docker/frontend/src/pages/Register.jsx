import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import { AuthContext } from '../context/AuthContext'
import { validateRegister } from '../middleware/validate'

export default function Register(){
  const { register } = useContext(AuthContext)

  const [form, setForm] = useState({ 
    firstName:'', 
    lastName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  useEffect(()=>{
    const draft = localStorage.getItem('register-draft')
    if(draft) setForm(JSON.parse(draft))
  },[])

  useEffect(()=>{ 
    localStorage.setItem('register-draft', JSON.stringify(form)) 
  }, [form])

  const onChange = e => 
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) =>{
    e.preventDefault()

    const v = validateRegister(form)
    setErrors(v)
    if(Object.keys(v).length) return

    setLoading(true)

    try{
      const payload = {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password
      }

      await register(payload)

      localStorage.removeItem('register-draft')
      nav('/dashboard')

    }catch(err){
      setErrors({ 
        general: err?.response?.data?.message || 'Error en el registro' 
      })
    }finally{ 
      setLoading(false) 
    }
  }

  return (
    <div className="page-register">
      <div className="card register-card">
        <h2>Crear Cuenta</h2>

        <form onSubmit={onSubmit}>
          <FormInput name="firstName" value={form.firstName} onChange={onChange} label="Nombre" error={errors.firstName} />
          <FormInput name="lastName" value={form.lastName} onChange={onChange} label="Apellido" error={errors.lastName} />
          <FormInput name="email" value={form.email} onChange={onChange} label="Email" error={errors.email} />
          <FormInput name="password" type="password" value={form.password} onChange={onChange} label="Contraseña" error={errors.password} />
          <FormInput name="confirmPassword" type="password" value={form.confirmPassword} onChange={onChange} label="Confirmar Contraseña" error={errors.confirmPassword} />

          {errors.general && (
            <div className="error">{errors.general}</div>
          )}

          <button disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarme'}
          </button>
        </form>
      </div>
    </div>
  )
}
