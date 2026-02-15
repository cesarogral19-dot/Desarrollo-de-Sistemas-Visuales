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
        <div className="header">
          <h2>Dashboard actualizado</h2>
          <div>
            Bienvenido, <strong>{user?.name}</strong>
            <br />
            <Link to="/register" style={{ 
              display: 'inline-block',
              marginTop: '10px',
              padding: '8px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}>
              + Registrar Nuevo Usuario
            </Link>
         
            <Link to="/register" style={{ 
              display: 'inline-block',
              marginTop: '10px',
              padding: '8px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              Registrar Nuevo Usuario
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
                      <button style={{ marginLeft: 8 }} onClick={() => onApprove(r._id)}>
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
