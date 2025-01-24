import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

const exercises = [
  { "id": "00011201", "name": "Sit-up" },
  { "id": "00091201", "name": "Assisted Chest Dip (kneeling)" },
  { "id": "00251201", "name": "Barbell Bench Press" },
  { "id": "00311201", "name": "Barbell Curl" },
  { "id": "00331201", "name": "Barbell Decline Bench Press" },
  { "id": "00431201", "name": "Barbell Full Squat" },
  { "id": "00441201", "name": "Barbell Good Morning" },
  { "id": "00461201", "name": "Barbell Hack Squat" },
  { "id": "00801201", "name": "Barbell Reverse Curl" },
  { "id": "00921201", "name": "Barbell Seated Overhead Triceps Extension" },
  { "id": "00951201", "name": "Barbell Shrug" },
  { "id": "01211201", "name": "Barbell Upright Row" },
  { "id": "01221201", "name": "Barbell Wide Bench Press" },
  { "id": "01751201", "name": "Cable Kneeling Crunch" },
  { "id": "02011201", "name": "Cable Pushdown" },
  { "id": "02181201", "name": "Cable Seated Wide-Grip Row" },
  { "id": "02511201", "name": "Chest Dip" },
  { "id": "02771201", "name": "Decline Crunch" },
  { "id": "02871201", "name": "Dumbbell Arnold Press II" },
  { "id": "02881201", "name": "Dumbbell Around Pullover" },
  { "id": "02891201", "name": "Dumbbell Bench Press" },
  { "id": "03021201", "name": "Dumbbell Decline Fly" },
  { "id": "03081201", "name": "Dumbbell Fly" },
  { "id": "03101201", "name": "Dumbbell Front Raise" },
  { "id": "03121201", "name": "Dumbbell Hammer Curl (version 2)" },
  { "id": "03271201", "name": "Dumbbell Incline Row" },
  { "id": "03331201", "name": "Dumbbell Kickback" },
  { "id": "03361201", "name": "Dumbbell Lunge" },
  { "id": "03621201", "name": "Dumbbell One Arm Triceps Extension (on bench)" }
]

export async function POST(request: Request) {
  try {
    const { userData } = await request.json()
    
    const prompt = `As a fitness expert, select exactly 5 exercises that would be most suitable for a person with the following profile:
    
    Age: ${userData.age}
    Fitness Goals: ${userData.fitnessGoals?.join(', ')}
    Medical History: ${userData.medicalHistory?.join(', ')}
    Activity Level: ${userData.activityLevel}
    
    Consider their fitness level, goals, and any health conditions when selecting exercises.
    Choose exercises that will create a balanced workout routine.
    
    Available exercises:
    ${JSON.stringify(exercises, null, 2)}
    
    Return ONLY an array of 5 exercise IDs in JSON format, nothing else. Example: ["00011201", "00091201", "00251201", "00311201", "00331201"]`

    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const selectedExercises = JSON.parse(response.text())
    
    if (!Array.isArray(selectedExercises) || selectedExercises.length !== 5) {
      throw new Error('Invalid AI response format')
    }

    return NextResponse.json({ selectedExercises })
  } catch (error) {
    console.error('Workout initialization error:', error)
    return NextResponse.json(
      { error: 'Failed to initialize workout', details: (error as Error).message },
      { status: 500 }
    )
  }
} 