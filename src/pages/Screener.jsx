import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Screener() {
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    axios.get('https://ai-stock-analyzer-main-backend.onrender.com/api/top').then(res => {
      setStocks(res.data || []);
    });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📈 Top Ranked Stocks</h1>
      <table className="w-full text-sm border shadow bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2">PEG</th>
            <th className="p-2">ROE</th>
            <th className="p-2">CAGR</th>
            <th className="p-2">Sentiment</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.symbol} className="border-t hover:bg-gray-50">
              <td className="p-2 font-semibold">{stock.name} ({stock.symbol})</td>
              <td className="p-2 text-center">{stock.peg}</td>
              <td className="p-2 text-center">{stock.roe}</td>
              <td className="p-2 text-center">{stock.price_cagr}%</td>
              <td className="p-2 text-center">{stock.sentiment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Screener
