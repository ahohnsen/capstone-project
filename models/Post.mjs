import mongoose from 'mongoose';
import './User.mjs';
const { Schema, model } = mongoose;

const schema = new Schema(
  {
    destination: { type: String, required: true },
    notes: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('Post', schema);
