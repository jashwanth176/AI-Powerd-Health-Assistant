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
  const audioContextRef = useRef<AudioContext | null>(null)
  const websocketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    audioContextRef.current = new AudioContext()
    return () => {
      websocketRef.current?.close()
      audioContextRef.current?.close()
    }
  }, [])

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const response = await fetch('/api/chat/session')
      const { sessionUrl, config } = await response.json()
      
      console.log('Connecting to WebSocket:', sessionUrl)
      
      websocketRef.current = new WebSocket(sessionUrl)
      
      websocketRef.current.onopen = () => {
        console.log('WebSocket connected')
        const setupMessage = {
          type: "BidiGenerateContentSetup",
          config
        }
        websocketRef.current?.send(JSON.stringify(setupMessage))
        setIsListening(true)
      }
      
      websocketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsListening(false)
      }
      
      websocketRef.current.onclose = () => {
        console.log('WebSocket closed')
        setIsListening(false)
      }
      
      websocketRef.current.onmessage = handleWebSocketMessage
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      mediaRecorder.ondataavailable = async (event) => {
        if (websocketRef.current?.readyState === WebSocket.OPEN) {
          const audioBlob = event.data
          const arrayBuffer = await audioBlob.arrayBuffer()
          const base64Audio = btoa(
            String.fromCharCode.apply(null, Array.from(new Uint8Array(arrayBuffer)))
          )
          
          const message = {
            type: "BidiGenerateContentRealtimeInput",
            media_chunks: [{
              mimeType: "audio/webm;codecs=opus",
              data: base64Audio
            }]
          }
          websocketRef.current.send(JSON.stringify(message))
        }
      }
      mediaRecorder.start(100)
    } catch (error) {
      console.error('Error starting voice chat:', error)
      setIsListening(false)
    }
  }

  const stopListening = () => {
    websocketRef.current?.close()
    setIsListening(false)
  }

  const handleWebSocketMessage = async (event: MessageEvent) => {
    if (event.data instanceof Blob) {
      // Handle audio response
      const arrayBuffer = await event.data.arrayBuffer()
      const audioBuffer = await audioContextRef.current!.decodeAudioData(arrayBuffer)
      const source = audioContextRef.current!.createBufferSource()
      source.buffer = audioBuffer
      source.connect(audioContextRef.current!.destination)
      source.start()
      setIsAIResponding(true)
    } else {
      // Handle JSON response
      const response = JSON.parse(event.data)
      if (response.turn_complete) {
        setIsAIResponding(false)
      }
    }
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

      <div className="relative flex flex-col items-center justify-center h-screen p-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          Voice Chat with AI
        </motion.h1>

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