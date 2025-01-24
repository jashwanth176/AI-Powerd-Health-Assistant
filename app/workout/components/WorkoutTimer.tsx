interface WorkoutTimerProps {
  phase: "exercise" | "rest" | "wait"
  timeLeft: number
  onSkip: () => void
  onSkipRest?: () => void
}

export default function WorkoutTimer({ phase, timeLeft, onSkip, onSkipRest }: WorkoutTimerProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-4 flex flex-col items-center">
      <h2 className="text-xl mb-4">{phase === "exercise" ? "Exercise" : phase === "rest" ? "Rest" : "Get Ready"}</h2>
      <div className="text-6xl font-bold text-teal-500">{timeLeft}</div>
      <p className="text-gray-300 mt-2">seconds</p>
      {phase === "wait" && (
        <button onClick={onSkip} className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
          Skip
        </button>
      )}
      {phase === "rest" && (
        <button onClick={onSkipRest} className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
          Skip Rest
        </button>
      )}
    </div>
  )
}

