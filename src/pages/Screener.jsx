
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ScreenerGrid() {
  const [stocks, setStocks] = useState([]);
  const [filter, setFilter] = useState({
    peg: 1.5,
    roe: 15,
    piotroski: 3,
    cagr: 10
  });

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await axios.get('https://ai-stock-analyzer-main-backend.onrender.com/api/top');
      setStocks(res.data || []);
    } catch (error) {
      console.error("Error fetching top stocks:", error);
    }
  };

  const filtered = stocks.filter(s =>
    (s.peg || 10) < filter.peg &&
    (s.roe || 0) > filter.roe &&
    (s.piotroski_score || 0) >= filter.piotroski &&
    (s.price_cagr || 0) > filter.cagr
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📈 Filterable Stock Screener</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm">
        <div><label>Max PEG</label><input type="number" value={filter.peg} step="0.1"
          onChange={e => setFilter({ ...filter, peg: parseFloat(e.target.value) })}
          className="w-full border p-1 rounded" /></div>
        <div><label>Min ROE (%)</label><input type="number" value={filter.roe}
          onChange={e => setFilter({ ...filter, roe: parseFloat(e.target.value) })}
          className="w-full border p-1 rounded" /></div>
        <div><label>Min Piotroski</label><input type="number" value={filter.piotroski}
          onChange={e => setFilter({ ...filter, piotroski: parseInt(e.target.value) })}
          className="w-full border p-1 rounded" /></div>
        <div><label>Min Price CAGR</label><input type="number" value={filter.cagr}
          onChange={e => setFilter({ ...filter, cagr: parseInt(e.target.value) })}
          className="w-full border p-1 rounded" /></div>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm border shadow rounded bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2">PEG</th>
              <th className="p-2">ROE</th>
              <th className="p-2">CAGR</th>
              <th className="p-2">Piotroski</th>
              <th className="p-2">Return</th>
              <th className="p-2">Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(stock => (
              <tr key={stock.symbol} className="border-t hover:bg-gray-50">
                <td className="p-2 font-semibold">{stock.name} ({stock.symbol})</td>
                <td className="p-2 text-center">{stock.peg}</td>
                <td className="p-2 text-center">{stock.roe}</td>
                <td className="p-2 text-center">{stock.price_cagr}%</td>
                <td className="p-2 text-center">{stock.piotroski_score}</td>
                <td className="p-2 text-center">{stock.x_times_return}x</td>
                <td className="p-2 text-center">{stock.sentiment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScreenerGrid;
