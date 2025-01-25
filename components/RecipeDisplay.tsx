"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import BenefitsDisplay from "./BenefitsDisplay"

interface Recipe {
  title: string
  ingredients: string[]
  instructions: string[]
}

interface Benefits {
  nutritionalBenefits: string
  fitnessGoalSupport: string
  modifications: string
}

export default function RecipeDisplay({ mealType, foodItems }: { mealType: string, foodItems: string[] }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [benefits, setBenefits] = useState<Benefits | null>(null)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const storedData = localStorage.getItem('userData')
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }
  }, [])

  useEffect(() => {
    if (mealType && foodItems.length > 0 && userData) {
      fetchRecipeAndBenefits()
    }
  }, [mealType, foodItems, userData])

  const fetchRecipeAndBenefits = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/diet-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userData, mealType, foodItems }),
      })
      const data = await response.json()
      if (data.recipe && data.benefits) {
        setRecipe(data.recipe)
        setBenefits(data.benefits)
      }
    } catch (error) {
      console.error('Error fetching recipe:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center text-teal-400 animate-pulse">
        Generating your personalized recipe...
      </div>
    )
  }

  if (!recipe || !benefits) return null

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-800/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10"
      >
        <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
          Recipe
        </h2>
        <h3 className="text-xl font-medium mb-4 text-white">{recipe.title}</h3>
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2 text-gray-300">Ingredients:</h4>
          <ul className="space-y-1">
            {recipe.ingredients.map((ingredient, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-sm text-gray-100 bg-slate-700/30 px-3 py-1 rounded-md"
              >
                {ingredient}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2 text-gray-300">Instructions:</h4>
          <ol className="space-y-2">
            {recipe.instructions.map((instruction, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-sm text-gray-100 bg-slate-700/30 px-3 py-1 rounded-md"
              >
                {instruction}
              </motion.li>
            ))}
          </ol>
        </div>

      </motion.div>

      <BenefitsDisplay selectedRecipe={recipe.title || null} />
    </div>
  )
}

