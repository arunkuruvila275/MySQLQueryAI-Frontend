import React, { useState, useEffect } from 'react';

function QueryResults({ sqlQuery, results, onExecute, connectionDetails }) {
  const [query, setQuery] = useState(sqlQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setQuery(sqlQuery);
  }, [sqlQuery]);

  const handleExecute = async () => {
    setLoading(true);
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
      onExecute(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="rounded mb-10">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Generated MySQL query"
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <button onClick={handleExecute} className="p-2 bg-blue-500 text-white rounded" disabled={loading}>
          {loading ? 'Executing...' : 'Execute'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="border p-2 rounded">
        { results.length === 0 ? (
          <p className="text-gray-400">Query result</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {results[0] && Object.keys(results[0]).map((key) => (
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
        )}
      </div>
    </div>
  );
}

export default QueryResults;