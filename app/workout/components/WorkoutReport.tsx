interface WorkoutReportProps {
  report: string
  onClose: () => void
  onFinish: () => void
  userName?: string
}

export default function WorkoutReport({ report, onClose, onFinish, userName }: WorkoutReportProps) {
  const handleClose = () => {
    onClose()
    onFinish()
  }

  // Convert **text** to styled spans
  const formattedReport = report.split(/(\*\*.*?\*\*)/).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const text = part.slice(2, -2)
      return (
        <span key={index} className="font-bold text-teal-400">
          {text}
        </span>
      )
    }
    return part
  })

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Workout Report
        </h2>
        <div className="prose prose-invert">
          <p className="whitespace-pre-wrap text-gray-300">{formattedReport}</p>
        </div>
        <button
          onClick={handleClose}
          className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
        >
          Close Report & Return to Dashboard
        </button>
      </div>
    </div>
  )
} 