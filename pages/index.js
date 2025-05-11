// pages/index.js

import { useState } from 'react';

export default function Home() {
  const [links, setLinks] = useState('');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(null);

  const API_TOKEN = "O5GZF-HMDGI-6N32S-18VGK-H6CWI-CPPB6";

  const handleSubmit = async () => {
    const list = links.split('\n').map(l => l.trim()).filter(l => l !== '');

    const res = await fetch(`/api/links?api_token=${API_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ links: list }),
    });

    const data = await res.json();
    setMessage(`Enlaces agregados. Total ahora: ${data.total}`);
    setLinks('');
  };

  const checkCount = async () => {
    const res = await fetch(`/api/links?action=count&api_token=${API_TOKEN}`);
    const data = await res.json();
    setCount(data.total);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Panel de enlaces</h1>
      <textarea
        rows={10}
        cols={50}
        value={links}
        onChange={e => setLinks(e.target.value)}
        placeholder="Pega aquí los enlaces, uno por línea"
      />
      <br />
      <button onClick={handleSubmit}>Subir Enlaces</button>
      <button onClick={checkCount} style={{ marginLeft: 10 }}>Ver Cantidad</button>
      <p>{message}</p>
      {count !== null && <p>Total de enlaces disponibles: {count}</p>}
    </div>
  );
}
