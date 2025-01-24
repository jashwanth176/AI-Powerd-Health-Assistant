import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()
    
    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" })
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const calories = response.text().replace(/\D/g, '')
    
    return NextResponse.json({ calories })
  } catch (error) {
    console.error('Calories estimation error:', error)
    return NextResponse.json(
      { error: 'Failed to estimate calories', details: (error as Error).message },
      { status: 500 }
    )
  }
} 