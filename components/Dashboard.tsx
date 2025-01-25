"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Activity, Utensils, Brain, Scale } from "lucide-react"
import { useRouter } from "next/navigation"
import WeightLog from "./WeightLog"
import FoodLog from "./FoodLog"
import ActivityList from "./ActivityList"
import AnalyticsPanel from "./AnalyticsPanel"

// Register all required elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface DashboardProps {
  userName: string
}

const Dashboard = ({ userName }: DashboardProps) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const router = useRouter()
  
  const [weightEntries, setWeightEntries] = useState([{ date: "2023-05-01", weight: 70 }])
  const [foodEntries, setFoodEntries] = useState<Array<{ date: string; calories: number }>>([])
  const [newWeight, setNewWeight] = useState("")
  const [newCalories, setNewCalories] = useState("")

  const addWeightEntry = () => {
    if (newWeight) {
      const newEntry = { 
        date: new Date().toISOString().split("T")[0], 
        weight: parseFloat(newWeight) 
      }
      setWeightEntries([...weightEntries, newEntry])
      setNewWeight("")
    }
  }

  const addFoodEntry = () => {
    if (newCalories) {
      const newEntry = { 
        date: new Date().toISOString().split("T")[0], 
        calories: parseFloat(newCalories) 
      }
      setFoodEntries([...foodEntries, newEntry])
      setNewCalories("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <motion.div style={{ y }} className="space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-8 text-center text-white"
        >
          Welcome, {userName}!
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <Button icon={<Activity />} text="Work Out" onClick={() => router.push('/workout')}/>
          <Button icon={<Utensils />} text="Diet Plan" onClick={() => router.push('/diet')}/>
          <Button 
            icon={<Brain />} 
            text="Advanced Analyser" 
            onClick={() => router.push('/analyze')}
          />
          <Button 
            icon={<Scale />} 
            text="BMI Calculator" 
            onClick={() => router.push('/bmi')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <WeightLog entries={weightEntries} />
            <div className="flex gap-2">
              <input
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="Enter weight (kg)"
                min="30"
                max="300"
                className="bg-slate-800 p-2 rounded-lg flex-1 border border-teal-500/30 focus:border-teal-500 text-white"
              />
              <button
                onClick={addWeightEntry}
                className="bg-teal-500 hover:bg-teal-600 p-2 rounded-lg text-white"
              >
                <Scale size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <FoodLog entries={foodEntries} addEntry={addFoodEntry} />
            <div className="flex gap-2">
              <input
                type="number"
                value={newCalories}
                onChange={(e) => setNewCalories(e.target.value)}
                placeholder="Enter calories"
                className="bg-slate-800 p-2 rounded-lg flex-1 border border-teal-500/30 focus:border-teal-500 text-white"
              />
              <button
                onClick={addFoodEntry}
                className="bg-teal-500 hover:bg-teal-600 p-2 rounded-lg text-white"
              >
                <Utensils size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ActivityList />
          <AnalyticsPanel />
        </div>

        <div className="mt-8 bg-slate-800/50 backdrop-blur-xl p-6 rounded-lg shadow-lg border border-teal-500/20">
          <h3 className="text-xl font-semibold mb-4">Workout Streak</h3>
          <div className="flex gap-2">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-3 rounded-full ${
                  index === 0 
                    ? "bg-teal-500" 
                    : "bg-slate-700"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>Day 1</span>
            <span>Day 2</span>
            <span>Day 3</span>
            <span>Day 4</span>
            <span>Day 5</span>
            <span>Day 6</span>
            <span>Day 7</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Button = ({ 
  icon, 
  text, 
  onClick 
}: { 
  icon: React.ReactNode
  text: string
  onClick?: () => void 
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
  >
    {icon}
    <span>{text}</span>
  </motion.button>
)

export default Dashboard

