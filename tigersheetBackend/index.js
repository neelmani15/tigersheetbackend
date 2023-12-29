const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, welcome to Tigersheet Backend!');
});
// app.get('/fetchrequest', async (req, res) => {
//       try {
//         const url = 'https://riktam.tigersheet.com/api/sheet-api/get-records';
//         const headers = {
//           'Authorization': 'D3A94E79AA47691A7DAB16E17B8C2E9CAF2C3746991F787B',
//           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//         };  
//         const payload = {
//           'sheet_id': '31835256',
//         };
//         const response = await axios.post(url, payload, { headers });
//         console.log('Response from Tigersheet Backend', response.data);
//         res.send(response.data);
//       } catch (error) {
//         console.error('Error in post request:', error.message);
//         res.status(500).send('Internal Server Error');
//       }
//     });

app.get('/fetchrequest', async (req, res) => {
  try {
    const url = 'https://riktam.tigersheet.com/api/sheet-api/get-records';
    const headers = {
      'Authorization': 'D3A94E79AA47691A7DAB16E17B8C2E9CAF2C3746991F787B',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };

    const sheetId = '31835256';
    
    const allRecords = await getAllRecords(url, headers, sheetId);
    
    // Get page and limit from request query parameters
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    // Calculate offset based on page and limit
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Slice the array to get the records for the current page
    const paginatedRecords = allRecords.slice(startIndex, endIndex);

    console.log('Records for Page', page, ':', paginatedRecords);
    
    res.send({ data: paginatedRecords });
  } catch (error) {
    console.error('Error in fetching data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

async function getAllRecords(url, headers, sheetId) {
  const payload = {
    'sheet_id': sheetId,
  };

  const response = await axios.post(url, payload, { headers });
  console.log('All Records from Tigersheet Backend', response.data);

  return response.data.data;
}
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})