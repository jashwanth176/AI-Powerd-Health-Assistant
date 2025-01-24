"use client"

import { motion } from "framer-motion"

export const WaveAnimation = () => {
  const bars = Array.from({ length: 5 })
  
  return (
    <div className="flex items-center gap-1 p-4">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-teal-500 rounded-full"
          animate={{
            height: ["10px", "20px", "10px"],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
} 