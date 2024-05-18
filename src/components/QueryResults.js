import React, { useState, useEffect } from 'react';

function QueryResults({ sqlQuery, results, onExecute, onExplain, connectionDetails, executeMessage }) {
  const [query, setQuery] = useState(sqlQuery);
  const [loadingExecute, setLoadingExecute] = useState(false);
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setQuery(sqlQuery);
  }, [sqlQuery]);

  const handleExecute = async () => {
    setLoadingExecute(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/execute_query/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          sql_query: query,
          connection_details: connectionDetails 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'An error occurred');
      }

      const data = await response.json();
      console.log("Execute Query Response:", data); // Debugging line
      if (data.message) {
        onExecute([], data.message); // Clear the results
      } else if (Array.isArray(data.result)) {
        onExecute(data.result, null);
      } else {
        throw new Error('Unexpected result format');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingExecute(false);
    }
  };

  const handleExplain = async () => {
    setLoadingExplain(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/explain_query/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql_query: query,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'An error occurred');
      }

      const data = await response.json();
      onExplain(data.explanation); // Update the input box with the explanation
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingExplain(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  
  return (
    <div className="mt-10">
      <div className="rounded mb-10">
        <textarea
          value={query}
          onChange={handleChange}
          placeholder="Generated MySQL query"
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <div className="flex space-x-4">
          <button onClick={handleExplain} className="p-2 bg-blue-500 text-white rounded" disabled={loadingExplain}>
            {loadingExplain ? 'Explaining...' : 'Explain SQL'}
          </button>
          <button onClick={handleExecute} className="p-2 bg-green-500 text-white rounded" disabled={loadingExecute}>
            {loadingExecute ? 'Executing...' : 'Execute'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
      <div className="border p-2 rounded">
        {executeMessage ? (
          <p>{executeMessage}</p>
        ) : Array.isArray(results) && results.length === 0 ? (
          <p className="text-gray-400">Query results</p>
        ) : Array.isArray(results) && results.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(results[0]).map((key) => (
                  <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="px-6 py-4 whitespace-nowrap">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500">Error: Unexpected result format</p>
        )}
      </div>
    </div>
  );
}

export default QueryResults;