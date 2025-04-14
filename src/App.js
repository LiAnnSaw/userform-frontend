import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  const fetchSubmissions = async () => {
    const response = await fetch('http://localhost:8080/api/submissions');
    const data = await response.json();
    setSubmissions(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setForm({ name: '', email: '' });
      fetchSubmissions();
    } else {
      alert('Submission failed.');
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Submissions</h2>
      <ul>
        {submissions.map((s) => (
          <li key={s.id}>
            {s.name} ({s.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
