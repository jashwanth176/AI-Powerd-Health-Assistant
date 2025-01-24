interface NextExerciseProps {
  onNext: () => void
  disabled: boolean
}

export default function NextExercise({ onNext, disabled }: NextExerciseProps) {
  return (
    <button
      onClick={onNext}
      disabled={disabled}
      className={`w-full py-2 px-4 rounded-lg transition-colors ${
        disabled 
          ? "bg-gray-500 cursor-not-allowed" 
          : "bg-teal-500 hover:bg-teal-600"
      }`}
    >
      Next Exercise
    </button>
  )
} 