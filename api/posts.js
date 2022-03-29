import dbConnect from '../lib/dbConnect.js';
import Post from '../models/Post.js';

export default async function handler(request, response) {
  await dbConnect();
  const { method } = request;

  if (method === 'GET') {
    try {
      const posts = await Post.find().populate(
        'author',
        'userId fullname photo'
      );
      response.json(posts);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

  if (method === 'POST') {
    const post = new Post(request.body);
    try {
      const newPost = await post.save();
      response.status(200).json(newPost);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  if (method === 'PUT') {
    const { post, _id } = request.body;
    try {
      const updatedPost = await Post.findByIdAndUpdate(_id, post, {
        returnOriginal: false,
      });
      response.json(updatedPost);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  if (method === 'DELETE') {
    const { _id } = request.body;
    try {
      const deletedPost = await Post.findByIdAndDelete(_id);
      response.json(deletedPost);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
}
