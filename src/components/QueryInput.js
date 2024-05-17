import React, { useState } from 'react';

function QueryInput({ onGeneratedSql, connectionDetails, onExecute }) {
  const [query, setQuery] = useState('');
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingExecute, setLoadingExecute] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateSQL = async () => {
    setLoadingGenerate(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/translate_query/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          natural_language_query: query,
          connection_details: connectionDetails 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'An error occurred');
      }

      const data = await response.json();
      onGeneratedSql(data.sql_query); // Update the generated SQL query
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingGenerate(false);
    }
  };

  const handleExecute = async () => {
    setLoadingExecute(true);
    setError(null);

    try {
      const generateResponse = await fetch('http://localhost:8000/translate_query/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          natural_language_query: query,
          connection_details: connectionDetails 
        }),
      });

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json();
        throw new Error(errorData.detail || 'An error occurred');
      }

      const generateData = await generateResponse.json();
      const generatedSql = generateData.sql_query;
      onGeneratedSql(generatedSql);

      const executeResponse = await fetch('http://localhost:8000/execute_query/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          sql_query: generatedSql,
          connection_details: connectionDetails 
        }),
      });

      if (!executeResponse.ok) {
        const errorData = await executeResponse.json();
        throw new Error(errorData.detail || 'An error occurred');
      }

      const executeData = await executeResponse.json();
      onExecute(executeData.result); // Update results by calling the onExecute function passed from the parent component
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingExecute(false);
    }
  };

  return (
    <div className="mt-4">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter your query in natural language"
      ></textarea>
      <div className="flex space-x-4">
        <button
          onClick={handleGenerateSQL}
          className="p-2 bg-blue-500 text-white rounded"
          disabled={loadingGenerate || loadingExecute} // Disable if any loading is true
        >
          {loadingGenerate ? 'Generating...' : 'Generate SQL'}
        </button>
        <button
          onClick={handleExecute}
          className="p-2 bg-green-500 text-white rounded"
          disabled={loadingGenerate || loadingExecute} // Disable if any loading is true
        >
          {loadingExecute ? 'Executing...' : 'Execute'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default QueryInput;