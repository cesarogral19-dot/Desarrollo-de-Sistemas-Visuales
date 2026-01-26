import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<string[]>([])

  const addTask = () => {
    if (task.trim() === '') return
    setTasks([...tasks, task])
    setTask('')
  }

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div className="app-container">
      <h1>Actvidades a Realizar</h1>

      <div className="form">
        <input
          type="text"
          placeholder=" Escribe los pendientes"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>➕ Agregar</button>
      </div>

      <div className="list">
        {tasks.map((t, i) => (
          <div className="list-item" key={i}>
            <span>📌 {t}</span>
            <button onClick={() => deleteTask(i)}>✖</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;