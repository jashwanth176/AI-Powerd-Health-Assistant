import { Card } from "./ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface WeightLogProps {
  entries: Array<{ date: string; weight: number }>
}

export default function WeightLog({ entries }: WeightLogProps) {
  return (
    <Card className="p-6 bg-slate-800 backdrop-blur-xl border-teal-500/20 rounded-lg shadow-lg h-[300px]">
      <h2 className="text-xl font-semibold mb-4 text-white">Weight Progress</h2>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={entries}>
            <XAxis dataKey="date" stroke="white" />
            <YAxis dataKey="weight" stroke="white" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: 'white' }}
              labelStyle={{ color: 'white' }}
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#4FD1C5" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-between text-white">
        <div>Current: {entries[entries.length - 1]?.weight || 0}kg</div>
        <div>Goal: {entries[0]?.weight - 5 || 65}kg</div>
      </div>
    </Card>
  )
}

