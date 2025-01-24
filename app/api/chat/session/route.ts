import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Replace with actual Google WebSocket endpoint
    const wsEndpoint = `wss://generativelanguage.googleapis.com/v1alpha/models/gemini-2.0-flash-exp:streamGenerateContent?key=${process.env.GOOGLE_API_KEY}`
    
    const config = {
      model: "gemini-2.0-flash-exp",
      generation_config: {
        candidate_count: 1,
        max_output_tokens: 1024,
        temperature: 0.9,
        top_p: 0.8,
        top_k: 40,
        response_modalities: ["AUDIO", "TEXT"],
        speech_config: {
          voice_config: {
            prebuilt_voice_config: {
              voice_name: "Puck"
            }
          }
        }
      },
      system_instruction: "You are a helpful AI assistant. Keep your responses concise and natural.",
      api_version: "v1alpha"
    }

    // Return the WebSocket URL and config
    return NextResponse.json({ 
      sessionUrl: wsEndpoint,
      config 
    })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create chat session' },
      { status: 500 }
    )
  }
} 