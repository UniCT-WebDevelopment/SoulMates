import dbConnect from '@/lib/mongoose';
import Message from '@/models/Message';
import { NextResponse } from 'next/server';


export async function GET(req) {
  await dbConnect(); 

  const { searchParams } = new URL(req.url);
  const senderId = searchParams.get('senderId');
  const receiverId = searchParams.get('receiverId');

  try {
    // Trova i messaggi tra il senderId e il receiverId
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ timestamp: 1 });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error loading messages", error }, { status: 500 });
  }
}
