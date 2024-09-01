import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
  user1_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user2_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  matched_at: { type: Date, default: Date.now }
});

export default mongoose.models.Match || mongoose.model('Match', MatchSchema);
