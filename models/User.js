import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Must provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Must provide a password"]
  },
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  gender:{
    type: String,
    required: true
  },
  age:{
    type: Number,
  },
  img:{
    type: String,
  },
},
{
  timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
