import React, { useEffect, useState } from 'react';
import { fetchScreenedStocks } from './api';
import StockCard from './components/StockCard';

function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchScreenedStocks().then(setStocks);
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📈 AI Stock Screener</h1>
      {stocks.map((s, idx) => (
        <StockCard key={idx} stock={s} />
      ))}
    </div>
  );
}

export default App;
