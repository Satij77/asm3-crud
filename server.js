const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Kết nối với MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

  
app.use(express.json());

// Sử dụng route cho API sinh viên
app.use('/api', studentRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
