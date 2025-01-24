"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { MeshDistortMaterial } from "@react-three/drei"

export const HeartShape = () => {
  const mesh = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const scale = 1 + Math.sin(t * 1.5) * 0.05
    mesh.current.scale.set(scale, scale, scale)
    mesh.current.rotation.y = Math.sin(t * 0.5) * 0.1
  })

  const x = 0
  const y = 0
  const heartShape = new THREE.Shape()
  heartShape.moveTo(x + 5, y + 5)
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y)
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7)
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19)
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7)
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y)
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5)

  return (
    <mesh ref={mesh}>
      <extrudeGeometry
        args={[
          heartShape,
          {
            depth: 2,
            bevelEnabled: true,
            bevelSegments: 5,
            steps: 3,
            bevelSize: 0.8,
            bevelThickness: 0.8
          },
        ]}
      />
      <MeshDistortMaterial
        color="#ff3366"
        envMapIntensity={0.4}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        metalness={0.1}
        roughness={0.3}
        distort={0.2}
        speed={1.5}
      />
    </mesh>
  )
} 