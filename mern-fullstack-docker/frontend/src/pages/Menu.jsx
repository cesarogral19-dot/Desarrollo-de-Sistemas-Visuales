import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Menu() {
  const [crepas, setCrepas] = useState([])

  useEffect(() => {
    api.get('/crepas').then(res => setCrepas(res.data))
  }, [])

  return (
    <div className="container">
      <h2>Menú de Crepas 🥞</h2>
      <div className="grid">
        {crepas.map(c => (
          <div key={c._id} className="card">
            <h3>{c.name}</h3>
            <p>{c.description}</p>
            <strong>${c.price}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
