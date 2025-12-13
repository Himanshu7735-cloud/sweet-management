import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function SweetDetail() {
  const {id} = useParams<{id: string}>();
  const [sweet, setSweet] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/sweets/${id}`, {headers: {Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''}})
      .then(res => setSweet(res.data))
      .catch(() => setError('Sweet not found'));
  }, [id]);

  const handlePurchase = async () => {
    await axios.post(`/api/sweets/${id}/purchase`, {}, {headers: {Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''}});
    window.location.reload();
  };

  if (error) return <div className="container"><div className="error">{error}</div></div>;
  if (!sweet) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        {sweet.image && <img src={sweet.image} alt={sweet.name} style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px'}} />}
        <h2>{sweet.name}</h2>
        <p><strong>Category:</strong> {sweet.category}</p>
        <p><strong>Price:</strong> ${sweet.price}</p>
        <p><strong>Quantity:</strong> {sweet.quantity}</p>
        <button className="button" disabled={sweet.quantity === 0} onClick={handlePurchase}>Purchase</button>
      </div>
    </div>
  );
}