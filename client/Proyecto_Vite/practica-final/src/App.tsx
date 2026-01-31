import React, { useState, useEffect } from 'react';
import './App.css';

interface Item {
  id: string;
  name: string;
  value: number;
  category: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('inventory-app');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [form, setForm] = useState({ name: '', value: '' });
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [isSaving, setIsSaving] = useState(false);

  // 1. Temporizador de Guardado Automático
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('inventory-app', JSON.stringify(items));
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 1500);
    }, 1000);
    return () => clearTimeout(timer);
  }, [items]);

  // 2. Función para Añadir
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.length < 2 || Number(form.value) <= 0) {
      setMsg({ text: 'Nombre inválido o valor debe ser mayor a 0', type: 'error' });
      return;
    }
    const newItem: Item = {
      id: Math.random().toString(36),
      name: form.name,
      value: Number(form.value),
      category: 'storage'
    };
    setItems([...items, newItem]);
    setForm({ name: '', value: '' });
    setMsg({ text: '¡Objeto registrado con éxito!', type: 'success' });
    setTimeout(() => setMsg({ text: '', type: '' }), 3000);
  };

  // 3. Funciones de Drag and Drop
  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('itemId', id);
  };

  const onDrop = (e: React.DragEvent, targetCat: string) => {
    const id = e.dataTransfer.getData('itemId');
    setItems(items.map(item => item.id === id ? { ...item, category: targetCat } : item));
  };

  // 4. Función para Eliminar (Ubicada correctamente)
  const removeItem = (id: string) => {
    const filteredItems = items.filter(item => item.id !== id);
    setItems(filteredItems);
    setMsg({ text: 'Objeto eliminado del almacén', type: 'error' });
    setTimeout(() => setMsg({ text: '', type: '' }), 2000);
  };

  return (
    <div className="container">
      <header>
        <h1>Mi <span className="highlight">Almacén</span></h1>
        <div className={`status ${isSaving ? 'active' : ''}`}>
          {isSaving ? '☁️ Sincronizando...' : '✔️ Guardado'}
        </div>
      </header>

      <form onSubmit={handleAdd} className="inventory-form">
        <input 
          placeholder="Nombre del objeto" 
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <input 
          type="number" 
          placeholder="Valor ($)" 
          value={form.value}
          onChange={e => setForm({...form, value: e.target.value})}
        />
        <button type="submit">Añadir al Almacén</button>
      </form>

      {msg.text && <p className={`msg ${msg.type}`}>{msg.text}</p>}

      <div className="zones">
        {['storage', 'equipped'].map(cat => (
          <div 
            key={cat}
            className={`drop-zone ${cat}`}
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(e, cat)}
          >
            <h3>{cat === 'storage' ? '📦 Almacén' : '📤 Objeto a sacar del almacén'}</h3>
            <div className="item-list">
              {items.filter(i => i.category === cat).map(item => (
                <div 
                  key={item.id}
                  draggable
                  onDragStart={e => onDragStart(e, item.id)}
                  className="item-card pulse-anim"
                >
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="price">${item.value}</span>
                  </div>
                  
                 
                  <button 
                    className="delete-btn" 
                    onClick={() => removeItem(item.id)}
                    title="Eliminar"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;