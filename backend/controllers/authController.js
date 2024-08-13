import User from '../models/userModel.js';
import generateToken from '../utils/jwt.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

// Register new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, gender, dob, mobile, password, role } = req.body;

  // Validate input
  if (!name || !email || !gender || !dob || !mobile || !password || !role) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    gender,
    dob,
    mobile,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      dob: user.dob,
      mobile: user.mobile,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Authenticate user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// If `signup` is to be kept separate from `registerUser`, adjust or remove it as needed
const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({ token, role: user.role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { registerUser, authUser, signup };
