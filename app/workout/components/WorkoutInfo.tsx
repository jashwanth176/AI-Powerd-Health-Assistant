interface WorkoutInfoProps {
  currentExercise: number
  exerciseName?: string
}

export default function WorkoutInfo({ currentExercise, exerciseName }: WorkoutInfoProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-2">{exerciseName || `Exercise ${currentExercise}`}</h2>
      <p className="text-gray-300">Focus on proper form and controlled movements.</p>
    </div>
  )
}

