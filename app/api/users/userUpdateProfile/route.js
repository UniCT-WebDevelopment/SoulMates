import dbConnect from "@/lib/mongoose.js";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    await dbConnect();

    try {
        const { userId, updateData } = await request.json();
        
        if (!userId || !updateData) {
            throw new Error('Invalid data');
        }

        const updateUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updateUser) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, user: updateUser }, { status: 200 });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
