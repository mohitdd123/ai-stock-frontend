
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
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol"
          className="border p-2 mr-2 w-full"
        />
        <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2">Analyze</button>
      </div>
      {data && (
        <div className="space-y-4">
          <div className="bg-white shadow p-4 rounded">
            <h2 className="text-xl font-semibold">{data.name} ({data.symbol})</h2>
            <p>{data.sector}</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <p><strong>PEG:</strong> {data.peg}</p>
              <p><strong>ROE:</strong> {data.roe}</p>
              <p><strong>EPS CAGR:</strong> {data.cagr_eps}</p>
              <p><strong>Price CAGR:</strong> {data.price_cagr}</p>
              <p><strong>Piotroski Score:</strong> {data.piotroski_score}</p>
              <p><strong>X-times Return:</strong> {data.x_times_return}</p>
              <p><strong>Sentiment:</strong> {data.sentiment}</p>
              <p><strong>Magic Formula:</strong> {data.magic_formula ? 'Yes' : 'No'}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">AI Summary</h3>
              <p>{data.ai_summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
