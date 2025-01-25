"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Activity, Dumbbell, Zap } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockData = {
  user: {
    name: "John Doe",
    age: 30,
    height: 180,
    weight: 75,
  },
  healthMetrics: {
    bmi: 23.1,
    heartRate: 72,
    bloodPressure: "120/80",
    sleepHours: 7.5,
  },
  fitnessGoals: {
    dailySteps: 10000,
    weeklyWorkouts: 4,
    weightGoal: 70,
  },
  progress: {
    stepsProgress: 75,
    workoutsProgress: 50,
    weightProgress: 60,
  },
  weightHistory: [
    { date: "Week 1", weight: 78 },
    { date: "Week 2", weight: 77 },
    { date: "Week 3", weight: 76 },
    { date: "Week 4", weight: 75 },
  ],
}

interface ProgressData {
  progress: {
    stepsProgress: number
    workoutsProgress: number
    weightProgress: number
  }
  fitnessGoals: {
    dailySteps: number
    weeklyWorkouts: number
    weightGoal: number
  }
}

interface OverviewData {
  fitnessGoals: {
    dailySteps: number
    weeklyWorkouts: number
    weightGoal: number
  }
  weightHistory: Array<{
    date: string
    weight: number
  }>
}

export default function HealthDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome back, {mockData.user.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="BMI" value={mockData.healthMetrics.bmi} icon={<Heart className="h-6 w-6 text-teal-500" />} />
        <MetricCard
          title="Heart Rate"
          value={`${mockData.healthMetrics.heartRate} bpm`}
          icon={<Activity className="h-6 w-6 text-teal-500" />}
        />
        <MetricCard
          title="Blood Pressure"
          value={mockData.healthMetrics.bloodPressure}
          icon={<Zap className="h-6 w-6 text-teal-500" />}
        />
        <MetricCard
          title="Sleep"
          value={`${mockData.healthMetrics.sleepHours} hours`}
          icon={<Dumbbell className="h-6 w-6 text-teal-500" />}
        />
      </div>

      <div className="flex space-x-4 mb-6">
        <Button
          variant={activeTab === "overview" ? "default" : "outline"}
          onClick={() => setActiveTab("overview")}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          Overview
        </Button>
        <Button
          variant={activeTab === "progress" ? "default" : "outline"}
          onClick={() => setActiveTab("progress")}
          className="bg-transparent border-white hover:bg-white/10 text-white"
        >
          Progress
        </Button>
      </div>

      {activeTab === "overview" ? <OverviewTab data={mockData} /> : <ProgressTab data={mockData} />}
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
}

function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <Card className="bg-slate-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

function OverviewTab({ data }: { data: OverviewData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-slate-800">
        <CardHeader>
          <CardTitle>Fitness Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span className="text-gray-300">Daily Steps</span>
              <span className="font-bold">{data.fitnessGoals.dailySteps}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-300">Weekly Workouts</span>
              <span className="font-bold">{data.fitnessGoals.weeklyWorkouts}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-300">Weight Goal</span>
              <span className="font-bold">{data.fitnessGoals.weightGoal} kg</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="bg-slate-800">
        <CardHeader>
          <CardTitle>Weight History</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.weightHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none" }} />
              <Line type="monotone" dataKey="weight" stroke="#4FD1C5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function ProgressTab({ data }: { data: ProgressData }) {
  return (
    <div className="space-y-6">
      <ProgressCard
        title="Daily Steps"
        progress={data.progress.stepsProgress}
        goal={data.fitnessGoals.dailySteps}
        unit="steps"
      />
      <ProgressCard
        title="Weekly Workouts"
        progress={data.progress.workoutsProgress}
        goal={data.fitnessGoals.weeklyWorkouts}
        unit="workouts"
      />
      <ProgressCard
        title="Weight Goal"
        progress={data.progress.weightProgress}
        goal={data.fitnessGoals.weightGoal}
        unit="kg"
      />
    </div>
  )
}

interface ProgressCardProps {
  title: string
  progress: number
  goal: number
  unit: string
}

function ProgressCard({ title, progress, goal, unit }: ProgressCardProps) {
  return (
    <Card className="bg-slate-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between text-sm text-gray-300">
            <span>Progress: {progress}%</span>
            <span>
              Goal: {goal} {unit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

