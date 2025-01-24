"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface BMIFeedbackProps {
  bmi: number | null
  age: number | null
  healthIssues: string
  userData: any
}

export default function BMIFeedback({ bmi, age, healthIssues, userData }: BMIFeedbackProps) {
  const [aiFeedback, setAiFeedback] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight"
    if (bmi < 25) return "Normal weight"
    if (bmi < 30) return "Overweight"
    return "Obese"
  }

  useEffect(() => {
    const getFeedback = async () => {
      if (bmi !== null && age !== null) {
        setLoading(true)
        try {
          const response = await fetch('/api/bmi-feedback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              bmi,
              age,
              healthIssues,
              userData
            }),
          })
          const data = await response.json()
          if (data.feedback) {
            setAiFeedback(data.feedback)
          }
        } catch (error) {
          console.error('Error fetching AI feedback:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    getFeedback()
  }, [bmi, age, healthIssues, userData])

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-lg shadow-lg border border-teal-500/20"
    >
      <h2 className="text-2xl font-semibold mb-6">Your BMI Results</h2>
      {bmi !== null ? (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-4xl font-bold mb-2">{bmi}</p>
            <p className="text-xl text-teal-400">{getBMICategory(bmi)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-t border-teal-500/20 pt-4"
          >
            {loading ? (
              <div className="text-teal-400 animate-pulse">Generating personalized feedback...</div>
            ) : (
              <p className="text-gray-300 leading-relaxed">{aiFeedback}</p>
            )}
          </motion.div>
        </div>
      ) : (
        <p className="text-gray-300">Enter your height and weight to see your BMI results.</p>
      )}
    </motion.div>
  )
}

