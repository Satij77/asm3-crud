const express = require('express');
const router = express.Router();
const {
  getInfo,
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

// Định nghĩa route /info để lấy thông tin sinh viên theo studentCode
router.get('/info', getInfo);

// Các route CRUD cho sinh viên
router.get('/students', getStudents); // Lấy tất cả sinh viên
router.get('/students/:id', getStudentById); // Lấy sinh viên theo ID
router.post('/students', createStudent); // Tạo sinh viên mới
router.put('/students/:id', updateStudent); // Cập nhật sinh viên theo ID
router.delete('/students/:id', deleteStudent); // Xóa sinh viên theo ID

module.exports = router;
