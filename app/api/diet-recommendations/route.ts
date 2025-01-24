import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function POST(request: Request) {
  try {
    const { userData, mealType, foodItems, recipe } = await request.json()
    
    // If recipe is provided, generate only benefits
    if (recipe) {
      let benefitsPrompt = `As a nutritionist, provide a brief explanation (2-3 short sentences, no markdown or formatting) of why ${recipe} would benefit ${userData?.name || 'a person'}`
      if (userData?.age) benefitsPrompt += ` aged ${userData.age}`
      if (userData?.medicalHistory) benefitsPrompt += ` with health conditions: ${userData.medicalHistory}`
      if (userData?.fitnessGoals) benefitsPrompt += `. Their fitness goals are: ${userData.fitnessGoals}`
      if (userData?.weightGoal) benefitsPrompt += `. They aim to reach ${userData.weightGoal}kg`

      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" })
      const benefitsResult = await model.generateContent(benefitsPrompt)
      const benefitsResponse = await benefitsResult.response
      const cleanedBenefits = benefitsResponse.text().replace(/\*\*/g, '')
      return NextResponse.json({ recommendations: cleanedBenefits })
    }

    // Otherwise generate full recipe and benefits
    if (!mealType || !foodItems || !foodItems.length) {
      return NextResponse.json(
        { error: 'Missing required fields: mealType and foodItems' },
        { status: 400 }
      )
    }

    let prompt = `As a nutritionist and chef, create a personalized recipe and its benefits for ${userData?.name || 'a person'}`

    if (userData?.age) prompt += ` aged ${userData.age}`
    if (userData?.medicalHistory) prompt += ` with health conditions: ${userData.medicalHistory}`
    if (userData?.fitnessGoals) prompt += `. Their fitness goals are: ${userData.fitnessGoals}`
    if (userData?.weightGoal) prompt += `. They aim to reach ${userData.weightGoal}kg`

    prompt += `. For their ${mealType.toLowerCase()}, considering these preferences/ingredients: ${foodItems.join(', ')}.
    
    Create a healthy recipe and explain its benefits. Keep all text responses brief and concise.
    Return only the JSON without any markdown formatting, bold text, or backticks:
    {
      "recipe": {
        "title": "string",
        "ingredients": ["string"],
        "instructions": ["string"]
      },
      "benefits": {
        "nutritionalBenefits": "One sentence about health benefits",
        "fitnessGoalSupport": "One sentence about fitness support",
        "modifications": "Brief suggested modifications if needed"
      }
    }`

    console.log('Generated prompt:', prompt)

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      const cleanedText = text.replace(/```json\n|\n```|\*\*/g, '').trim()
      
      try {
        const parsedResponse = JSON.parse(cleanedText)
        return NextResponse.json(parsedResponse)
      } catch (parseError) {
        console.error('Failed to parse AI response:', text)
        console.error('Parse error:', parseError)
        
        return NextResponse.json({
          recipe: {
            title: "Healthy Recipe",
            ingredients: foodItems,
            instructions: ["Combine ingredients in a healthy way"]
          },
          benefits: {
            nutritionalBenefits: "Rich in essential nutrients for overall health.",
            fitnessGoalSupport: "Supports your fitness journey.",
            modifications: "Adjust portions as needed."
          }
        })
      }
    } catch (aiError) {
      console.error('AI generation error:', aiError)
      throw aiError
    }
  } catch (error) {
    console.error('Diet recommendations error:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    )
  }
} 