// src/models/userModel.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender:{ type: String, required: true, unique: true },
  dob:{ type: String, required: true, unique: true },
  mobile:{ type: String, required: true},
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'teacher', 'student'] },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
