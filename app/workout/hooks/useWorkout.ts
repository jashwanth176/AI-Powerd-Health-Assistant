import { useState, useEffect } from "react"

const EXERCISE_TIME = 30
const REST_TIME = 15
const WAIT_TIME = 30

type WorkoutPhase = "exercise" | "rest" | "wait"

interface Exercise {
  id: string
  name: string
  file: string
}

const exerciseData: Exercise[] = [
  { "id": "00011201", "name": "Sit-up", "file": "00011201-3-4-Sit-up_Waist.mp4" },
  { "id": "00091201", "name": "Assisted Chest Dip (kneeling)", "file": "00091201-Assisted-Chest-Dip-(kneeling)_Chest.mp4" },
  { "id": "00251201", "name": "Barbell Bench Press", "file": "00251201-Barbell-Bench-Press_Chest.mp4" },
  { "id": "00311201", "name": "Barbell Curl", "file": "00311201-Barbell-Curl_Upper-Arms.mp4" },
  { "id": "00331201", "name": "Barbell Decline Bench Press", "file": "00331201-Barbell-Decline-Bench-Press_Chest.mp4" },
  { "id": "00431201", "name": "Barbell Full Squat", "file": "00431201-Barbell-Full-Squat_Thighs.mp4" },
  { "id": "00441201", "name": "Barbell Good Morning", "file": "00441201-Barbell-Good-Morning_Thighs.mp4" },
  { "id": "00461201", "name": "Barbell Hack Squat", "file": "00461201-Barbell-Hack-Squat_Hips.mp4" },
  { "id": "00801201", "name": "Barbell Reverse Curl", "file": "00801201-Barbell-Reverse-Curl_Forearm.mp4" },
  { "id": "00921201", "name": "Barbell Seated Overhead Triceps Extension", "file": "00921201-Barbell-Seated-Overhead-Triceps-Extension_Upper-Arms.mp4" },
  { "id": "00951201", "name": "Barbell Shrug", "file": "00951201-Barbell-Shrug_Back.mp4" },
  { "id": "01211201", "name": "Barbell Upright Row", "file": "01211201-Barbell-Upright-Row_Shoulders.mp4" },
  { "id": "01221201", "name": "Barbell Wide Bench Press", "file": "01221201-Barbell-Wide-Bench-Press_Chest.mp4" },
  { "id": "01751201", "name": "Cable Kneeling Crunch", "file": "01751201-Cable-Kneeling-Crunch_Waist.mp4" },
  { "id": "02011201", "name": "Cable Pushdown", "file": "02011201-Cable-Pushdown_Upper-Arms.mp4" },
  { "id": "02181201", "name": "Cable Seated Wide-Grip Row", "file": "02181201-Cable-Seated-Wide-grip-Row_Back.mp4" },
  { "id": "02511201", "name": "Chest Dip", "file": "02511201-Chest-Dip_Chest.mp4" },
  { "id": "02771201", "name": "Decline Crunch", "file": "02771201-Decline-Crunch_Waist.mp4" },
  { "id": "02871201", "name": "Dumbbell Arnold Press II", "file": "02871201-Dumbbell-Arnold-Press-II_Shoulders.mp4" },
  { "id": "02881201", "name": "Dumbbell Around Pullover", "file": "02881201-Dumbbell-Around-Pullover_Chest.mp4" },
  { "id": "02891201", "name": "Dumbbell Bench Press", "file": "02891201-Dumbbell-Bench-Press_Chest.mp4" },
  { "id": "03021201", "name": "Dumbbell Decline Fly", "file": "03021201-Dumbbell-Decline-Fly_Chest.mp4" },
  { "id": "03081201", "name": "Dumbbell Fly", "file": "03081201-Dumbbell-Fly_Chest.mp4" },
  { "id": "03101201", "name": "Dumbbell Front Raise", "file": "03101201-Dumbbell-Front-Raise_Shoulders.mp4" },
  { "id": "03121201", "name": "Dumbbell Hammer Curl (version 2)", "file": "03121201-Dumbbell-Hammer-Curl-(version-2)_Upper-Arms.mp4" },
  { "id": "03271201", "name": "Dumbbell Incline Row", "file": "03271201-Dumbbell-Incline-Row_Back.mp4" },
  { "id": "03331201", "name": "Dumbbell Kickback", "file": "03331201-Dumbbell-Kickback_Upper-Arms.mp4" },
  { "id": "03361201", "name": "Dumbbell Lunge", "file": "03361201-Dumbbell-Lunge_Hips.mp4" },
  { "id": "03621201", "name": "Dumbbell One Arm Triceps Extension (on bench)", "file": "03621201-Dumbbell-One-Arm-Triceps-Extension-(on-bench)_Upper-Arms.mp4" }
]

