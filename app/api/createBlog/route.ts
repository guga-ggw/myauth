import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const body = req.body;
            const { body: blogBody, userId } = body;

            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const createdBlog = await prisma.blogs.create({
                data: {
                    body: blogBody,
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });

            return res.status(201).json(createdBlog);
        } catch (error) {
            // Log the error
            console.error("Error creating blog:", error);
            return res.status(500).json({ message: "Failed to create blog" });
        }
    } else {
        // Return a 405 error if the method is not allowed
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}