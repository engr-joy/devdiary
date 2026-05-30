import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const { title, description, stack } = await req.json()
  const project = await prisma.project.create({
    data: { title, description, stack }
  })
  return NextResponse.json(project)
}