import axios from 'axios';

const BASE_URL = 'https://ai-stock-screener.onrender.com';

export const fetchScreenedStocks = async () => {
  const res = await axios.get(`${BASE_URL}/screened/stocks`);
  return res.data;
};
