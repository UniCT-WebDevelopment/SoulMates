import dbConnect from '@/lib/mongoose.js';
import User from '@/models/User';

export async function POST(request) {
  await dbConnect();

  const { userId, newIndex } = await request.json();

  try {
    await User.findByIdAndUpdate(userId, { currentIndex: newIndex });
    return new Response('User index updated', {
      status: 200,
    });
  } catch (error) {
    return new Response('Error updating user index', {
      status: 500,
    });
  }
}
