import React, { useState } from 'react';
import QueryInput from './components/QueryInput';
import QueryResults from './components/QueryResults';

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <header className="bg-blue-500 p-4 text-white text-center">
        <h1>MySQLQueryAI</h1>
      </header>
      <main className="p-4">
        <QueryInput onResults={setResults} />
        <QueryResults results={results} />
      </main>
    </div>
  );
}

export default App;
