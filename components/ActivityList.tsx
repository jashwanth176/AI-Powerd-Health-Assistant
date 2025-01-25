import { FootprintsIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { MapPin, Clock, Share2 } from "lucide-react"
import EmailShareAlert from './EmailShareAlert'

const ActivityList = () => {
  const activities = [
    { name: "Small Walk", distance: "0.2 km", location: "Vijayawada", time: "6 min" },
  ]
  const dailySteps = 3211
  const [showEmailAlert, setShowEmailAlert] = useState(false)

  const handleShareClick = async (email: string) => {
    try {
      const response = await fetch('/api/email/share-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (!response.ok) throw new Error('Failed to send email')
      
      // Show success message
      alert('Activity shared successfully!')
    } catch (error) {
      console.error('Error sharing activity:', error)
      alert('Failed to share activity')
    }
  }

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
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{activity.name}</h3>
                <div className="text-sm text-gray-400">
                  {activity.distance} • {activity.time} • {activity.location}
                </div>
              </div>
              <button
                onClick={() => setShowEmailAlert(true)}
                className="text-teal-400 hover:text-teal-300 p-2"
              >
                <Share2 size={20} />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
      
      {showEmailAlert && (
        <EmailShareAlert
          onClose={() => setShowEmailAlert(false)}
          onSubmit={handleShareClick}
        />
      )}
    </motion.div>
  )
}

export default ActivityList

