"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Particles } from "../../components/Particles"
import { WaveAnimation } from "../../components/WaveAnimation"
import { Mic, MicOff } from "lucide-react"

export default function ChatPage() {
  const [isListening, setIsListening] = useState(false)
  const [isAIResponding, setIsAIResponding] = useState(false)
  const [transcription, setTranscription] = useState("")
  const audioContextRef = useRef<AudioContext | null>(null)
  const websocketRef = useRef<WebSocket | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    audioContextRef.current = new AudioContext()
    return () => {
      cleanupResources()
    }
  }, [])

  const cleanupResources = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop()
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    websocketRef.current?.close()
    audioContextRef.current?.close()
  }

  const startListening = async () => {
    try {
      // Get session URL and config
      const response = await fetch('/api/chat/session')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const { sessionUrl, config } = await response.json()
      
      // Get audio stream
      streamRef.current = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        } 
      })
      
      // Setup WebSocket
      websocketRef.current = new WebSocket(sessionUrl)
      
      websocketRef.current.onopen = () => {
        console.log('WebSocket connected')
        websocketRef.current?.send(JSON.stringify({
          type: "BidiGenerateContentSetup",
          ...config
        }))
        setIsListening(true)
      }
      
      websocketRef.current.onmessage = handleWebSocketMessage
      websocketRef.current.onerror = handleWebSocketError
      websocketRef.current.onclose = handleWebSocketClose
      
      // Setup MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(streamRef.current, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      mediaRecorderRef.current.ondataavailable = async (event) => {
        if (websocketRef.current?.readyState === WebSocket.OPEN) {
          const audioBlob = event.data
          const arrayBuffer = await audioBlob.arrayBuffer()
          const base64Audio = btoa(
            //String.fromCharCode(...new Uint8Array(arrayBuffer))
            String.fromCharCode(...Array.from(new Uint8Array(arrayBuffer)))
          )
          
          websocketRef.current.send(JSON.stringify({
            type: "BidiGenerateContentRealtimeInput",
            media_chunks: [{
              mimeType: "audio/webm;codecs=opus",
              data: base64Audio
            }]
          }))
        }
      }
      
      mediaRecorderRef.current.start(100) // Send audio chunks every 100ms
    } catch (error) {
      console.error('Error starting voice chat:', error)
      cleanupResources()
      setIsListening(false)
    }
  }

  const stopListening = () => {
    cleanupResources()
    setIsListening(false)
    setIsAIResponding(false)
  }

  const handleWebSocketMessage = async (event: MessageEvent) => {
    try {
      if (event.data instanceof Blob) {
        // Handle audio response
        const arrayBuffer = await event.data.arrayBuffer()
        const audioContext = audioContextRef.current!
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        
        const source = audioContext.createBufferSource()
        source.buffer = audioBuffer
        source.connect(audioContext.destination)
        source.start()
        setIsAIResponding(true)
      } else {
        // Handle text response
        const response = JSON.parse(event.data)
        console.log('Server message:', response)
        
        if (response.type === "BidiGenerateContentServerContent") {
          if (response.model_turn?.parts?.[0]?.text) {
            setTranscription(prev => prev + response.model_turn.parts[0].text)
          }
          if (response.turn_complete) {
            setIsAIResponding(false)
          }
        }
      }
    } catch (error) {
      console.error('Error handling message:', error)
    }
  }

  const handleWebSocketError = (error: Event) => {
    console.error('WebSocket error:', error)
    cleanupResources()
    setIsListening(false)
  }

  const handleWebSocketClose = () => {
    console.log('WebSocket closed')
    cleanupResources()
    setIsListening(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="fixed inset-0 -z-10">
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <Particles />
        </Canvas>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          Voice Chat with AI
        </motion.h1>

        {transcription && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl w-full mb-8 p-4 rounded-lg bg-slate-800/50 backdrop-blur-sm"
          >
            <p className="text-gray-200 whitespace-pre-line">{transcription}</p>
          </motion.div>
        )}

        {isAIResponding && <WaveAnimation />}

        <motion.button
          onClick={isListening ? stopListening : startListening}
          className={`p-8 rounded-full transition-all transform hover:scale-110 ${
            isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-500 hover:bg-teal-600'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {isListening ? <MicOff size={32} /> : <Mic size={32} />}
        </motion.button>
      </div>
    </div>
  )
} 