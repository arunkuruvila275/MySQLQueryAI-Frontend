import React, { useState } from 'react';
import QueryInput from './components/QueryInput';
import QueryResults from './components/QueryResults';
import ConnectionForm from './components/ConnectionForm';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleResults = (query, results) => {
    setSqlQuery(query);
    setResults(Array.isArray(results) ? results : []);
  };

  return (
    <div className="App">
      <header className="bg-blue-500 p-4 text-white text-center">
        <h1>MySQLQueryAI</h1>
      </header>
      <main className="p-4">
        {!isConnected ? (
          <ConnectionForm onConnect={handleConnect} />
        ) : (
          <>
            <QueryInput onResults={handleResults} />
            <QueryResults sqlQuery={sqlQuery} results={results} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
