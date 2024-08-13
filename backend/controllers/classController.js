import Class from '../models/classModel.js';
import asyncHandler from 'express-async-handler';

// Get all classes
const getClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find().populate('teacher');
  res.json(classes);
});
const getAllClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find();
  res.json(classes);
});

// Add new class
const addClass = asyncHandler(async (req, res) => {
  const { name, year, teacher, studentFees } = req.body;

  const newClass = new Class({
    name,
    year,
    teacher,
    studentFees,
  });

  const createdClass = await newClass.save();
  res.status(201).json(createdClass);
});

export { getClasses, addClass ,getAllClasses};
