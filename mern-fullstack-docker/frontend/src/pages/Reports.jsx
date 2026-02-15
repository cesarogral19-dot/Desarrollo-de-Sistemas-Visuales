import React, { useEffect, useState } from "react";

export default function Reports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/reports")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-reports">
      <div className="card reports-card">
        <h2>Reporte Empresarial</h2>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong> — ${item.amount}
              </li>
            ))}
          </ul>
        )}

        <br />

        <a
          href="http://localhost:3000/api/reports/export/pdf"
          target="_blank"
          rel="noreferrer"
        >
          <button>Exportar PDF</button>
        </a>
      </div>
    </div>
  );
}
