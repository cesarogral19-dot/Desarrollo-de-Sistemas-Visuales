import React, { useEffect, useState } from 'react'
import * as usersService from '../services/users'

export default function AdminPanel(){
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await usersService.listUsers()
        setUsers(res.data)
      }catch(err){ console.error(err) }
      setLoading(false)
    })()
  },[])

  const changeRole = async (id, role) => {
    try{
      const res = await usersService.updateUser(id, { role })
      setUsers(users.map(u => u._id === id ? res.data : u))
    }catch(err){ console.error(err); alert('No se pudo actualizar') }
  }

  return (
    <div className="container fade-in">
      <div className="card">
        <h2>Panel de Administrador</h2>
        <p>Gestión de usuarios y roles.</p>
        {loading ? <div>Cargando usuarios...</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Acción</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} style={{ borderTop: '1px solid rgba(255,255,255,0.02)' }}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <select value={u.role} onChange={(e) => changeRole(u._id, e.target.value)}>
                      <option>ADMIN</option>
                      <option>MANAGER</option>
                      <option>USER</option>
                      <option>SUPPORT</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
} 
