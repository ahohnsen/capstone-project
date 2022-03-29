import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    fullname: { type: String, required: true },
    location: { type: String },
    license: { type: String },
    dives: { type: String },
    facebook: { type: String },
    about: { type: String },
    photo: { type: String },
    background: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('User', schema);
