import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    bookmarks: { type: Array, required: true, default: [] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('User', schema);
