import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Particles } from "./Particles"
import Image from "next/image"
import { motion } from "framer-motion"

const illustrations = [
  {
    image: "/user.png",
    alt: "Profile Setup",
    scale: 1.2,
  },
  {
    image: "/email.png",
    alt: "Email Setup",
    scale: 1.1,
  },
  {
    image: "/security.png",
    alt: "Security",
    scale: 1,
  },
  {
    image: "/age.png",
    alt: "Age Input",
    scale: 1.2,
  },
  {
    image: "/tracking.png",
    alt: "Fitness Tracking",
    scale: 1.3,
  },
  {
    image: "/height.png",
    alt: "Height Measurement",
    scale: 1.1,
  },
  {
    image: "/activity.png",
    alt: "Activity Level",
    scale: 1.2,
  },
  {
    image: "/medical.png",
    alt: "Medical History",
    scale: 1,
  },
  {
    image: "/goals.png",
    alt: "Fitness Goals",
    scale: 1.3,
  },
]

export default function ModelSection({ modelIndex, className = "" }: { modelIndex: number, className?: string }) {
  const illustration = illustrations[modelIndex]

  return (
    <motion.div 
      className={`relative h-[250px] sm:h-[300px] lg:h-full ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Canvas className="absolute inset-0">
        <OrbitControls enableZoom={false} enableRotate={false} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <Particles />
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: illustration.scale }}
          transition={{ duration: 0.5 }}
          className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-96 md:h-96 rounded-lg p-4 backdrop-blur-xl bg-black/30 border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 rounded-lg" />
          <Image
            src={illustration.image}
            alt={illustration.alt}
            width={384}
            height={384}
            className="object-contain rounded-lg relative z-10"
            priority
            unoptimized
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

