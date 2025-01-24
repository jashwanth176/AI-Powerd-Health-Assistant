import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const chat = model.startChat()
    
    const result = await chat.sendMessage(message)
    const response = await result.response
    const text = response.text()
    
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process message', details: (error as Error).message },
      { status: 500 }
    )
  }
} 