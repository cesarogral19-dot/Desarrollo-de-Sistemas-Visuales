import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import * as requestsService from '../services/requests'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const { user } = useContext(AuthContext)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await requestsService.getRequests()
        setRequests(res.data)
      }catch(err){ console.error(err) }
      setLoading(false)
    })()
  },[])

  const onApprove = async (id) => {
    try{
      await requestsService.approveRequest(id)
      setRequests(requests.map(r =>
        r._id === id
          ? { ...r, status: r.status === 'OPEN' ? 'PENDING' : 'CLOSED' }
          : r
      ))
    }catch(err){ console.error(err); alert('Error al aprobar') }
  }

  return (
    <div className="container fade-in">
      <div className="card">
        <div className="header" style={{ textAlign: 'center' }}>
          <h2>Dashboard actualizado</h2>
          <p>Bienvenido, <strong>{user?.name}</strong></p>

          {/* BOTONES CENTRADOS */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginTop: '15px'
          }}>
            <Link 
              to="/login"
              style={{ 
                padding: '10px 18px',
                backgroundColor: '#64748b',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px'
              }}
            >
              Volver al Login
            </Link>

            <Link 
              to="/register"
              style={{ 
                padding: '10px 18px',
                backgroundColor: '#1e3a8a',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px'
              }}
            >
              Registrar Usuario
            </Link>
          </div>
        </div>

        {loading ? <div>Loading...</div> : (
          <div>
            {requests.length === 0 ? <p>No hay solicitudes aún.</p> : (
              <ul>
                {requests.map((r, index) => (
                  <li key={r._id || r.id || index}>
                    <strong>{r.title}</strong> — {r.status} — {r.amount} USD
                    {user && (user.role === 'MANAGER' || user.role === 'ADMIN') && (
                      <button 
                        style={{ marginLeft: 8 }} 
                        onClick={() => onApprove(r._id)}
                      >
                        Aprobar
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
