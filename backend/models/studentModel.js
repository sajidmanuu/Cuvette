import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }, // Reference to Class
  feesPaid: { type: Boolean, default: false },
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;
