import { useEffect, useRef } from 'react'

interface ExercisePlayerProps {
  currentExercise: number
  videoSrc?: string
  isPaused: boolean
  phase: "exercise" | "rest" | "wait"
}

export default function ExercisePlayer({ currentExercise, videoSrc, isPaused, phase }: ExercisePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.load()
      if (!isPaused && phase === "exercise") {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [videoSrc, isPaused, phase])

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden">
      {videoSrc ? (
        <div className="aspect-video relative">
          <video
            ref={videoRef}
            className={`w-full h-full object-cover transition-all duration-300 ${
              phase === "rest" ? "blur-md brightness-50" : ""
            }`}
            loop
            muted
            playsInline
          >
            <source src={`/videos/${videoSrc}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {phase === "rest" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl font-bold text-white">Rest Time</p>
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-video flex items-center justify-center bg-slate-700">
          <p className="text-2xl text-gray-400">Loading exercise...</p>
        </div>
      )}
    </div>
  )
}

