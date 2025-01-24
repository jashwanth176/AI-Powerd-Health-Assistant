"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function BenefitsDisplay({ selectedRecipe }: { selectedRecipe: string | null }) {
  const [recommendations, setRecommendations] = useState("")
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const storedData = localStorage.getItem('userData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setUserData(parsedData)
    }
  }, [])

  useEffect(() => {
    if (selectedRecipe) {
      fetchRecommendations(userData, selectedRecipe)
    }
  }, [selectedRecipe, userData])

  const fetchRecommendations = async (userData: any, recipe: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/diet-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userData, recipe }),
      })
      const data = await response.json()
      if (data.recommendations) {
        setRecommendations(data.recommendations)
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!selectedRecipe) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-lg shadow-lg border border-teal-500/20"
      >
        <h2 className="text-2xl font-semibold mb-6">Personalized Benefits</h2>
        <p className="text-gray-300">Select a recipe to see its benefits for you.</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-lg shadow-lg border border-teal-500/20"
    >
      <h2 className="text-2xl font-semibold mb-6">Personalized Benefits</h2>
      {loading ? (
        <div className="text-teal-400 animate-pulse">
          Analyzing your profile and generating recommendations...
        </div>
      ) : (
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {recommendations}
          </div>
        </div>
      )}
    </motion.div>
  )
}

