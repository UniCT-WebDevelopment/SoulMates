import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  liked_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.models.Like || mongoose.model('Like', LikeSchema);
