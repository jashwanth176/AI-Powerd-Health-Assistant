import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null!)
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 3000

  const posArray = new Float32Array(particlesCount * 3)
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15
  }
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    particlesRef.current.rotation.x = time * 0.0002
    particlesRef.current.rotation.y = time * 0.0001
    
    // Add wave motion
    const positions = particlesRef.current.geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const z = positions[i + 2]
      positions[i + 1] = Math.sin((time + x + z) * 0.5) * 0.5
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" {...particlesGeometry} />
      <pointsMaterial
        attach="material"
        size={0.015}
        color="#4FD1C5"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  )
} 