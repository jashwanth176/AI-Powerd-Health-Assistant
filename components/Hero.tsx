"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import * as THREE from "three"
import { useRouter } from 'next/navigation'
import { HeartShape } from "./HeartShape"

const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null!)
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 5000

  const posArray = new Float32Array(particlesCount * 3)
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10
  }
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

  useFrame(() => {
    particlesRef.current.rotation.x += 0.0005
    particlesRef.current.rotation.y += 0.0005
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" {...particlesGeometry} />
      <pointsMaterial attach="material" size={0.01} color="#4FD1C5" sizeAttenuation />
    </points>
  )
}

const Hero = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -300])
  const router = useRouter()

  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-10" style={{ height: "100vh" }}>
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <group position={[0.65, 3, 0]} rotation={[0, 0, Math.PI]} scale={0.11}>
            <HeartShape />
          </group>
          <Particles />
        </Canvas>
      </div>
      <motion.div style={{ y }} className="container mx-auto px-4 z-20 relative mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">Your Personal Health Assistant</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Tailored workouts, nutrition plans, and mental wellness support
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
            <button 
              onClick={() => router.push('/onboarding')}
              className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 md:px-8 rounded-full text-base md:text-lg transition duration-300"
            >
              Get Started
            </button>
            <button 
              onClick={() => router.push('/login')} 
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 md:px-8 rounded-full text-base md:text-lg transition duration-300 border-2 border-white"
            >
              Log In
            </button>
            <button 
              onClick={() => router.push('/analyze')}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 md:px-8 rounded-full text-base md:text-lg transition duration-300 border-2 border-white"
            >
              Try Analyzer
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero