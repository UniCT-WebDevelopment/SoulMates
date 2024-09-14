import dbConnect from '@/lib/mongoose';
import Notification from '@/models/Notification'; // Verifica il nome del modello
import { NextResponse } from 'next/server';

export async function GET(req){
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const receiverId = searchParams.get("receiverId");

    try {
        // Controlla che receiverId esista
        if (!receiverId) {
            return NextResponse.json({ error: 'receiverId is required' }, { status: 400 });
        }

        // Cerca le notifiche con il receiverId
        const notifications = await Notification.find({
            receiverId: receiverId,
        }).sort({ timestamp: -1 });

        return NextResponse.json(notifications, { status: 200 });
        
    } catch (error) {
        console.log("Error with receiverId: ", receiverId);
        console.error(error); // Aggiungi log per debug
        return NextResponse.json({ message: "Errore nel caricamento delle notifiche", error }, { status: 500 });
    }
}
