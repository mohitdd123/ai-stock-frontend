import React from 'react';
import StockCard from './components/StockCard';

export default function App() {
  const mockStock = {
    stock: "TATAMOTORS",
    screener: {
      "PEG Ratio": "0.9",
      "ROE": "18.5",
      "Sector": "Auto"
    },
    technicals: {
      "RSI": "56",
      "SMA_50": "420",
      "SMA_200": "390"
    },
    ai_insight: "Strong momentum and improving operating margins make this stock attractive.",
    classification: ["Multibagger", "Quality Pick"]
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📈 AI Stock Screener</h1>
      <StockCard stock={mockStock} />
    </div>
  );
}
