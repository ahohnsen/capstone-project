import mongoose from 'mongoose';
import './User.js';
const { Schema, model } = mongoose;

const schema = new Schema(
  {
    destination: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isArchived: { type: Boolean, required: true, default: false },
    isBookmarked: { type: Boolean, required: true, default: false },
    author: { type: String, ref: 'User', required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('Post', schema);
