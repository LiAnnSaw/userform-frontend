import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  //Dynamically use local or deployed backend
  const backendUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:8080'
      : 'https://userform-backend.onrender.com';

  //React Hook - run once when component mounts
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/submissions`);
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
      }
    };

    fetchSubmissions();
  }, [backendUrl]); // Add backendUrl to avoid eslint warning

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setForm({ name: '', email: '' });

        // Refresh the submissions list
        const updated = await fetch(`${backendUrl}/api/submissions`);
        const data = await updated.json();
        setSubmissions(data);
      } else {
        alert('Submission failed.');
      }
    } catch (error) {
      alert('Error submitting form.');
      console.error(error);
    }
  };

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
        /><br />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br />
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
