import React from 'react';

function StockCard({ stock }) {
  return (
    <div className="border rounded p-4 mb-4 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-2">{stock.stock}</h2>
      <p><strong>Verdict:</strong> {stock.verdict === "PASS" ? "✅ PASS" : "❌ FAIL"}</p>
      <p><strong>PEG:</strong> {stock.screener["PEG Ratio"] || "N/A"}</p>
      <p><strong>ROE:</strong> {stock.screener["ROE"] || "N/A"}</p>
      <p><strong>RSI:</strong> {stock.technicals["RSI"] || "N/A"}</p>
      <p><strong>SMA:</strong> {stock.technicals["SMA_50"]} / {stock.technicals["SMA_200"]}</p>
      <div className="mt-3">
        <h3 className="font-bold">🧠 AI Insight:</h3>
        <p className="whitespace-pre-wrap text-sm">{stock.ai_insight}</p>
      </div>
    </div>
  );
}

export default StockCard;
