"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import type { ReactNode } from "react"

export const Parallax = ({ children }: { children: ReactNode }) => {
  const { scrollY } = useScroll()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const y1 = useTransform(scrollY, [0, 300], [0, 200])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  return (
    <div className="w-full h-full overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      <motion.div className="absolute inset-0 z-10" style={{ y: y2 }}>
        {children}
      </motion.div>
    </div>
  )
}

