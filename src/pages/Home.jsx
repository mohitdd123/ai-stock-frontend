import React, { useState } from 'react'
import axios from 'axios'

function Home() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(`https://ai-stock-analyzer-main-backend.onrender.com/api/analyze/${symbol}`);
    setData(res.data);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📊 AI Stock Analyzer</h1>
      <div className="flex mb-4">
        <input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Enter stock symbol" className="border p-2 mr-2 w-full" />
        <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2">Analyze</button>
      </div>
      {data && (
        <div className="bg-white shadow p-4 rounded space-y-4">
          <h2 className="text-xl font-semibold">{data.name} ({data.symbol})</h2>
          <p>{data.sector}</p>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>PEG:</strong> {data.peg ?? 'N/A'}</p>
            <p><strong>ROE:</strong> {data.roe ?? 'N/A'}</p>
            <p><strong>EPS CAGR:</strong> {data.cagr_eps ?? 'N/A'}</p>
            <p><strong>Price CAGR:</strong> {data.price_cagr ?? 'N/A'}</p>
            <p><strong>Sentiment:</strong> {data.sentiment}</p>
          </div>
          <div><strong>AI Summary:</strong><p className="text-gray-800">{data.ai_summary}</p></div>
        </div>
      )}
    </div>
  )
}
export default Home
