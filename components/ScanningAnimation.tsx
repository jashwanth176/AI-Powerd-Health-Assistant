"use client"

import { motion } from "framer-motion"

export const ScanningAnimation = () => {
  return (
    <motion.div
      className="w-full max-w-md mx-auto mt-8 h-4 bg-slate-700 rounded-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        className="h-full bg-teal-500"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
      />
    </motion.div>
  )
}

