interface MotivationalPanelProps {
  currentExercise: number
}

export default function MotivationalPanel({ currentExercise }: MotivationalPanelProps) {
  const motivationalQuotes = [
    "Stay strong! You're making progress with every rep.",
    "Push yourself, because no one else is going to do it for you.",
    "Your body can stand almost anything. It's your mind that you have to convince.",
    "The only bad workout is the one that didn't happen.",
    "Remember why you started. Keep pushing forward!",
  ]

  return (
    <div className="bg-slate-700 rounded-lg p-3">
      <p className="text-gray-300 text-sm italic">
        "{motivationalQuotes[currentExercise - 1]}"
      </p>
    </div>
  )
}

