"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"]

interface DietPlanFormProps {
  onSubmit: (mealType: string, items: string[]) => void
}

export default function DietPlanForm({ onSubmit }: DietPlanFormProps) {
  const [selectedMealType, setSelectedMealType] = useState("")
  const [foodItem, setFoodItem] = useState("")
  const [foodItems, setFoodItems] = useState<string[]>([])

  const addFoodItem = () => {
    if (foodItem.trim()) {
      setFoodItems([...foodItems, foodItem.trim()])
      setFoodItem("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addFoodItem()
    }
  }

  const submitPlan = () => {
    console.log("Form submitting:", { selectedMealType, foodItems }) // Debug log
    if (selectedMealType && foodItems.length > 0) {
      onSubmit(selectedMealType, foodItems)
      setSelectedMealType("")
      setFoodItems([])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10"
    >
      <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
        Create Your Diet Plan
      </h2>
      <div className="mb-4">
        <label htmlFor="mealType" className="block text-gray-300 mb-2 text-sm font-medium">
          Meal Type
        </label>
        <select
          id="mealType"
          value={selectedMealType}
          onChange={(e) => setSelectedMealType(e.target.value)}
          className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
        >
          <option value="">Select a meal type</option>
          {mealTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="foodItem" className="block text-gray-300 mb-2 text-sm font-medium">
          Add Food Items
        </label>
        <div className="flex">
          <input
            type="text"
            id="foodItem"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow bg-slate-700/50 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            placeholder="Enter a food item"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addFoodItem}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-r-md transition-all duration-300"
          >
            Add
          </motion.button>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-gray-300 mb-2 font-medium">Added Food Items:</h3>
        <ul className="space-y-1">
          {foodItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="text-sm text-gray-100 bg-slate-700/30 px-3 py-1 rounded-md"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={submitPlan}
        disabled={!selectedMealType || foodItems.length === 0}
        className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold py-2 rounded-md transition-all duration-300 hover:from-teal-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate Recipe
      </motion.button>
    </motion.div>
  )
}

