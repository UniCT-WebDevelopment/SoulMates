import dbConnect from '@/lib/mongoose.js';
import User from '@/models/User';

export async function GET(request) {
  await dbConnect();
  const url = new URL(request.url);
  const index = parseInt(url.searchParams.get('index'), 10) || 0;
  const gender = url.searchParams.get("gender") || '';

  try {
    const users = await User.find({gender: gender}, '_id name bio gender img ')
                            .sort({ _id: 1 })
                            .skip(index)
                            .limit(1);
    if (users.length === 0) {
      return new Response('No more users found', {
        status: 404,
      });
    }

    return new Response(JSON.stringify(users[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Error fetching user', {
      status: 500,
    });
  }
}


