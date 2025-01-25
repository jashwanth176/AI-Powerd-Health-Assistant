import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function POST(request: Request) {
  try {
    const { bmi, age, healthIssues, userData } = await request.json()
    
    let prompt = `As a health expert, provide a short, personalized feedback (maximum 3 sentences) for ${userData?.name || 'a person'}`

    // Add age if available
    if (age) {
      prompt += ` aged ${age}`
    }

    prompt += ` with a BMI of ${bmi}`

    // Add health issues from both current input and stored medical history
    const allHealthIssues = []
    if (healthIssues) {
      allHealthIssues.push(healthIssues)
    }
    if (userData?.medicalHistory) {
      allHealthIssues.push(userData.medicalHistory)
    }
    if (allHealthIssues.length > 0) {
      prompt += ` who has ${allHealthIssues.join(', ')}`
    }

    // Add fitness goals if available
    if (userData?.fitnessGoals) {
      prompt += `. Their fitness goals are: ${userData.fitnessGoals}`
    }

    // Add weight goals if available
    if (userData?.weightGoal) {
      prompt += `. They aim to reach ${userData.weightGoal}kg`
    }

    prompt += `. Focus on their specific health conditions, goals, and provide actionable advice. Keep the response concise and personalized.`

    console.log('Generated prompt:', prompt) // For debugging

    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    
    return NextResponse.json({ feedback: response.text() })
  } catch (error) {
    console.error('BMI feedback error:', error)
    return NextResponse.json(
      { error: 'Failed to generate feedback', details: (error as Error).message },
      { status: 500 }
    )
  }
} 