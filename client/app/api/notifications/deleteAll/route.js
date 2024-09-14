import dbConnect from '@/lib/mongoose'; 
import Notification from '@/models/Notification';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  await dbConnect();
  
  try {
   
    const { searchParams } = new URL(request.url);
    const receiverId = searchParams.get("receiverId");

    if (!receiverId) {
      return NextResponse.json({ error: 'receiverId is required' }, { status: 400 });
    }

    const result = await Notification.deleteMany({ receiverId });

    
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'No notifications found for the specified receiverId' }, { status: 404 });
    }

    return NextResponse.json({ message: 'All notifications deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting notifications:', error);
    return NextResponse.json({ message: 'Error deleting notifications', error }, { status: 500 });
  }
}
