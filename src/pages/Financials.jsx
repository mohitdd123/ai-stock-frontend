import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Financials() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('PL');

  const fetchData = async () => {
    const res = await axios.get(`https://ai-stock-analyzer-main-backend.onrender.com/api/analyze/${symbol}`);
    setData(res.data?.financials || {});
  };

  const renderTable = (section) => {
    const sectionData = data[section] || {};
    const years = Object.keys(sectionData);
    return (
      <table className="w-full text-sm border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Metric</th>
            {years.map(y => <th key={y} className="p-2">{y}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2 font-medium">{section}</td>
            {years.map(y => (
              <td key={y} className="p-2 text-right">{sectionData[y]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Full Financials</h1>
      <div className="mb-4 flex">
        <input value={symbol} onChange={e => setSymbol(e.target.value)} placeholder="Enter Symbol (e.g. TATAMOTORS)" className="border p-2 mr-2 w-full" />
        <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2">Fetch</button>
      </div>
      {data && (
        <>
          <div className="flex gap-4 mb-4">
            <button className={`px-4 py-2 rounded ${tab === 'PL' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`} onClick={() => setTab('PL')}>P&L</button>
            <button className={`px-4 py-2 rounded ${tab === 'BS' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`} onClick={() => setTab('BS')}>Balance Sheet</button>
            <button className={`px-4 py-2 rounded ${tab === 'CF' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`} onClick={() => setTab('CF')}>Cash Flow</button>
          </div>
          {tab === 'PL' && (
            <>
              {renderTable('Revenue')}
              {renderTable('Profit')}
              {renderTable('EPS')}
            </>
          )}
          {tab === 'BS' && (
            <>
              {renderTable('Equity')}
              {renderTable('Reserves')}
            </>
          )}
          {tab === 'CF' && (
            <>
              {renderTable('OCF')}
              {renderTable('FCF')}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Financials;
