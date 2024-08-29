import dbConnect from "@/lib/mongoose.js";
import Like from "@/models/Like"
import Match from "@/models/Match";
import { NextResponse } from "next/server";

export async function POST(request) {
    await dbConnect();
  
    try {
      const { userId, likedUserId } = await request.json();
      
      console.log("dentro try - prima di Like.create()");
      
      // Correggi i nomi dei campi e aggiungi il log prima della creazione
      const like = await Like.create({ user_id: userId, liked_user_id: likedUserId });
      console.log("Like creato:", like);
  
      // Verifica se c'è un "mi piace" reciproco
      const reciprocalLike = await Like.findOne({
        user_id: likedUserId,
        liked_user_id: userId
      });
  
      if (reciprocalLike) {
        const match = await Match.create({ user1_id: userId, user2_id: likedUserId });
        console.log("Match creato:", match);
        return NextResponse.json({ success: true, match });
      }
  
      return NextResponse.json({ success: true, like });
    } catch (error) {
      console.error("Errore durante l'elaborazione della richiesta:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }
  