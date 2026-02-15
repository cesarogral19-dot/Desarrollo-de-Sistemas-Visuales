import React, { useEffect, useState } from 'react'
import * as requestsService from '../services/requests'

export default function SupportPanel(){
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

  return (
    <div className="container fade-in">
      <div className="card">
        <h2>Panel Support</h2>
        <p>Vista de soporte — listar y anotar solicitudes (demo).</p>
        {loading ? <div>Loading...</div> : (
          <div>
            {items.length === 0 ? <p>No hay solicitudes.</p> : (
              <ul>
                {items.map(r => (
                  <li key={r._id}><strong>{r.title}</strong> — {r.status} — ${r.amount}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
