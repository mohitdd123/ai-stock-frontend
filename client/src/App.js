
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StockCard from './components/StockCard';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://ai-stock-analyzer-1.onrender.com/screened/stocks")
      .then(res => {
        const data = res.data;
        const stockArray = Object.keys(data).map(key => ({ stock: key, ...data[key] }));
        setStocks(stockArray);
      })
      .catch(err => console.error("Error fetching stocks:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📈 AI Stock Screener</h1>
      {loading ? <p>Loading data...</p> : stocks.map((s, i) => (
        <div key={i} className="mb-6"><StockCard stock={s} /></div>
      ))}
    </div>
  );
}

export default App;
