import { useState, useEffect } from 'react';
import './App.css';

type Estado = 'Pendiente' | 'En Ejecucion' | 'Terminado';
interface Tarea { id: string; texto: string; estado: Estado; }

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  // 1. Almacenar y recuperar estado de localStorage
  useEffect(() => {
    const guardadas = localStorage.getItem('kanban_full_data');
    if (guardadas) setTareas(JSON.parse(guardadas));
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban_full_data', JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaTarea.trim()) return;
    const tarea: Tarea = { id: crypto.randomUUID(), texto: nuevaTarea, estado: 'Pendiente' };
    setTareas([...tareas, tarea]);
    setNuevaTarea('');
    alert('✅ ¡Tarea creada con éxito!'); // 3. Mensaje de confirmación
  };

  const eliminarTarea = (id: string) => setTareas(tareas.filter(t => t.id !== id));

  const onDrop = (e: React.DragEvent, nuevoEstado: Estado) => {
    const id = e.dataTransfer.getData('tareaId');
    setTareas(tareas.map(t => t.id === id ? { ...t, estado: nuevoEstado } : t));
  };

  // 2. Colores según saturación
  const getSaturacionClass = (cant: number) => {
    if (cant === 0) return 'libre';
    return cant > 3 ? 'saturado' : 'ocupado';
  };

  return (
    <div className="kanban-fullscreen">
      <h1>Tablero Kanban</h1>
      
      <form onSubmit={agregarTarea} className="kanban-form">
        <input value={nuevaTarea} onChange={(e) => setNuevaTarea(e.target.value)} placeholder="Escribe una tarea..." />
        <button type="submit">Agregar Tarea</button>
      </form>

      <div className="tablero">
        {(['Pendiente', 'En Ejecucion', 'Terminado'] as Estado[]).map(col => {
          const filtradas = tareas.filter(t => t.estado === col);
          return (
            <div key={col} className={`columna ${getSaturacionClass(filtradas.length)}`}
                 onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, col)}>
              <h3>{col} ({filtradas.length})</h3>
              <div className="lista">
                {filtradas.map(t => (
                  <div key={t.id} className="tarea-card" draggable 
                       onDragStart={(e) => e.dataTransfer.setData('tareaId', t.id)}>
                    <span>{t.texto}</span>
                    <button className="del-btn" onClick={() => eliminarTarea(t.id)}>x</button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;