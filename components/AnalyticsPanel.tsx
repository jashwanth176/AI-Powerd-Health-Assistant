import { motion } from "framer-motion"
import { Heart, FootprintsIcon } from "lucide-react"
import { Line } from "react-chartjs-2"

const AnalyticsPanel = () => {
  const bloodPressure = { systolic: 120, diastolic: 80 }
  const steps = 8500

  const stepsChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: [7000, 8000, 6500, 9000, 8500, 10000, 8500],
        borderColor: "rgb(79, 209, 197)",
        tension: 0.1,
      },
    ],
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-slate-800 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Weekly Analytics</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Heart className="mr-2 text-[#ff3366]" /> Blood Pressure
          </h3>
          <p className="text-2xl font-bold">
            {bloodPressure.systolic}/{bloodPressure.diastolic} mmHg
          </p>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <FootprintsIcon className="mr-2 text-[#4FD1C5]" /> Steps
          </h3>
          <p className="text-2xl font-bold">{steps}</p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Steps This Week</h3>
        <Line data={stepsChartData} />
      </div>
    </motion.div>
  )
}

export default AnalyticsPanel

