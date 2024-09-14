import dbConnect from '@/lib/mongoose';  // Modifica il percorso a seconda della tua struttura
import { NextResponse } from 'next/server';
import User from '@/models/User';

export async function GET(request) {
  const url = new URL(request.url);
  await dbConnect();
  const userId = url.searchParams.get('userId') || '';

  try {
    
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = {
      name: user.name,
      bio: user.bio,
      age: user.age,
      email: user.email,
      img: user.profileImageUrl,
    };

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
