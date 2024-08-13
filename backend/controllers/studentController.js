import User from '../models/userModel.js'; // For users
import Student from '../models/studentModel.js'; // For students
import asyncHandler from 'express-async-handler';
// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js'; // For users

// Get all students with pagination and filters
const getStudents = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, name, classId, feesPaid } = req.query;

  // Convert to integer and ensure they are valid
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  
  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;

  // Build the query for User collection
  const query = { role: 'student' };

  // Optionally add filters to the query
  // if (name) query.name = new RegExp(name, 'i'); // Case-insensitive search
  // if (classId) query.class = classId;
  // if (feesPaid !== undefined) query.feesPaid = feesPaid === 'true'; // Convert to boolean

  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;

  try {
    // Fetch users who are students
    const students = await User.find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    // Get the total count of documents matching the query
    const total = await User.countDocuments(query);

    // Send the response with the fetched students and pagination info
    res.json({
      students,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// export default getStudents;

// Add new student
const addStudent = asyncHandler(async (req, res) => {
  const { name, email, gender, dob, mobile, password, classId, feesPaid } = req.body;

  // Ensure required fields are provided
  if (!name || !email || !gender || !dob || !mobile || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  // Create a new user with role 'student'
  const newStudent = new User({
    name,
    email,
    gender,
    dob,
    mobile,
    password,
    role: 'student', // Assign role as student
    class: classId,
    feesPaid,
  });

  const createdStudent = await newStudent.save();
  res.status(201).json(createdStudent);
});

// Update student
const updateStudent = asyncHandler(async (req, res) => {
  const { name, email, gender, dob, mobile, classId, feesPaid } = req.body;
  const student = await User.findById(req.params.id);

  if (student && student.role === 'student') {
    student.name = name || student.name;
    student.email = email || student.email;
    student.gender = gender || student.gender;
    student.dob = dob || student.dob;
    student.mobile = mobile || student.mobile;
    student.class = classId || student.class;
    student.feesPaid = feesPaid !== undefined ? feesPaid : student.feesPaid;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

// Delete student
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await User.findById(req.params.id);

  if (student && student.role === 'student') {
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'Student removed' });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

export { getStudents, addStudent, updateStudent, deleteStudent };
