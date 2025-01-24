"use client"

import { useState } from "react"
import { ImageUpload } from "../../components/ImageUpload"
import { ScanningAnimation } from "../../components/ScanningAnimation"
import { ResultDisplay } from "../../components/ResultDisplay"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Particles } from "../../components/Particles"
import { motion, useScroll, useTransform } from "framer-motion"
import { Dumbbell, Upload, ChartBar } from "lucide-react"

const features = [
  {
    icon: Upload,
    title: "Upload Image",
    description: "Share your workout photo for instant analysis",
  },
  {
    icon: ChartBar,
    title: "AI Analysis",
    description: "Get detailed feedback on your form and technique",
  },
  {
    icon: Dumbbell,
    title: "Improve Form",
    description: "Receive actionable tips to enhance your workout",
  },
]

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }  ) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-slate-700"
  >
    <Icon className="w-8 h-8 text-teal-500 mb-4" />
    <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </motion.div>
)

export default function AnalyzePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const handleImageUpload = async (imageData: string) => {
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData })
      })
      
      if (response.ok) {
        const data = await response.json()
        setResult(data)
        setTimeout(() => {
          document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      }
    } catch (error) {
      console.error('Analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-y-auto">
      <div className="fixed inset-0 -z-10">
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <Particles />
        </Canvas>
      </div>
      
      <motion.div style={{ y }} className="relative flex flex-col items-center justify-start pt-16 px-4 pb-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          Advanced Analyzer
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 text-center mb-12 max-w-2xl"
        >
          Upload your workout photo and get instant AI-powered feedback on your form and technique
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-2xl"
        >
          <ImageUpload onImageUpload={handleImageUpload} />
          {isAnalyzing && <ScanningAnimation />}
          <div id="results">
            {result && <ResultDisplay result={result} />}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 