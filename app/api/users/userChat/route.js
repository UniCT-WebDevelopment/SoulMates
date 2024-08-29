import dbConnect from '@/lib/mongoose.js';
import User from '@/models/User';
import Match from '@/models/Match';

export async function GET(request) {
    await dbConnect();

    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return new Response("User ID not provided", {
                status: 400,
            });
        }

        const matches = await Match.find({
            $or: [
                { user1_id: { $eq: userId } }, 
                { user2_id: { $eq: userId } }
            ]
        });

        const userIds = matches.reduce((acc, match) => {
            if (match.user1_id.toString() !== userId) {
                acc.add(match.user1_id.toString());
            }
            if (match.user2_id.toString() !== userId) {
                acc.add(match.user2_id.toString());
            }
            return acc;
        }, new Set());

        const uniqueUserIds = Array.from(userIds);

        const users = await User.find({ _id: { $in: uniqueUserIds } }, 'name img');

        if (users.length === 0) {
            return new Response('No matched users found', {
                status: 404,
            });
        }

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response("Errore nel caricamento degli utenti", {
            status: 500,
        });
    }
}
