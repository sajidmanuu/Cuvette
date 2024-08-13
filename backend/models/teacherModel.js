import mongoose from 'mongoose';

const teacherSchema = mongoose.Schema({
  name: { type: String, required: true },
  salary: { type: Number, required: true },
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
