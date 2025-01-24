"use client"

import ExercisePlayer from "./components/ExercisePlayer"
import ProgressIndicator from "./components/ProgressIndicator"
import WorkoutTimer from "./components/WorkoutTimer"
import WorkoutInfo from "./components/WorkoutInfo"
import PauseButton from "./components/PauseButton"
import MotivationalPanel from "./components/MotivationalPanel"
import { useWorkout } from "./hooks/useWorkout"
import { useState, useEffect } from "react"
import WorkoutReport from "./components/WorkoutReport"
import { useRouter } from 'next/navigation'
import InitializeWorkout from "./components/InitializeWorkout"
import NextExercise from "./components/NextExercise"

export default function WorkoutPage() {
  const { 
    currentExercise, 
    phase, 
    timeLeft, 
    isPaused, 
    progress, 
    togglePause, 
    skipWait,
    skipRest,
    workoutName,
    isInitialized,
    initializeWorkout,
    currentExerciseData,
    finishWorkout,
    nextExercise,
    selectedExercises
  } = useWorkout()

  const router = useRouter()

  const [showReport, setShowReport] = useState(false)
  const [report, setReport] = useState("")
  const [userName, setUserName] = useState<string>('')

  const handleFinishWorkout = async () => {
    const workoutReport = await finishWorkout()
    if (workoutReport) {
      console.log('Workout Report Received:', workoutReport)
      setReport(workoutReport)
      setShowReport(true)
    }
  }

  const handleFinishAndRedirect = () => {
    setShowReport(false)
    router.push('/dashboard')
  }

  useEffect(() => {
    const handleWorkoutComplete = (event: CustomEvent<string>) => {
      setReport(event.detail)
      setShowReport(true)
    }

    window.addEventListener('workoutCompleted', handleWorkoutComplete as EventListener)
    
    return () => {
      window.removeEventListener('workoutCompleted', handleWorkoutComplete as EventListener)
    }
  }, [])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}')
    setUserName(userData.name || 'Athlete')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4">
      {!isInitialized ? (
        <InitializeWorkout onInitialize={initializeWorkout} />
      ) : (
        <div className="container mx-auto h-screen flex gap-4">
          <div className="w-12 flex items-center">
            <h1 className="vertical-text text-3xl font-bold text-white transform -rotate-180 whitespace-nowrap">
              {workoutName}
            </h1>
          </div>
          <div className="flex-1 flex flex-col lg:flex-row gap-4">
            <div className="lg:w-3/4 flex flex-col gap-4">
              <ExercisePlayer 
                currentExercise={currentExercise} 
                videoSrc={currentExerciseData?.file}
                isPaused={isPaused}
                phase={phase}
              />
              <WorkoutInfo 
                currentExercise={currentExercise}
                exerciseName={currentExerciseData?.name}
              />
            </div>
            <div className="lg:w-1/4 flex flex-col gap-4">
              <ProgressIndicator progress={progress} />
              <WorkoutTimer 
                phase={phase} 
                timeLeft={timeLeft} 
                onSkip={skipWait}
                onSkipRest={skipRest} 
              />
              <PauseButton isPaused={isPaused} togglePause={togglePause} />
              <NextExercise 
                onNext={nextExercise} 
                disabled={!selectedExercises?.length || currentExercise >= selectedExercises.length || phase === "wait"}
              />
              <button
                onClick={handleFinishWorkout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Finish Workout Early
              </button>
              <MotivationalPanel currentExercise={currentExercise} />
            </div>
          </div>
        </div>
      )}
      {showReport && (
        <WorkoutReport 
          report={report} 
          onClose={() => setShowReport(false)}
          onFinish={handleFinishAndRedirect}
          userName={userName}
        />
      )}
    </div>
  )
}

