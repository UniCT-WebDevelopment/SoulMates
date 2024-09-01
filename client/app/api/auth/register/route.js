import dbConnect from "@/lib/mongoose.js";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

export async function POST(req) {
    await dbConnect();
  
    const { name, email, password, age, gender } = await req.json();
  
    // Verifica se l'utente esiste già
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    // Hash della password
    const hashedPassword = await hashPassword(password);
  
    // Creazione di un nuovo utente
    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
    });
  
    await user.save();
  
    return new Response(JSON.stringify({ message: 'User created', userId: user._id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }