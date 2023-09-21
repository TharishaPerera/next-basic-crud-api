import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

// Get all blogs
export const GET = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany();

        return NextResponse.json({ data: posts }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ path: 'GET_ALL_POSTS', error: error }, { status: 500 })
    }
}

// Create new blog
export const POST = async (req: Request, res: Response) => {
    try {
        const { title, content, read } = await req.json();
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                read: read
            }
        })
        return NextResponse.json({ data: post }, { status: 200 })        
    } catch (error) {
        return NextResponse.json({ path: 'CREATE_POST', error: error }, { status: 500 })
    }
}

