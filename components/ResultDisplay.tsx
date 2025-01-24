"use client"

import { motion } from "framer-motion"

interface AnalysisResult {
  overallScore: number
  feedback: string
  areas: Array<{
    name: string
    score: number
  }>
}

export const ResultDisplay = ({ result }: { result: AnalysisResult }) => {
  return (
    <motion.div
      className="w-full max-w-md mx-auto mt-8 p-6 bg-slate-800 rounded-lg text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
      <div className="mb-4">
        <p className="text-xl">
          Overall Score: <span className="text-teal-500 font-bold">{result.overallScore}/10</span>
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Feedback:</h3>
        <p className="text-gray-300">{result.feedback}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Areas:</h3>
        <ul>
          {result.areas.map((area, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{area.name}</span>
              <span className="text-teal-500 font-bold">{area.score}/10</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

