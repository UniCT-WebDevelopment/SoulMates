import dbConnect from '@/lib/mongoose.js';
import User from '@/models/User';

export async function GET(request) {
    await dbConnect();
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    try {
      const user = await User.findById(userId);
      if (!user) {
        return new Response('User not found', {
          status: 404,
        });
      }

      return new Response(JSON.stringify({ currentIndex: user.currentIndex }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      
    } catch (error) {
      return new Response('Error fetching user index', {
        status: 500,
      });
    }
  }
  