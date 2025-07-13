import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Screener from './pages/Screener'
import Financials from './pages/Financials'
import StockDetail from './pages/StockDetail'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screener" element={<Screener />} />
        <Route path="/financials" element={<Financials />} />
        <Route path="/detail" element={<StockDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)