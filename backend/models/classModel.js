import mongoose from 'mongoose';

const classSchema = mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Reference to Teacher
  studentFees: { type: Number, required: true },
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);

export default Class;
