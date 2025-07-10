import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function StockCard({ stock }) {
  const { stock: name, screener, technicals, ai_insight, classification } = stock;

  const calculateCAGR = () => {
    const peg = parseFloat(screener["PEG Ratio"]);
    if (!peg || peg <= 0) return 'N/A';
    const estimatedCAGR = (1 / peg) * 15;
    return `${estimatedCAGR.toFixed(1)}%`;
  };

  const analyzeSentiment = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("strong") || lower.includes("bullish") || lower.includes("growing")) return { label: "Positive", color: "text-green-600" };
    if (lower.includes("risk") || lower.includes("concern") || lower.includes("slow")) return { label: "Negative", color: "text-red-600" };
    return { label: "Neutral", color: "text-gray-600" };
  };

  const chartData = [
    { name: 'SMA_50', value: parseFloat(technicals.SMA_50) },
    { name: 'SMA_200', value: parseFloat(technicals.SMA_200) }
  ];

  const renderTags = () => (
    <div className="flex gap-2 flex-wrap">
      {classification.map((tag, index) => (
        <span
          key={index}
          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );

  return (
    <div className="border rounded-lg p-5 shadow-sm bg-white">
      <div className="mb-2">
        <h2 className="text-xl font-semibold">{name}</h2>
        {renderTags()}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p><strong>PEG:</strong> {screener["PEG Ratio"]}</p>
          <p><strong>ROE:</strong> {screener["ROE"]}</p>
          <p><strong>RSI:</strong> {technicals["RSI"]}</p>
          <p><strong>Price vs SMA:</strong> {technicals["SMA_50"]} / {technicals["SMA_200"]}</p>
        </div>
        <div>
          <p><strong>CAGR Potential:</strong> {calculateCAGR()}</p>
          <p><strong>Tailwinds:</strong> EV Growth / Infra Push / PLI</p>
          <p><strong>Sector:</strong> {screener.Sector || 'N/A'}</p>
        </div>
      </div>

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
        {(() => {
          const sentiment = analyzeSentiment(ai_insight);
          return (
            <h4 className="font-semibold">
              🧠 AI Insight <span className={`text-xs ${sentiment.color}`}>({sentiment.label})</span>
            </h4>
          );
        })()}
        <p>{ai_insight}</p>
      </div>
    </div>
  );
}

export default StockCard;
