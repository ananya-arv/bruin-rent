const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// loading the environment variables
dotenv.config();

const app = express();

// the middleware components
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// checking the health status of api
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'BruinRent API is running',
    timestamp: new Date().toISOString()
  });
});

// gen error handling 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The Server is running on port ${PORT}`);
});