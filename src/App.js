import React, { useState } from 'react';
import QueryInput from './components/QueryInput';
import QueryResults from './components/QueryResults';
import ConnectionForm from './components/ConnectionForm';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
  const [results, setResults] = useState([]);
  const [executeMessage, setExecuteMessage] = useState(null);
  const [connectionDetails, setConnectionDetails] = useState(null);

  const handleConnect = (details) => {
    setIsConnected(true);
    setConnectionDetails(details);
  };

  const handleGeneratedSql = (query) => {
    setSqlQuery(query);
  };

  const handleResults = (results, message) => {
    setResults(results);
    setExecuteMessage(message);
  };

  const handleExplanation = (explanation) => {
    // Update the input box with the explanation
    const queryInputElement = document.querySelector('textarea');
    if (queryInputElement) {
      queryInputElement.value = explanation;
    }
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
            <QueryInput onGeneratedSql={handleGeneratedSql}
                        connectionDetails={connectionDetails}
                        onExecute={handleResults}
            />
            <QueryResults sqlQuery={sqlQuery} 
                          results={results}
                          onExecute={handleResults}
                          onExplain={handleExplanation}
                          connectionDetails={connectionDetails}
                          executeMessage={executeMessage} // Pass the execute message to QueryResults
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;