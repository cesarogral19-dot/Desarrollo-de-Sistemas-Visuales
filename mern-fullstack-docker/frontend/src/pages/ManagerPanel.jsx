import React, { useEffect, useState } from 'react'
import * as requestsService from '../services/requests'

export default function ManagerPanel(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await requestsService.getRequests()
        setItems(res.data)
      }catch(err){ console.error(err) }
      setLoading(false)
    })()
  },[])

  const onApprove = async (id) => {
    try{
      await requestsService.approveRequest(id)
      setItems(items.map(i => i._id === id ? { ...i, status: i.status === 'OPEN' ? 'PENDING' : 'CLOSED' } : i))
    }catch(err){ console.error(err); alert('No autorizado o error') }
  }

  return (
    <div className="container fade-in">
      <div className="card">
        <h2>Panel Manager</h2>
        <p>Vista para aprobación y gestión de solicitudes.</p>
        {loading ? <div>Loading...</div> : (
          <div>
            {items.length === 0 ? <p>No hay solicitudes.</p> : (
              <ul>
                {items.map(r => (
                  <li key={r._id} style={{ marginBottom: 8 }}>
                    <strong>{r.title}</strong> — {r.status} — ${r.amount}
                    <button style={{ marginLeft: 8 }} onClick={() => onApprove(r._id)}>Aprobar / Cambiar estado</button>
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
