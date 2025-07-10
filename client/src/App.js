import React, { useEffect, useState } from 'react';
import { fetchScreenedStocks } from './api';
import StockCard from './components/StockCard';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("Fetching stocks...");
    fetchScreenedStocks()
      .then(data => {
        console.log("Fetched stocks:", data);
        setStocks(data);
      })
      .catch(err => {
        console.error("Error fetching stocks:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📈 AI Stock Screener</h1>
      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-600">⚠️ Error loading data from server.</p>}
      {!loading && !error && stocks.length === 0 && <p>No qualifying stocks found.</p>}
      {stocks.map((s, idx) => (
        <StockCard key={idx} stock={s} />
      ))}
    </div>
  );
}

export default App;
