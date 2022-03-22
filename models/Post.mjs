import mongoose from 'mongoose';
import './User.mjs';
const { Schema, model } = mongoose;

const schema = new Schema(
  {
    destination: { type: String, required: true },
    notes: { type: String, required: true },
    isArchived: { type: Boolean, required: true, default: false },
    isBookmarked: { type: Boolean, required: true, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('Post', schema);
