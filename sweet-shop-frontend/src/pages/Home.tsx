import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Home() {
  const [sweets, setSweets] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/api/sweets', {headers: {Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''}})
      .then(res => setSweets(res.data))
      .catch(() => setSweets([]));
  }, []);

  const handleSearch = async () => {
    const res = await axios.get(`/api/sweets/search?name=${search}`, {headers: {Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''}});
    setSweets(res.data);
  };

  const handlePurchase = async (id: string) => {
    await axios.post(`/api/sweets/${id}/purchase`, {}, {headers: {Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''}});
    window.location.reload();
  };

  return (
    <div className="container">
      <h2>Sweet Shop</h2>
      <div className="card" style={{marginBottom: 20}}>
        <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name" />
        <button className="button" onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {sweets.map(s => (
          <li key={s.id} className="card">
            <span><Link to={`/sweet/${s.id}`}><b>{s.name}</b></Link> ({s.category}) - ${s.price} | Qty: {s.quantity}</span>
            <button className="button" disabled={s.quantity === 0} onClick={() => handlePurchase(s.id)}>Purchase</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
