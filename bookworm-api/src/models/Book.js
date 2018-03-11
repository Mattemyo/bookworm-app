import mongoose from 'mongoose';

const requiredString = { type: String, required: true };
const schema = new mongoose.Schema({
  title: requiredString,
  authors: requiredString,
  cover: requiredString,
  goodreadsId: { type: String },
  pages: { ...requiredString, type: number },
  userId: { ...requiredString, type: mongoose.Schema.Types.ObjectId }
});

export default mongoose.model('Book', schema);
