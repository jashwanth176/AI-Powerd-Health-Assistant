import { motion } from "framer-motion"
import { MapPin, Clock } from "lucide-react"
import { FootprintsIcon } from "lucide-react"

const ActivityList = () => {
  const activities = [
    { name: "Small Walk", distance: "0.2 km", location: "Vijayawada", time: "6 min" },
  ]
  const dailySteps = 3211

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/10"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Activity</h2>
        <div className="flex items-center gap-2">
          <FootprintsIcon className="text-teal-400" />
          <span className="text-xl font-bold text-teal-400">{dailySteps} steps</span>
        </div>
      </div>
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-700/50 p-4 rounded-xl border border-teal-500/20"
          >
            <h3 className="text-xl font-semibold mb-2 text-teal-300">{activity.name}</h3>
            <div className="flex items-center space-x-4 text-gray-300">
              <span>{activity.distance}</span>
              <span className="flex items-center">
                <MapPin size={16} className="mr-1 text-purple-400" /> {activity.location}
              </span>
              <span className="flex items-center">
                <Clock size={16} className="mr-1 text-pink-400" /> {activity.time}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default ActivityList

