import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    fullname: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('User', schema);
