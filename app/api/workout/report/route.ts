import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function POST(request: Request) {
  try {
    const { userData, workoutStats, completedExercises } = await request.json()
    
    const prompt = `Generate a brief workout report for ${userData.name || 'Athlete'} with the following details:

    User Profile:
    Name: ${userData.name || 'Athlete'}
    Age: ${userData.age}
    Fitness Goals: ${userData.fitnessGoals?.join(', ')}
    
    Workout Statistics:
    Duration: ${Math.round((workoutStats.endTime - workoutStats.startTime) / 1000)} seconds
    Completed Exercises: ${completedExercises.map((ex: any) => ex.name).join(', ')}
    
    Provide a brief analysis of their performance and suggestions for next time.
    Use **bold text** for important metrics and key points.
    Keep the response concise and motivational.
    Address the user by their name in the response.`

    console.log('Workout Report Prompt:', prompt)

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const report = response.text()
    
    console.log('Generated Workout Report:', report)
    
    // Send email if user email exists
    if (userData.email) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: userData.email,
            subject: `Your Workout Report - ${new Date().toLocaleDateString()}`,
            text: `Hi ${userData.name || 'Athlete'},\n\n${report}\n\nKeep up the great work!\nYour AI Fitness Coach`
          })
        })
      } catch (error) {
        console.error('Failed to send email:', error)
      }
    }
    
    return NextResponse.json({ report })
  } catch (error) {
    console.error('Report generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate report', details: (error as Error).message },
      { status: 500 }
    )
  }
} 