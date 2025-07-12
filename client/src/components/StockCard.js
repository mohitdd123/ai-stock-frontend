
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function StockCard({ stock }) {
  const { stock: name, screener, technicals, ai_insight, classification, "Technical Analysis": ta } = stock;

  const chartData = [
    { name: 'SMA_50', value: ta?.SMA_50 || 0 },
    { name: 'SMA_200', value: ta?.SMA_200 || 0 }
  ];

  const renderTags = () => (
    <div className="flex gap-2 flex-wrap mb-2">
      {classification.map((tag, index) => (
        <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
          {tag}
        </span>
      ))}
    </div>
  );

  const renderTA = () => (
    <table className="text-sm w-full mt-3 bg-gray-50 rounded">
      <tbody>
        <tr><td className="font-medium">📈 Close Price:</td><td>{ta?.["Close Price"]}</td></tr>
        <tr><td className="font-medium">📊 RSI (14d):</td><td>{ta?.RSI}</td></tr>
        <tr><td className="font-medium">💥 MACD:</td><td>{ta?.MACD}</td></tr>
        <tr><td className="font-medium">📉 Bollinger Bands:</td><td>{ta?.["Bollinger Band Range"]?.join(" – ")}</td></tr>
        <tr><td className="font-medium">🚦 Trend Strength:</td><td>{ta?.["Trend Strength Index"]} / 100</td></tr>
      </tbody>
    </table>
  );

  return (
    <div className="border rounded-lg p-5 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      {renderTags()}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p><strong>PEG:</strong> {screener["PEG Ratio"]}</p>
          <p><strong>ROE:</strong> {screener["ROE"]}</p>
          <p><strong>Sector:</strong> {screener.Sector}</p>
        </div>
        <div>
          <p><strong>Tailwinds:</strong> EV / Infra / PLI</p>
          <p><strong>CAGR Potential:</strong> ~3–5x</p>
        </div>
      </div>
      {renderTA()}
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-1">📊 SMA Chart</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm bg-gray-50 p-3 rounded">
        <h4 className="font-semibold">🧠 AI Insight:</h4>
        <p>{ai_insight}</p>
      </div>
    </div>
  );
}

export default StockCard;
