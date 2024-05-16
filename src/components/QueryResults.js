import React from 'react';

function QueryResults({ results }) {
  return (
    <div className="mt-4">
      <h2>Query Results</h2>
      <div className="border p-2 rounded">
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default QueryResults;
