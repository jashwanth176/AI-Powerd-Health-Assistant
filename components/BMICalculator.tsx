"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface BMICalculatorProps {
  setBMI: (bmi: number) => void
  setAge: (age: number) => void
  setHealthIssues: (issues: string) => void
  initialAge?: number
}

export default function BMICalculator({ setBMI, initialAge }: BMICalculatorProps) {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")

  const calculateBMI = () => {
    const heightInMeters = Number.parseFloat(height) / 100
    const weightInKg = Number.parseFloat(weight)
    const bmi = weightInKg / (heightInMeters * heightInMeters)
    setBMI(Number.parseFloat(bmi.toFixed(1)))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-lg shadow-lg border border-teal-500/20"
    >
      <h2 className="text-2xl font-semibold mb-6">Calculate Your BMI</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="height" className="block text-gray-300 mb-2">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-gray-300 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={calculateBMI}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out"
        >
          Calculate BMI
        </motion.button>
      </div>
    </motion.div>
  )
}

