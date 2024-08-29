import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth/next";
import dbConnect from "@/lib/mongoose.js";
import User from "@/models/User";
import bcrypt from "bcrypt";

async function login(credentials) {
    try {
        dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if(!user) throw new Error("Wrong Credentials.");
        const isCorrect = await bcrypt.compare(credentials.password, user.password);   
        if(!isCorrect) throw new Error("Wrong Credentials.");
        return user;
    } catch (error) {
        console.log("Error while logging in");
        throw new Error("Somenthing went wrong");
    }
    
}
export const authOptions = {
    pages:{
        signIn:"/login"
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials:{},
            async authorize(credentials){
                try {
                    const user = await login(credentials);
                    return user;
                }catch(error){
                    throw new Error("Failed to login");
                }
            },
        }),
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.name = user.name;
                token.email = user.email;  
                token.id = user.id;
                token.bio = user.bio;
                token.gender = user.gender
                token.age = user.age;   
                token.img = user.img;
            }
            console.log("this is the token = ", token);
            return token;
        },
        async session({session, token}){
            if(token){
                session.user.name = token.name;
                session.user.email = token.email;  
                session.user.id = token.id;
                session.user.bio = token.bio;
                session.user.gender = token.gender
                session.user.age = token.age;
                session.user.img = token.img;
            }
            return session;
        },
    },
    jwt:{
        maxAge: 60 * 60,
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };