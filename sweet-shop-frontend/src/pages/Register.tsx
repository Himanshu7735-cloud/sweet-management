import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', {email, password});
      navigate('/login');
    } catch (err: any) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleRegister} className="form card">
        <h2>Register</h2>
        <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button className="button" type="submit">Register</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
