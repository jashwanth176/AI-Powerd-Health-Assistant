import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function POST(request: Request) {
  try {
    const { image } = await request.json()
    
    if (!image) {
      console.error('No image data received')
      return NextResponse.json({ error: 'No image data' }, { status: 400 })
    }

    console.log('Image data length:', image.length)
    console.log('Image data starts with:', image.substring(0, 50))

    // Initialize the flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    try {
      // Create part array with very specific prompt
      const parts = [
        {
          text: "Analyze this workout image. Only rate workout images if its not related to workout give zero on everything. Respond in exactly this format:\n1. [number]/10\n2. [one sentence feedback]\n3. [three improvements separated by commas]"
        },
        {
          inlineData: {
            mimeType: "image/png",
            data: image.replace(/^data:image\/\w+;base64,/, '')
          }
        }
      ]

      console.log('Sending request to Gemini...')
      const result = await model.generateContent(parts)
      const response = await result.response
      const analysis = response.text()
      
      console.log('Raw analysis:', analysis)

      // Parse with more specific regex
      const lines = analysis.split('\n').map(line => line.trim())
      
      const scoreMatch = lines[0]?.match(/(\d+(?:\.\d+)?)\s*\/\s*10/)
      if (!scoreMatch) {
        throw new Error('Could not parse score from response')
      }
      const overallScore = parseFloat(scoreMatch[1])

      const feedback = lines[1]?.replace(/^\d+\.\s*/, '') || 'No feedback available'
      
      const improvements = lines[2]?.replace(/^\d+\.\s*/, '').split(',').map(i => i.trim()) || []
      const areas = [
        { name: "Form", score: Math.round(overallScore) },
        { name: "Technique", score: Math.round(overallScore * 0.9) },
        { name: improvements[0] || "Posture", score: Math.round(overallScore * 0.95) }
      ]

      return NextResponse.json({ overallScore, feedback, areas })
    } catch (modelError) {
      console.error('Gemini API error:', modelError)
      throw new Error(`Gemini API error: ${modelError as Error}`)
    }
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze image', details: (error as Error).message },
      { status: 500 }
    )
  }
}