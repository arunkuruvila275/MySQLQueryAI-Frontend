import React, { useState } from 'react';

function ConnectionForm({ onConnect }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hostname, setHostname] = useState('');
  const [database, setDatabase] = useState('');
  const [enableSSL, setEnableSSL] = useState(false);
  const [error, setError] = useState(null);
  const [sslMessage, setSslMessage] = useState('');

  const handleEnableSslChange = (e) => {
    setEnableSSL(e.target.checked);
    if (e.target.checked) {
      setSslMessage('Please ensure SSL_CA, SSL_CERT, and SSL_KEY environment variables are set.');
    } else {
      setSslMessage('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const connectionDetails = {
      username,
      password,
      hostname,
      database,
      enable_ssl: enableSSL
    };

    try {
      const response = await fetch('http://localhost:8000/connect/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(connectionDetails),
      });

      const data = await response.json();

      if (response.ok) {
        onConnect(connectionDetails);
      } else {
        setError(data.detail);
      }
    } catch (err) {
      setError('Failed to connect to the database.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Hostname</label>
        <input
          type="text"
          value={hostname}
          onChange={(e) => setHostname(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Database</label>
        <input
          type="text"
          value={database}
          onChange={(e) => setDatabase(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Enable SSL</label>
        <input
          type="checkbox"
          checked={enableSSL}
          onChange={handleEnableSslChange}
          className="mr-2 leading-tight"
        />
      </div>
      {sslMessage && <p className="text-yellow-500 mt-2">{sslMessage}</p>}
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
        Connect
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}

export default ConnectionForm;
