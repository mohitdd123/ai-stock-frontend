import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StockDetail() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('overview');

  const fetchData = async () => {
    const res = await axios.get(`https://ai-stock-analyzer-main-backend.onrender.com/api/analyze/${symbol}`);
    setData(res.data || {});
  };

  const renderRatioTable = () => {
    const ratios = {
      'PEG Ratio': data.peg,
      'ROE': data.roe + '%',
      'EPS CAGR': data.cagr_eps + '%',
      'Price CAGR': data.price_cagr + '%',
      'Intrinsic Value': data.intrinsic_value,
      'X-times Return': data.x_times_return + 'x',
      'Sentiment': data.sentiment,
      'Magic Formula': data.magic_formula ? 'Yes' : 'No',
      'Piotroski Score': data.piotroski_score
    };

    return (
      <table className="w-full text-sm border mt-4">
        <thead><tr className="bg-gray-100"><th className="p-2">Ratio</th><th className="p-2">Value</th></tr></thead>
        <tbody>
          {Object.entries(ratios).map(([k, v]) => (
            <tr key={k} className="border-t">
              <td className="p-2">{k}</td>
              <td className="p-2">{v ?? 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderPeerTable = () => {
    const peers = data.peers || [];
    return (
      <table className="w-full text-sm border mt-4">
        <thead><tr className="bg-gray-100">
          {peers[0]?.map((_, i) => <th key={i} className="p-2">Col {i + 1}</th>)}
        </tr></thead>
        <tbody>
          {peers.map((row, i) => (
            <tr key={i} className="border-t">
              {row.map((col, j) => (
                <td key={j} className="p-2 text-center">{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Stock Detail</h1>
      <div className="mb-4 flex">
        <input value={symbol} onChange={e => setSymbol(e.target.value)} placeholder="Enter Symbol" className="border p-2 mr-2 w-full" />
        <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2">Fetch</button>
      </div>

      {data && (
        <>
          <div className="flex gap-3 mb-4">
            <button onClick={() => setTab('overview')} className={tab === 'overview' ? 'bg-blue-600 text-white px-3 py-2 rounded' : 'bg-gray-200 px-3 py-2 rounded'}>Overview</button>
            <button onClick={() => setTab('ratios')} className={tab === 'ratios' ? 'bg-blue-600 text-white px-3 py-2 rounded' : 'bg-gray-200 px-3 py-2 rounded'}>Ratios</button>
            <button onClick={() => setTab('peers')} className={tab === 'peers' ? 'bg-blue-600 text-white px-3 py-2 rounded' : 'bg-gray-200 px-3 py-2 rounded'}>Peers</button>
            <button onClick={() => setTab('insight')} className={tab === 'insight' ? 'bg-blue-600 text-white px-3 py-2 rounded' : 'bg-gray-200 px-3 py-2 rounded'}>AI Insight</button>
          </div>

          {tab === 'overview' && (
            <div className="bg-white shadow p-4 rounded">
              <h2 className="text-xl font-semibold">{data.name} ({data.symbol})</h2>
              <p className="text-gray-600 mb-2">{data.sector}</p>
              <div className="flex flex-wrap gap-2">
                {data.classification?.map(tag => (
                  <span key={tag} className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {tab === 'ratios' && renderRatioTable()}
          {tab === 'peers' && renderPeerTable()}
          {tab === 'insight' && (
            <div className="bg-white p-4 shadow rounded whitespace-pre-line text-gray-800">{data.ai_summary}</div>
          )}
        </>
      )}
    </div>
  )
}
export default StockDetail;