interface WorkoutStats {
  completedExercises: string[]
  startTime: number
  endTime?: number
}

export function useWorkout() {
  const [currentExercise, setCurrentExercise] = useState(1)
  const [phase, setPhase] = useState<WorkoutPhase>("wait")
  const [timeLeft, setTimeLeft] = useState(WAIT_TIME)
  const [isPaused, setIsPaused] = useState(true)
  const [progress, setProgress] = useState(0)
  const [workoutName, setWorkoutName] = useState("Personalized Workout")
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats>({
    completedExercises: [],
    startTime: Date.now(),
  })

  const initializeWorkout = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}')
      
      const response = await fetch('/api/workout/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userData }),
      })

      if (!response.ok) throw new Error('Failed to initialize workout')
      
      const { selectedExercises: exerciseIds } = await response.json()
      const exercises = exerciseIds.map((id: string) => 
        exerciseData.find(e => e.id === id)!
      )
      
      setSelectedExercises(exercises)
      setIsInitialized(true)
      setIsPaused(false)
      setPhase("exercise")
      setTimeLeft(EXERCISE_TIME)
      setCurrentExercise(1)
    } catch (error) {
      console.error('Error initializing workout:', error)
    }
  }

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          if (phase === "exercise") {
            setPhase("rest")
            return REST_TIME
          } else if (phase === "rest") {
            if (currentExercise < selectedExercises.length) {
              setCurrentExercise(prev => prev + 1)
              setPhase("exercise")
              return EXERCISE_TIME
            } else {
              // Workout completed - automatically trigger finish
              setIsPaused(true)
              handleWorkoutCompletion()
              return 0
            }
          }
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaused, phase, currentExercise, selectedExercises.length])

  useEffect(() => {
    setProgress(((currentExercise - 1) / (selectedExercises?.length || 1)) * 100)
  }, [currentExercise, selectedExercises])

  const togglePause = () => setIsPaused((prev) => !prev)

  const skipWait = () => {
    if (phase === "wait") {
      setCurrentExercise((prev) => prev + 1)
      setPhase("exercise")
      setTimeLeft(EXERCISE_TIME)
    }
  }

  const skipRest = () => {
    if (phase === "rest") {
      if (currentExercise < selectedExercises.length) {
        setCurrentExercise(prev => prev + 1)
        setPhase("exercise")
        setTimeLeft(EXERCISE_TIME)
      }
    }
  }

  const finishWorkout = async () => {
    try {
      const stats = {
        ...workoutStats,
        completedExercises: [...workoutStats.completedExercises],
        endTime: Date.now()
      }
      
      setIsPaused(true)
      setPhase("wait")
      setTimeLeft(0)
      
      const response = await fetch('/api/workout/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: JSON.parse(localStorage.getItem('userData') || '{}'),
          workoutStats: stats,
          completedExercises: selectedExercises.filter(ex => 
            stats.completedExercises.includes(ex.id)
          )
        })
      })
      
      if (!response.ok) throw new Error('Failed to generate workout report')
      const { report } = await response.json()
      return report
    } catch (error) {
      console.error('Error generating workout report:', error)
      return null
    }
  }

  useEffect(() => {
    if (phase === "rest" && !workoutStats.completedExercises.includes(selectedExercises[currentExercise - 1]?.id)) {
      setWorkoutStats(prev => ({
        ...prev,
        completedExercises: [...prev.completedExercises, selectedExercises[currentExercise - 1]?.id]
      }))
    }
  }, [phase, currentExercise, selectedExercises])

  const nextExercise = () => {
    if (selectedExercises && currentExercise < selectedExercises.length) {
      setCurrentExercise(prev => prev + 1)
      setPhase("exercise")
      setTimeLeft(EXERCISE_TIME)
      setIsPaused(false)
    }
  }

  const handleWorkoutCompletion = async () => {
    const report = await finishWorkout()
    if (report) {
      // Emit an event or use a callback to notify the parent component
      window.dispatchEvent(new CustomEvent('workoutCompleted', { detail: report }))
    }
  }

  return {
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
    currentExerciseData: selectedExercises[currentExercise - 1],
    finishWorkout,
    workoutStats,
    nextExercise,
    selectedExercises
  }
}

