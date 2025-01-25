"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export default function ParallaxBackground() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.8])

  const springConfig = { stiffness: 300, damping: 30, restDelta: 0.001 }
  const backgroundYSpring = useSpring(backgroundY, springConfig)

  return (
    <motion.div
      ref={ref}
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: "url('/healthy-food-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        y: backgroundYSpring,
        opacity: backgroundOpacity,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-800/70" />
    </motion.div>
  )
}

