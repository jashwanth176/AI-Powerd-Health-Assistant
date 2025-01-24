import { motion } from "framer-motion"

interface InitializeWorkoutProps {
  onInitialize: () => void
}

export default function InitializeWorkout({ onInitialize }: InitializeWorkoutProps) {
  const steps = [
    { title: "Warm Up", description: "Get ready for an intense session" },
    { title: "AI Selection", description: "Exercises tailored to your goals" },
    { title: "Progress Tracking", description: "Monitor your performance" },
    { title: "Smart Rest", description: "Optimized rest periods" }
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center mb-8 text-teal-400"
      >
        Your Personalized Workout Session
      </motion.h2>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800 p-4 rounded-lg border border-teal-500/30"
          >
            <h3 className="font-bold text-teal-400 mb-2">{step.title}</h3>
            <p className="text-gray-300 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center"
      >
        <button
          onClick={onInitialize}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-12 rounded-lg transition-colors transform hover:scale-105 duration-200"
        >
          Start Your Workout
        </button>
        <p className="mt-4 text-gray-400 text-sm text-center">
          Your AI-powered fitness companion is ready to guide you
        </p>
      </motion.div>
    </div>
  )
} 