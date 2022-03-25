import dbConnect from '../lib/dbConnect.js';
import User from '../models/User.js';

export default async function handler(request, response) {
  await dbConnect();
  const { method } = request;

  if (method === 'GET') {
    try {
      const users = await User.find();
      response.json(users);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

  if (method === 'POST') {
    const user = new User(request.body);
    try {
      const newUser = await user.save();
      response.status(200).json(newUser);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  if (method === 'PUT') {
    const { user, _id } = request.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(_id, user, {
        returnOriginal: false,
      });
      response.json(updatedUser);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  if (method === 'DELETE') {
    const { _id } = request.body;
    try {
      const deletedUser = await User.findByIdAndDelete(_id);
      response.json(deletedUser);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
}
