import dbConnect from '@/lib/mongoose';
import Message from '@/models/Message';
import { NextResponse } from 'next/server';


export async function GET(req) {
  await dbConnect(); 

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const contactId = searchParams.get('contactId');
  
  await dbConnect();

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: contactId  },
        { senderId: contactId, receiverId: userId }
      ]
    }).sort({ timestamp: 1 });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error loading messages", error }, { status: 500 });
  }
}
