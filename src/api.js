import axios from 'axios';

const BASE_URL = 'https://your-backend-url.onrender.com';

export const fetchScreenedStocks = async () => {
  const res = await axios.get(`${BASE_URL}/screened/stocks`);
  return res.data;
};
