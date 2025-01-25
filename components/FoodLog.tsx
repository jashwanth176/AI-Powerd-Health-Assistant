import { useState } from "react"
import { Utensils } from "lucide-react"
import { motion } from "framer-motion"

interface FoodLogProps {
  entries: Array<{ date: string; calories: number }>
  addEntry: (calories: number) => void
}

const FoodLog = ({ entries, addEntry }: FoodLogProps) => {
  const [foodItem, setFoodItem] = useState("")
  const [suggestedCalories, setSuggestedCalories] = useState<number | null>(null)
  const [customCalories, setCustomCalories] = useState("")
  const [loading, setLoading] = useState(false)

  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0) || 0
  const recommendedDaily = 2000
  const percentage = Math.min(100, (totalCalories / recommendedDaily) * 100)
  const needleRotation = -90 + (percentage * 1.8)

  const getSuggestedCalories = async () => {
    if (!foodItem.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/calories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Return only a single number representing the estimated calories for this food item: ${foodItem}`
        }),
      })

      const data = await response.json()
      setSuggestedCalories(parseInt(data.calories))
      setCustomCalories(data.calories)
    } catch (error) {
      console.error('Failed to get calorie suggestion:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    const calories = parseInt(customCalories)
    if (calories) {
      addEntry(calories)
      setFoodItem("")
      setCustomCalories("")
      setSuggestedCalories(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-800 p-6 rounded-lg shadow-lg border border-teal-500/20 h-[300px]"
    >
      <h2 className="text-xl font-semibold mb-4 text-white">Calorie Tracker</h2>
      
      <div className="grid grid-rows-[auto,auto,1fr] h-[calc(100%-2rem)] gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            onBlur={getSuggestedCalories}
            placeholder="Enter food item"
            className="bg-slate-700 p-2 rounded-lg flex-1 border border-teal-500/30 focus:border-teal-500 text-white"
          />
          <input
            type="number"
            value={customCalories}
            onChange={(e) => setCustomCalories(e.target.value)}
            placeholder="Calories"
            className="bg-slate-700 p-2 rounded-lg w-24 border border-teal-500/30 focus:border-teal-500 text-white"
          />
          <button
            onClick={handleSubmit}
            className="bg-teal-500 hover:bg-teal-600 p-2 rounded-lg text-white transition-colors"
          >
            <Utensils size={20} />
          </button>
        </div>

        <div className="h-5 flex items-center justify-center">
          {loading && (
            <div className="text-teal-500 text-sm animate-pulse">Calculating calories...</div>
          )}
          {!loading && suggestedCalories && (
            <div className="text-gray-300 text-sm">
              Suggested calories: {suggestedCalories}
            </div>
          )}
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-64 h-32">
            {/* Speedometer background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-slate-700 rounded-t-full overflow-hidden shadow-lg">
              {/* Tick marks */}
              {[...Array(21)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute bottom-0 left-1/2 h-[4.5rem] w-[2px] origin-bottom ${
                    i % 2 === 0 ? 'bg-slate-500 h-[4.5rem]' : 'bg-slate-600 h-[4rem]'
                  }`}
                  style={{ transform: `rotate(${-90 + i * 9}deg)` }}
                />
              ))}
            </div>
            
            {/* Needle with glow effect */}
            <motion.div
              initial={{ rotate: -90 }}
              animate={{ rotate: needleRotation }}
              className="absolute bottom-0 left-1/2 w-1 h-24 bg-gradient-to-t from-teal-500 to-teal-300 origin-bottom shadow-[0_0_10px_rgba(45,212,191,0.5)]"
              style={{ transformOrigin: 'bottom center' }}
            />
            
            {/* Center point with ring */}
            <div className="absolute bottom-0 left-1/2 -ml-3 w-6 h-6 bg-slate-800 rounded-full border-2 border-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
            
            {/* Calorie display */}
            <div className="absolute -bottom-8 left-0 right-0 text-center">
              <div className="text-lg font-bold flex items-center justify-center gap-1">
                <span className="text-white">{totalCalories.toLocaleString()}</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-300">{recommendedDaily.toLocaleString()}</span>
                <span className="text-xs text-gray-400 ml-1">cal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FoodLog

