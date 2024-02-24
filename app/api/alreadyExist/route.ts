import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: any) {
    if (req.method === 'POST') {
        try {
            const body = await req.json()
            const { email } = body
            console.log('email is' + email)

            const user = await prisma.user.findUnique({
                where: {
                    email : email
                }
            });

            return NextResponse.json(user);
        } catch (error) {
            return NextResponse.json({ message: "Failed to find user" });
        }
    } else {
        return NextResponse.json({ message: 'Method Not Allowed' });
    }
}