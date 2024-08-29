import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  
  try {
    const data = await req.json();
    const file = data.profileImage;

    if (!file) {
      throw new Error('No file data received');
    }

    // Genera un nome univoco per il file
    const fileName = `${uuidv4()}.png`;

    // Definisci il percorso in cui salvare il file
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

    // Rimuovi il prefisso data:image/png;base64, se presente
    const base64Data = file.replace(/^data:image\/\w+;base64,/, "");

    // Decodifica il file Base64 e scrivilo sul filesystem
    fs.writeFileSync(filePath, base64Data, 'base64');

    // Crea l'URL pubblico per accedere al file
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({ success: true, img: fileUrl });
  } catch (error) {
    console.error('Error uploading image:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
