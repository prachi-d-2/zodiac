import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Connect.css';

function Connect() {
  const [connections, setConnections] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('/api/connections', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setConnections(data);
  };

  const handleAddConnection = async () => {
    const token = localStorage.getItem('token');
    await axios.post(
      '/api/connections/add',
      { connectionId: email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchConnections();
  };

  const handleRemoveConnection = async (connectionId) => {
    const token = localStorage.getItem('token');
    await axios.post(
      '/api/connections/remove',
      { connectionId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchConnections();
  };

  return (
    <div className="connect">
      <h2>Your Connections</h2>
      <ul>
        {connections.map((connection) => (
          <li key={connection._id}>
            {connection.name} - {connection.email}
            <button onClick={() => handleRemoveConnection(connection._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email to connect" />
      <button onClick={handleAddConnection}>Add Connection</button>
    </div>
  );
}

export default Connect;
