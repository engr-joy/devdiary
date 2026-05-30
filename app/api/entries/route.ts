import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const entries = await prisma.entry.findMany({
    orderBy: { createdAt: "desc" }
  })
  return NextResponse.json(entries)
}

export async function POST(req: Request) {
  const { title, body, stack } = await req.json()
  const entry = await prisma.entry.create({
    data: { title, body, stack }
  })
  return NextResponse.json(entry)
}