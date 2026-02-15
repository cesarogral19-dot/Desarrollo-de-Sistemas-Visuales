import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import FormInput from '../components/FormInput'
import { AuthContext } from '../context/AuthContext'
import { validateLogin } from '../middleware/validate'
import illustration from '../assets/login-illustration.svg'

export default function Login(){
  const { login } = useContext(AuthContext)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  useEffect(()=>{
    const draft = localStorage.getItem('login-draft')
    if(draft) setForm(JSON.parse(draft))
  },[])

  useEffect(()=>{ 
    localStorage.setItem('login-draft', JSON.stringify(form)) 
  }, [form])

  const onChange = e => 
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) =>{
    e.preventDefault()
    const v = validateLogin(form)
    setErrors(v)
    if(Object.keys(v).length) return
    setLoading(true)
    try{
      await login(form)
      localStorage.removeItem('login-draft')
      nav('/reports')
    }catch(err){
      setErrors({ 
        general: err?.response?.data?.message || 'Credenciales inválidas' 
      })
    }finally{ 
      setLoading(false) 
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <img src={illustration} alt="login" style={styles.image} />
        <h2 style={styles.title}>Sistema Empresarial</h2>
        <p style={styles.subtitle}>Inicia sesión para continuar</p>

        <Link to="/register" style={styles.link}>
          ¿No tienes cuenta? Regístrate
        </Link>

        <form onSubmit={onSubmit}>
          <FormInput 
            name="email" 
            value={form.email} 
            onChange={onChange} 
            label="Email" 
            placeholder="user@example.com" 
            error={errors.email} 
          />

          <FormInput 
            name="password" 
            type="password" 
            value={form.password} 
            onChange={onChange} 
            label="Contraseña" 
            error={errors.password} 
          />

          {errors.general && 
            <div style={styles.error}>{errors.general}</div>
          }

          <button style={styles.button} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #1e3a8a, #f97316)',
    animation: 'fadeIn 0.6s ease-in'
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    width: '350px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    textAlign: 'center'
  },
  image: {
    width: '120px',
    marginBottom: '20px'
  },
  title: {
    margin: 0,
    color: '#1e3a8a'
  },
  subtitle: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '20px'
  },
  link: {
    display: 'block',
    marginBottom: '20px',
    color: '#f97316',
    textDecoration: 'none'
  },
  button: {
    width: '100%',
    padding: '10px',
    marginTop: '15px',
    background: '#1e3a8a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: '0.2s'
  },
  error: {
    color: 'red',
    marginTop: '10px'
  }
}
