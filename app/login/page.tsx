"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Particles } from "../../components/Particles"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add login logic here
    console.log("Login attempt:", formData);

    try {
      const response = await axios.post('https://hms-da9g.onrender.com/userLogin', formData);
      
      if (response.data.code === 0) {
        // Login failed
        alert('Login failed. Please check your credentials.');
        return;
      }

      // If we get here, login was successful
      // Save the response data to localStorage
      localStorage.setItem('userData', JSON.stringify(response.data));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0">
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <Particles />
        </Canvas>
      </div>
      
      <div className="relative h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-12 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent text-center"
          >
            Welcome Back
          </motion.h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-xl p-6 bg-white/10 border-none text-white placeholder-gray-400 rounded-xl"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="text-xl p-6 bg-white/10 border-none text-white placeholder-gray-400 rounded-xl"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-4"
            >
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-white text-xl py-6 rounded-xl transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-indigo-500/20"
              >
                Sign In
              </Button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push('/onboarding')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Don&apos;t have an account? Sign up    
                </button>
              </div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 