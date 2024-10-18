const Student = require('../models/Student');

// Lấy danh sách sinh viên
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ success: true, data: students });
  } catch (error) {
    console.error('Error retrieving students:', error); // Ghi log lỗi
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Lấy thông tin sinh viên theo ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    console.error('Error retrieving student by ID:', error); // Ghi log lỗi
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Tạo sinh viên mới
exports.createStudent = async (req, res) => {
  const { fullName, studentCode, isActive } = req.body;
  try {
    const newStudent = new Student({ fullName, studentCode, isActive });
    await newStudent.save();
    res.status(201).json({ success: true, message: 'Student created successfully', data: newStudent });
  } catch (error) {
    console.error('Error creating student:', error); // Ghi log lỗi
    res.status(400).json({ success: false, message: error.message });
  }
};

// Cập nhật thông tin sinh viên
exports.updateStudent = async (req, res) => {
  const { fullName, isActive } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { fullName, isActive },
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, message: 'Student updated successfully', data: student });
  } catch (error) {
    console.error('Error updating student:', error); // Ghi log lỗi
    res.status(400).json({ success: false, message: error.message });
  }
};

// Xóa sinh viên
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error); // Ghi log lỗi
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Hàm lấy thông tin sinh viên theo studentCode
exports.getInfo = async (req, res) => {
  const { studentCode } = req.query; // Lấy studentCode từ query parameter

  try {
    // Tìm sinh viên theo studentCode
    const student = await Student.findOne({ studentCode });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Trả về thông tin sinh viên
    res.json({
      success: true,
      data: {
        fullName: student.fullName,
        studentCode: student.studentCode,
        isActive: student.isActive
      }
    });
  } catch (error) {
    console.error('Error retrieving student by studentCode:', error); // Ghi log lỗi
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
