import { useEffect, useMemo, useRef, useState } from 'react';

interface Registro {
  id: string;
  nombre: string;
  matricula: string;
  carrera: string;
  turno: string;
  fecha: string;
}

export default function App() {
  const [nombre, setNombre] = useState<string>('');
  const [matricula, setMatricula] = useState<string>('');
  const [turno, setTurno] = useState<'matutino' | 'vespertino'>('matutino');
  const [aceptaTerminos, setAceptaTerminos] = useState<boolean>(false);
  const [carrera, setCarrera] = useState<string>('ISC');
  const [seccion, setSeccion] = useState<'registro' | 'ayuda'>('registro');
  const [progreso, setProgreso] = useState<number>(0);
  const [corriendo, setCorriendo] = useState<boolean>(false);
  const [listaRegistros, setListaRegistros] = useState<Registro[]>([]);

  const nombreRef = useRef<HTMLInputElement | null>(null);

  // --- LOCAL STORAGE ---
  useEffect(() => {
    const datosGuardados = localStorage.getItem('registros_sv');
    if (datosGuardados) setListaRegistros(JSON.parse(datosGuardados));
  }, []);

  useEffect(() => {
    localStorage.setItem('registros_sv', JSON.stringify(listaRegistros));
  }, [listaRegistros]);

  // --- TEMPORIZADOR ---
  useEffect(() => {
    if (!corriendo) return;
    const id = window.setInterval(() => {
      setProgreso((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 200);
    return () => window.clearInterval(id);
  }, [corriendo]);

  const formularioValido = useMemo(() => {
    return nombre.trim().length >= 3 && matricula.trim().length >= 6 && aceptaTerminos;
  }, [nombre, matricula, aceptaTerminos]);

  const registrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formularioValido) return;

    const nuevo: Registro = {
      id: crypto.randomUUID(),
      nombre,
      matricula,
      carrera,
      turno,
      fecha: new Date().toLocaleString()
    };

    setListaRegistros([nuevo, ...listaRegistros]);
    setCorriendo(true);
    setProgreso(0);
    setNombre('');
    setMatricula('');
    setAceptaTerminos(false);
    nombreRef.current?.focus();
  };

  const eliminarRegistro = (id: string) => {
    setListaRegistros(listaRegistros.filter(r => r.id !== id));
  };

  return (
    <div className="main-layout">
      <header className="header-app">
        <div className="logo-box">SV</div>
        <div>
          <h1>Sistemas Visuales</h1>
          <p>Módulo de Registro Profesional</p>
        </div>
      </header>

      <nav className="nav-menu">
        <button className={seccion === 'registro' ? 'active' : ''} onClick={() => setSeccion('registro')}>Registro</button>
        <button className={seccion === 'ayuda' ? 'active' : ''} onClick={() => setSeccion('ayuda')}>Ayuda</button>
      </nav>

      <main className="content">
        {seccion === 'registro' ? (
          <div className="grid-container">
            {/* Formulario */}
            <section className="card-form">
              <h2>Nuevo Alumno</h2>
              <form onSubmit={registrar}>
                <div className="field">
                  <label>Nombre Completo</label>
                  <input ref={nombreRef} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Juan Pérez" />
                </div>
                <div className="field">
                  <label>Matrícula</label>
                  <input value={matricula} onChange={(e) => setMatricula(e.target.value)} placeholder="Mín. 6 caracteres" />
                </div>
                <div className="field">
                  <label>Carrera</label>
                  <select value={carrera} onChange={(e) => setCarrera(e.target.value)}>
                    <option value="ISC">Ing. Sistemas</option>
                    <option value="ITI">Tec. Información</option>
                    <option value="IG">Ing. Industrial</option>
                  </select>
                </div>
                <div className="field-row">
                  <label><input type="radio" checked={turno === 'matutino'} onChange={() => setTurno('matutino')} /> Matutino</label>
                  <label><input type="radio" checked={turno === 'vespertino'} onChange={() => setTurno('vespertino')} /> Vespertino</label>
                </div>
                <div className="field-row">
                  <label><input type="checkbox" checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} /> Acepto términos</label>
                </div>
                <button type="submit" className="btn-save" disabled={!formularioValido}>Guardar Registro</button>
              </form>

              <div className="progress-container">
                <p>Progreso de carga: {progreso}%</p>
                <div className="progress-bar"><div className="fill" style={{ width: `${progreso}%` }}></div></div>
              </div>
            </section>

            {/* Tabla de Registros */}
            <section className="card-list">
              <h2>Registros en LocalStorage</h2>
              <div className="table-wrapper">
                {listaRegistros.length === 0 ? <p>No hay datos guardados.</p> : (
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Carrera</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaRegistros.map(r => (
                        <tr key={r.id}>
                          <td>{r.nombre}</td>
                          <td>{r.carrera}</td>
                          <td><button className="btn-del" onClick={() => eliminarRegistro(r.id)}>×</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </div>
        ) : (
          <section className="card-help">
            <h2>Ayuda</h2>
            <p>Este sistema utiliza <b>LocalStorage</b> para persistir los datos aunque cierres el navegador.</p>
          </section>
        )}
      </main>
    </div>
  );
}