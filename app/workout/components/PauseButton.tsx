interface PauseButtonProps {
  isPaused: boolean
  togglePause: () => void
}

export default function PauseButton({ isPaused, togglePause }: PauseButtonProps) {
  return (
    <button
      onClick={togglePause}
      className={`w-full py-2 px-4 rounded-lg transition-colors ${
        isPaused ? "bg-teal-500 hover:bg-teal-600" : "bg-transparent border border-white hover:bg-white/10"
      }`}
    >
      {isPaused ? "Resume" : "Pause"}
    </button>
  )
}

