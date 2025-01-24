"use client"

import { useState } from "react"
import DietPlanForm from "../../components/DietPlanForm"
import RecipeDisplay from "../../components/RecipeDisplay"
import ParallaxBackground from "../../components/ParallaxBackground"

export default function DietPlanPage() {
  const [showRecipe, setShowRecipe] = useState(false)
  const [currentMealType, setCurrentMealType] = useState("")
  const [currentFoodItems, setCurrentFoodItems] = useState<string[]>([])

  const handleDietPlanSubmit = (mealType: string, items: string[]) => {
    console.log("Submitting:", { mealType, items })
    setCurrentMealType(mealType)
    setCurrentFoodItems(items)
    setShowRecipe(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParallaxBackground />
      </div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
          Personalized Diet Plan
        </h1>
        <div className="max-w-2xl mx-auto space-y-8">
          <DietPlanForm onSubmit={handleDietPlanSubmit} />
          {showRecipe && (
            <RecipeDisplay 
              mealType={currentMealType} 
              foodItems={currentFoodItems} 
            />
          )}
        </div>
      </div>
    </main>
  )
} 