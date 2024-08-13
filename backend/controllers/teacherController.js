import Teacher from '../models/teacherModel.js';
import Class from '../models/classModel.js';
import asyncHandler from 'express-async-handler';

// Get all teachers with their assigned class details
const getTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find();

  const teachersWithClass = await Promise.all(
    teachers.map(async (teacher) => {
      const assignedClass = await Class.findOne({ teacher: teacher._id }).populate('teacher');
      return { ...teacher._doc, assignedClass };
    })
  );

  res.json(teachersWithClass);
});

// Add new teacher
const addTeacher = asyncHandler(async (req, res) => {
  const { name, salary } = req.body;

  if (!name || !salary) {
    res.status(400);
    throw new Error('Name and salary are required fields.');
  }

  const newTeacher = new Teacher({
    name,
    salary,
  });

  const createdTeacher = await newTeacher.save();
  res.status(201).json(createdTeacher);
});

// Update teacher
const updateTeacher = asyncHandler(async (req, res) => {
  const { name, salary } = req.body;
  const teacher = await Teacher.findById(req.params.id);

  if (teacher) {
    teacher.name = name || teacher.name;
    teacher.salary = salary || teacher.salary;

    const updatedTeacher = await teacher.save();
    res.json(updatedTeacher);
  } else {
    res.status(404);
    throw new Error('Teacher not found');
  }
});

// Delete teacher
// Delete teacher
const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (teacher) {
    // Use deleteOne instead of remove
    await Teacher.deleteOne({ _id: req.params.id });
    res.json({ message: 'Teacher removed' });
  } else {
    res.status(404);
    throw new Error('Teacher not found');
  }
});


export { getTeachers, addTeacher, updateTeacher, deleteTeacher };
