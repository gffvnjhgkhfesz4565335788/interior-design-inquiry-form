'use client';

import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState({ name: '', address: '', scope: '' });
  const [status, setStatus] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('Submitted!');
        setData({ name: '', address: '', scope: '' });
      } else {
        const err = await res.json();
        setStatus(`Error: ${JSON.stringify(err)}`);
      }
    } catch (e) {
      setStatus('Submission failed.');
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Interior Design Inquiry</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
        <input value={data.name} onChange={(e) => setData({...data, name: e.target.value})} placeholder="Name" required />
        <textarea value={data.address} onChange={(e) => setData({...data, address: e.target.value})} placeholder="Address" required />
        <textarea value={data.scope} onChange={(e) => setData({...data, scope: e.target.value})} placeholder="Project Scope" required />
        <button type="submit">Submit</button>
      </form>
      <p>{status}</p>
    </main>
  );
}
