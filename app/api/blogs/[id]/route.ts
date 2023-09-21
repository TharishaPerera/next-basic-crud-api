import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

// Get blog by ID
export const GET =async (req:Request, res: Response) => {
    try {
        const id = parseInt(req.url.split('blogs/')[1])

        const post = await prisma.post.findFirst({
            where: {
                id: id,
            }
        })
        return NextResponse.json({ data: post }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ path: 'GET_POST_BY_ID', error: error }, { status: 500 })
    }
}

// Update blog by ID
export const PUT =async (req:Request, res: Response) => {
    const id = parseInt(req.url.split('blogs/')[1])
    const { title, content, read } = await req.json();

    const post = await prisma.post.update({
        where: {
            id: id
        },
        data: {
            title: title,
            content: content,
            read: read
        }
    })
    return NextResponse.json({ data: post }, { status: 200 })
}

// Delete blog by ID
export const DELETE =async (req:Request, res: Response) => {
    try {
        const id = parseInt(req.url.split('blogs/')[1])

        const post = await prisma.post.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({ data: post }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ path: 'DELETE_POST_BY_ID', error: error }, { status: 500 })
    }
}