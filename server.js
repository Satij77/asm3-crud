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

// Middleware để parse JSON  
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Assignment 3: API CRUD WITH SPECIFICATION');
});

// Sử dụng route cho API sinh viên
app.use('/', studentRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
