const axios = require('axios');
const fs = require('fs');
const path = require('path');

const FRED_API_KEY = 'b097d5c8ab0518b60d627580f2b0582a'; // Your FRED API key
const url = 'https://api.stlouisfed.org/fred/series/observations';
const params = {
  series_id: 'T5YIE',
  api_key: FRED_API_KEY,
  file_type: 'json',
  sort_order: 'desc'
};

axios.get(url, { params })
  .then(res => {
    fs.writeFileSync(path.join(__dirname, 'fred-data.json'), JSON.stringify(res.data, null, 2));
    console.log('FRED data saved!');
  })
  .catch(err => {
    console.error('Error fetching FRED data:', err.response ? err.response.data : err.message);
  }); 