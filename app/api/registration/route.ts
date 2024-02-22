import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
    if (req.method === 'POST') {
        try {
            const body = await req.json()
            const {name, email, password} = body
            const hashedPassword = password

            const user = await prisma?.user.create({
                data: {
                    name,
                    email,
                    hashedPassword
                }
            });
            
            return NextResponse.json(user);
        } catch (error) {
            // Log the error
            console.error("Error creating user:", error);
            return NextResponse.json({ message: "Failed to create user" });
        }
    } else {
        // Return a 405 error if the method is not allowed
        return NextResponse.json({ message: 'Method Not Allowed' });
    }
    
}