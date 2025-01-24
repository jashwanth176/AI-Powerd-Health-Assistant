"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import BMICalculator from "../../components/BMICalculator"
import BMIFeedback from "../../components/BMIFeedback"
import { Particles } from "../../components/Particles"
import Image from "next/image"

export default function Home() {
  const [bmi, setBMI] = useState<number | null>(null)
  const [age, setAge] = useState<number | null>(null)
  const [healthIssues, setHealthIssues] = useState<string>("")
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const storedData = localStorage.getItem('userData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setUserData(parsedData)
      // If user data contains age, set it
      if (parsedData.age) {
        setAge(parsedData.age)
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Particles />
        </Canvas>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-12"
        >
          BMI Calculator
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BMICalculator 
              setBMI={setBMI} 
              setAge={setAge} 
              setHealthIssues={setHealthIssues}
              initialAge={userData?.age}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <BMIFeedback 
              bmi={bmi} 
              age={age} 
              healthIssues={healthIssues}
              userData={userData}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-lg shadow-lg border border-teal-500/20"
        >
          <h2 className="text-2xl font-semibold mb-6">Understanding BMI Limitations</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] w-full">
              <Image
                src="/BMI_chart.png"
                alt="BMI Chart"
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                While BMI is a widely used screening tool, it&apos;s important to understand its limitations:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Doesn&apos;t distinguish between weight from muscle and fat</li>
                <li>May not be accurate for athletes or bodybuilders</li>
                <li>Doesn&apos;t account for body fat distribution</li>
                <li>May not be suitable for elderly people or certain ethnic groups</li>
              </ul>
              <p className="text-teal-400 font-semibold">
                Always consult healthcare professionals for a comprehensive health assessment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}