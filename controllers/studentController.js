const Student = require('../models/Student');

// Trả về thông tin cá nhân
exports.getInfo = (req, res) => {
  res.json({
    data: {
      fullName: "Nguyen Hai Dang",
      studentCode: "QE170107"
    }
  });
};

// Lấy tất cả sinh viên
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    const result = students.map(student => {
      const studentObj = student.toObject();
      delete studentObj.__v; // Xóa trường __v
      return studentObj;
    });
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Tạo sinh viên mới
exports.createStudent = async (req, res) => {
  const { fullName, studentCode, isActive } = req.body;
  try {
    const newStudent = new Student({ fullName, studentCode, isActive });
    await newStudent.save();
    // Trả về kết quả theo định dạng yêu cầu
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: {
        _id: newStudent._id,
        name: newStudent.fullName, // Đổi tên trường thành "name"
        studentCode: newStudent.studentCode,
        isActive: newStudent.isActive
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Lấy sinh viên theo ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Cập nhật sinh viên
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
    // Kiểm tra nếu lỗi là do ID không hợp lệ
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid student ID format' });
    }
    // Trả về lỗi 500 cho các lỗi khác
    res.status(500).json({ success: false, message: 'Something went wrong on the server' });
  }
};