interface ProgressIndicatorProps {
  progress: number
}

export default function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-4 flex flex-col items-center">
      <h2 className="text-xl mb-4">Progress</h2>
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-300 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>
          <circle
            className="text-teal-500 progress-ring__circle stroke-current"
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
          ></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  )
}

